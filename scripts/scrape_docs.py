#!/usr/bin/env python3
"""
VectorShift Documentation Scraper & Directory Organizer
Clones 100% of https://docs.vectorshift.ai (Mintlify):
 - All 290+ Markdown pages
 - Embedded images & media assets (downloaded locally with rewritten relative paths)
 - mint.json (extracted Mintlify configuration)
 - llms.txt and llms-full.txt
 - sitemap.xml
 - docs/manifest.json
"""

import os
import re
import sys
import json
import time
import hashlib
import urllib.parse
import urllib.request
import urllib.error
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor, as_completed

BASE_URL = "https://docs.vectorshift.ai"
WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS_DIR = os.path.join(WORKSPACE_DIR, "docs")
ASSETS_DIR = os.path.join(DOCS_DIR, "assets")

USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
MAX_WORKERS = 10
MAX_RETRIES = 3
TIMEOUT_SECS = 20

# RegEx for finding image tags in Markdown and MDX
MD_IMG_REGEX = re.compile(r'!\[([^\]]*)\]\((https?://[^\)\s]+)\)')
HTML_IMG_REGEX = re.compile(r'(<img[^>]+src=["\'])(https?://[^"\'\s]+)(["\'])')


def fetch_url(url, retries=MAX_RETRIES, timeout=TIMEOUT_SECS):
    """Fetches URL with retries and exponential backoff."""
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                data = resp.read()
                content_type = resp.headers.get("Content-Type", "")
                final_url = resp.geturl()
                return data, content_type, final_url
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(1.0 * (2 ** attempt))
            else:
                raise e


def discover_urls():
    """Extracts all canonical page URLs from sitemap.xml and seed paths."""
    print(f"[*] Fetching sitemap from {BASE_URL}/sitemap.xml ...")
    data, _, _ = fetch_url(f"{BASE_URL}/sitemap.xml")
    root = ET.fromstring(data)
    
    urls = set()
    for elem in root.findall(".//{*}loc"):
        loc = (elem.text or "").strip()
        if loc.startswith(BASE_URL):
            urls.add(loc)

    # Core entrypoints and redirects to guarantee complete coverage
    seed_paths = [
        "/introduction",
        "/quickstart",
        "/support",
        "/sub-processors",
        "/sdk",
        "/sdk/index",
        "/api-reference",
        "/api-reference/overview",
        "/platform/pipelines/overview",
    ]
    for sp in seed_paths:
        urls.add(f"{BASE_URL}{sp}")

    # Fetch llms.txt to discover any additional canonical paths
    try:
        llms_data, _, _ = fetch_url(f"{BASE_URL}/llms.txt")
        llms_txt = llms_data.decode("utf-8", errors="ignore")
        for m in re.finditer(r'https://docs\.vectorshift\.ai/[^\s\)\]]+', llms_txt):
            clean_url = m.group(0).rstrip(".,:;")
            urls.add(clean_url)
    except Exception as e:
        print(f"[!] Warning: Could not parse extra links from llms.txt: {e}")

    # Normalize URLs
    canonical_urls = sorted(list(urls))
    print(f"[+] Discovered {len(canonical_urls)} canonical documentation URLs.")
    return canonical_urls


def url_to_relative_md_path(url):
    """Maps a docs.vectorshift.ai URL to a local relative path in docs/."""
    parsed = urllib.parse.urlparse(url)
    path = parsed.path.strip("/")
    
    if not path or path == "index":
        return "introduction.md"
    
    # Remove .md suffix if present in URL
    if path.endswith(".md"):
        path = path[:-3]

    # Special section roots
    if path == "sdk":
        return "sdk/index.md"
    if path == "api-reference":
        return "api-reference/overview.md"

    return f"{path}.md"


def get_asset_filename(img_url):
    """Generates a clean, collision-free filename for an image URL."""
    parsed = urllib.parse.urlparse(img_url)
    path_part = parsed.path.strip("/").split("/")[-1]
    
    # Extract extension or fallback
    ext = os.path.splitext(path_part)[1].lower()
    if not ext or len(ext) > 5 or not ext[1:].isalnum():
        ext = ".png"
    
    base_name = os.path.splitext(path_part)[0]
    base_name = re.sub(r'[^a-zA-Z0-9_\-]', '_', base_name)[:40]
    if not base_name:
        base_name = "asset"

    url_hash = hashlib.sha256(img_url.encode("utf-8")).hexdigest()[:8]
    return f"{base_name}_{url_hash}{ext}"


def download_asset(img_url, assets_dir):
    """Downloads an external image to assets_dir."""
    filename = get_asset_filename(img_url)
    dest_path = os.path.join(assets_dir, filename)
    
    if os.path.exists(dest_path) and os.path.getsize(dest_path) > 0:
        return filename, True

    try:
        data, _, _ = fetch_url(img_url)
        with open(dest_path, "wb") as f:
            f.write(data)
        return filename, True
    except Exception as e:
        print(f"[!] Warning: Failed downloading asset {img_url}: {e}")
        return filename, False


def scrape_page(url, docs_dir, assets_dir):
    """Downloads one documentation page as .md and gathers referenced images."""
    rel_md_path = url_to_relative_md_path(url)
    dest_md_path = os.path.join(docs_dir, rel_md_path)
    
    # Build the endpoint URL (Mintlify serves raw Markdown at <path>.md)
    parsed = urllib.parse.urlparse(url)
    clean_path = parsed.path.strip("/")
    if not clean_path:
        clean_path = "introduction"
    if clean_path.endswith(".md"):
        md_url = f"{BASE_URL}/{clean_path}"
    else:
        md_url = f"{BASE_URL}/{clean_path}.md"

    try:
        data, _, _ = fetch_url(md_url)
        content = data.decode("utf-8", errors="ignore")
    except urllib.error.HTTPError as e:
        if e.code == 404 and clean_path == "sdk":
            # Retry as /sdk/index.md
            data, _, _ = fetch_url(f"{BASE_URL}/sdk/index.md")
            content = data.decode("utf-8", errors="ignore")
        elif e.code == 404 and clean_path == "api-reference":
            data, _, _ = fetch_url(f"{BASE_URL}/api-reference/overview.md")
            content = data.decode("utf-8", errors="ignore")
        else:
            raise e

    # Find all image URLs in content
    img_urls = set()
    for m in MD_IMG_REGEX.finditer(content):
        img_url = m.group(2)
        if "mintcdn.com" in img_url or "vectorshift.ai" in img_url or img_url.startswith("http"):
            img_urls.add(img_url)
            
    for m in HTML_IMG_REGEX.finditer(content):
        img_url = m.group(2)
        if "mintcdn.com" in img_url or "vectorshift.ai" in img_url or img_url.startswith("http"):
            img_urls.add(img_url)

    # Extract title
    title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
    title = title_match.group(1).strip() if title_match else os.path.splitext(os.path.basename(rel_md_path))[0]

    return {
        "url": url,
        "md_url": md_url,
        "rel_path": rel_md_path,
        "dest_path": dest_md_path,
        "content": content,
        "img_urls": list(img_urls),
        "title": title,
        "word_count": len(content.split())
    }


def rewrite_markdown_images(content, md_file_path, docs_dir, assets_dir, url_to_asset_file):
    """Rewrites remote image links in markdown to relative local disk paths."""
    md_dir = os.path.dirname(md_file_path)

    def replace_md_img(match):
        alt = match.group(1)
        src = match.group(2)
        if src in url_to_asset_file:
            asset_filename = url_to_asset_file[src]
            asset_abs_path = os.path.join(assets_dir, asset_filename)
            rel_link = os.path.relpath(asset_abs_path, md_dir)
            return f"![{alt}]({rel_link})"
        return match.group(0)

    def replace_html_img(match):
        prefix = match.group(1)
        src = match.group(2)
        suffix = match.group(3)
        if src in url_to_asset_file:
            asset_filename = url_to_asset_file[src]
            asset_abs_path = os.path.join(assets_dir, asset_filename)
            rel_link = os.path.relpath(asset_abs_path, md_dir)
            return f"{prefix}{rel_link}{suffix}"
        return match.group(0)

    content = MD_IMG_REGEX.sub(replace_md_img, content)
    content = HTML_IMG_REGEX.sub(replace_html_img, content)
    return content


def download_static_artifacts(docs_dir, assets_dir):
    """Downloads sitemap.xml, llms.txt, llms-full.txt, and mint.json config."""
    print("[*] Downloading metadata and corpus files...")
    
    # 1. sitemap.xml
    try:
        data, _, _ = fetch_url(f"{BASE_URL}/sitemap.xml")
        with open(os.path.join(docs_dir, "sitemap.xml"), "wb") as f:
            f.write(data)
        print("  [✓] docs/sitemap.xml")
    except Exception as e:
        print(f"  [!] Failed to save sitemap.xml: {e}")

    # 2. llms.txt
    try:
        data, _, _ = fetch_url(f"{BASE_URL}/llms.txt")
        with open(os.path.join(docs_dir, "llms.txt"), "wb") as f:
            f.write(data)
        print("  [✓] docs/llms.txt")
    except Exception as e:
        print(f"  [!] Failed to save llms.txt: {e}")

    # 3. llms-full.txt
    try:
        data, _, _ = fetch_url(f"{BASE_URL}/llms-full.txt")
        with open(os.path.join(docs_dir, "llms-full.txt"), "wb") as f:
            f.write(data)
        print(f"  [✓] docs/llms-full.txt ({len(data):,} bytes)")
    except Exception as e:
        print(f"  [!] Failed to save llms-full.txt: {e}")

    # 4. Extract mint.json from live Next.js payload
    try:
        print("[*] Extracting Mintlify configuration (mint.json)...")
        html_data, _, _ = fetch_url(BASE_URL)
        html = html_data.decode("utf-8", errors="ignore")
        
        raw_chunks = re.findall(r'self\.__next_f\.push\(\[1,\s*"(.*?)"\]\)', html, re.DOTALL)
        combined = ""
        for c in raw_chunks:
            clean = re.sub(r'\\"', '"', c)
            clean = re.sub(r'\\\\', r'\\', clean)
            clean = re.sub(r'\\n', '\n', clean)
            clean = re.sub(r'\\t', '\t', clean)
            combined += clean

        idx = combined.find('{"name":"VectorShift"')
        if idx == -1:
            idx = combined.find('"name":"VectorShift"')
            if idx != -1:
                idx = combined.rfind('{', 0, idx)

        if idx != -1:
            decoder = json.JSONDecoder()
            config_obj, _ = decoder.raw_decode(combined[idx:])
            
            # Download logo & favicon if present
            for logo_key in ["light", "dark"]:
                if "logo" in config_obj and logo_key in config_obj["logo"]:
                    logo_url = config_obj["logo"][logo_key]
                    if logo_url.startswith("http"):
                        fname, ok = download_asset(logo_url, assets_dir)
                        if ok:
                            config_obj["logo"][logo_key] = f"/assets/{fname}"
                            
            if "favicon" in config_obj and config_obj["favicon"].startswith("http"):
                fav_url = config_obj["favicon"]
                fname, ok = download_asset(fav_url, assets_dir)
                if ok:
                    config_obj["favicon"] = f"/assets/{fname}"

            with open(os.path.join(docs_dir, "mint.json"), "w", encoding="utf-8") as f:
                json.dump(config_obj, f, indent=2)
            print("  [✓] docs/mint.json")
    except Exception as e:
        print(f"  [!] Warning: Could not extract mint.json dynamically: {e}")


def main():
    print("=" * 70)
    print("  VectorShift Mintlify Documentation Scraper")
    print(f"  Target: {BASE_URL}")
    print(f"  Destination: {DOCS_DIR}")
    print("=" * 70)

    os.makedirs(ASSETS_DIR, exist_ok=True)
    urls = discover_urls()

    # Step 1: Scrape all pages concurrently
    print(f"\n[*] Concurrently fetching {len(urls)} markdown pages (threads={MAX_WORKERS})...")
    scraped_pages = []
    failed_pages = []
    all_img_urls = set()

    start_time = time.time()
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        future_to_url = {executor.submit(scrape_page, url, DOCS_DIR, ASSETS_DIR): url for url in urls}
        completed = 0
        total = len(future_to_url)

        for future in as_completed(future_to_url):
            url = future_to_url[future]
            completed += 1
            try:
                page_data = future.result()
                scraped_pages.append(page_data)
                for img_url in page_data["img_urls"]:
                    all_img_urls.add(img_url)
                if completed % 25 == 0 or completed == total:
                    print(f"  [{completed:3d}/{total:3d}] Pages downloaded ({completed/total*100:.1f}%)")
            except Exception as e:
                print(f"  [!] Failed page ({url}): {e}")
                failed_pages.append({"url": url, "error": str(e)})

    fetch_elapsed = time.time() - start_time
    print(f"[+] Downloaded {len(scraped_pages)} pages in {fetch_elapsed:.2f}s (failed: {len(failed_pages)})")

    # Step 2: Download all unique media assets concurrently
    print(f"\n[*] Downloading {len(all_img_urls)} unique media assets to docs/assets/ ...")
    url_to_asset_file = {}
    asset_start_time = time.time()
    
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        future_to_img = {executor.submit(download_asset, img_url, ASSETS_DIR): img_url for img_url in all_img_urls}
        for future in as_completed(future_to_img):
            img_url = future_to_img[future]
            try:
                filename, ok = future.result()
                if ok:
                    url_to_asset_file[img_url] = filename
            except Exception as e:
                print(f"  [!] Failed asset ({img_url}): {e}")

    asset_elapsed = time.time() - asset_start_time
    print(f"[+] Successfully saved {len(url_to_asset_file)} assets in {asset_elapsed:.2f}s")

    # Step 3: Rewrite markdown image links & save files to organized directory
    print("\n[*] Writing organized Markdown files with rewritten relative asset links...")
    manifest_entries = []
    
    for p in scraped_pages:
        dest_path = p["dest_path"]
        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
        
        rewritten_content = rewrite_markdown_images(
            p["content"],
            dest_path,
            DOCS_DIR,
            ASSETS_DIR,
            url_to_asset_file
        )
        
        with open(dest_path, "w", encoding="utf-8") as f:
            f.write(rewritten_content)

        manifest_entries.append({
            "title": p["title"],
            "url": p["url"],
            "file": p["rel_path"],
            "word_count": p["word_count"],
            "assets_count": len(p["img_urls"])
        })

    # Also make sure docs/index.md exists pointing to introduction
    intro_path = os.path.join(DOCS_DIR, "introduction.md")
    index_path = os.path.join(DOCS_DIR, "index.md")
    if os.path.exists(intro_path) and not os.path.exists(index_path):
        with open(intro_path, "r", encoding="utf-8") as fin:
            with open(index_path, "w", encoding="utf-8") as fout:
                fout.write(fin.read())

    # Step 4: Download static artifacts (mint.json, llms.txt, etc.)
    download_static_artifacts(DOCS_DIR, ASSETS_DIR)

    # Step 5: Save manifest.json
    print("\n[*] Generating docs/manifest.json ...")
    sections_count = {}
    for entry in manifest_entries:
        parts = entry["file"].split("/")
        sec = parts[0] if len(parts) > 1 else "root"
        sections_count[sec] = sections_count.get(sec, 0) + 1

    manifest = {
        "scraped_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "base_url": BASE_URL,
        "platform": "Mintlify",
        "total_pages": len(manifest_entries),
        "total_assets": len(url_to_asset_file),
        "total_words": sum(e["word_count"] for e in manifest_entries),
        "sections": sections_count,
        "failed_pages": failed_pages,
        "pages": sorted(manifest_entries, key=lambda x: x["file"])
    }

    with open(os.path.join(DOCS_DIR, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

    total_time = time.time() - start_time
    print(f"\n{'=' * 70}")
    print(f"  SCRAPING COMPLETE in {total_time:.2f}s!")
    print(f"  - Total Pages Scraped: {len(manifest_entries)}")
    print(f"  - Total Assets Cloned:  {len(url_to_asset_file)}")
    print(f"  - Manifest Location:   docs/manifest.json")
    print(f"{'=' * 70}\n")


if __name__ == "__main__":
    main()
