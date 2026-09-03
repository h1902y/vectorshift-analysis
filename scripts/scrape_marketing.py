#!/usr/bin/env python3
"""
VectorShift Marketing Site & PE Glossary Scraper
Clones 100% of https://vectorshift.ai marketing pages and private market glossary:
 - 12 Core Marketing Pages (Home, Product, Use Cases, Resources, Security, etc.)
 - 215 Private Equity & M&A Glossary Terms
 - Both Clean Markdown (.md) and Offline Static HTML (.html)
 - Embedded Assets & Logos downloaded locally with rewritten relative paths
 - marketing/manifest.json
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
from html.parser import HTMLParser
from concurrent.futures import ThreadPoolExecutor, as_completed

BASE_URL = "https://vectorshift.ai"
WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MARKETING_DIR = os.path.join(WORKSPACE_DIR, "marketing")
HTML_DIR = os.path.join(MARKETING_DIR, "html")
MD_DIR = os.path.join(MARKETING_DIR, "markdown")
ASSETS_DIR = os.path.join(MARKETING_DIR, "assets")

USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
MAX_WORKERS = 10
MAX_RETRIES = 3
TIMEOUT_SECS = 20

IMG_SRC_REGEX = re.compile(r'(<img[^>]+src=["\'])([^"\'\s]+)(["\'])', re.IGNORECASE)
LINK_HREF_REGEX = re.compile(r'(<link[^>]+(?:href)=["\'])([^"\'\s]+\.(?:png|ico|svg|jpg|jpeg|webp))(["\'])', re.IGNORECASE)
OG_IMAGE_REGEX = re.compile(r'(<meta[^>]+property=["\']og:image["\'][^>]+content=["\'])([^"\'\s]+)(["\'])', re.IGNORECASE)


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


def discover_marketing_urls():
    """Extracts non-research marketing URLs from sitemap.xml."""
    print(f"[*] Fetching marketing sitemap from {BASE_URL}/sitemap.xml ...")
    data, _, _ = fetch_url(f"{BASE_URL}/sitemap.xml")
    root = ET.fromstring(data)

    urls = set()
    for elem in root.findall(".//{*}loc"):
        loc = (elem.text or "").strip()
        if not loc.startswith(BASE_URL):
            continue
        # Filter out 9,700+ programmatic company research pages
        if "/research/" in loc and loc != f"{BASE_URL}/research":
            continue
        urls.add(loc)

    # Guarantee core marketing roots are present
    core_pages = [
        f"{BASE_URL}/",
        f"{BASE_URL}/product",
        f"{BASE_URL}/use-cases",
        f"{BASE_URL}/resources",
        f"{BASE_URL}/security",
        f"{BASE_URL}/data-and-privacy",
        f"{BASE_URL}/blog",
        f"{BASE_URL}/glossary",
        f"{BASE_URL}/research",
        f"{BASE_URL}/terms-conditions",
        f"{BASE_URL}/terms-of-service",
        f"{BASE_URL}/privacy-policy"
    ]
    for cp in core_pages:
        urls.add(cp)

    canonical_urls = sorted(list(urls))
    print(f"[+] Discovered {len(canonical_urls)} marketing & glossary URLs.")
    return canonical_urls


def url_to_relative_paths(url):
    """Maps a vectorshift.ai URL to relative paths for html and markdown files."""
    parsed = urllib.parse.urlparse(url)
    path = parsed.path.strip("/")

    if not path or path == "index":
        return "index.html", "index.md"

    if path == "glossary":
        return "glossary/index.html", "glossary/index.md"

    if path.startswith("glossary/"):
        term = path[len("glossary/"):].strip("/")
        return f"glossary/{term}.html", f"glossary/{term}.md"

    return f"{path}.html", f"{path}.md"


def get_asset_filename(asset_url):
    """Generates a clean, collision-free filename for an asset URL."""
    parsed = urllib.parse.urlparse(asset_url)
    path_part = parsed.path.strip("/").split("/")[-1]

    ext = os.path.splitext(path_part)[1].lower()
    if not ext or len(ext) > 5 or not ext[1:].isalnum():
        ext = ".png"

    base_name = os.path.splitext(path_part)[0]
    base_name = re.sub(r'[^a-zA-Z0-9_\-]', '_', base_name)[:40]
    if not base_name:
        base_name = "asset"

    url_hash = hashlib.sha256(asset_url.encode("utf-8")).hexdigest()[:8]
    return f"{base_name}_{url_hash}{ext}"


def download_asset(asset_url, assets_dir):
    """Downloads an external or absolute asset to assets_dir."""
    full_url = urllib.parse.urljoin(BASE_URL, asset_url)
    filename = get_asset_filename(full_url)
    dest_path = os.path.join(assets_dir, filename)

    if os.path.exists(dest_path) and os.path.getsize(dest_path) > 0:
        return asset_url, filename, True

    try:
        data, _, _ = fetch_url(full_url)
        with open(dest_path, "wb") as f:
            f.write(data)
        return asset_url, filename, True
    except Exception as e:
        print(f"[!] Warning: Failed downloading asset {full_url}: {e}")
        return asset_url, filename, False


class HtmlToMarkdownConverter(HTMLParser):
    """Converts marketing HTML into clean, well-formatted Markdown."""
    def __init__(self, asset_map=None, current_file_dir=None):
        super().__init__()
        self.output = []
        self.title = ""
        self.description = ""
        self.ignore = False
        self.in_title = False
        self.heading_level = 0
        self.in_list = 0
        self.asset_map = asset_map or {}
        self.current_file_dir = current_file_dir or ""

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        tag_lower = tag.lower()

        if tag_lower in ["script", "style", "svg", "noscript"]:
            self.ignore = True
            return

        if tag_lower == "title":
            self.in_title = True
            return

        if tag_lower == "meta" and attrs_dict.get("name") == "description":
            self.description = attrs_dict.get("content", "").strip()
            return

        if self.ignore:
            return

        if tag_lower in ["h1", "h2", "h3", "h4", "h5", "h6"]:
            self.heading_level = int(tag_lower[1])
            self.output.append(f"\n\n{'#' * self.heading_level} ")
        elif tag_lower in ["p", "div", "section", "article"]:
            if self.output and not self.output[-1].endswith("\n"):
                self.output.append("\n\n")
        elif tag_lower in ["ul", "ol"]:
            self.in_list += 1
            self.output.append("\n")
        elif tag_lower == "li":
            indent = "  " * max(0, self.in_list - 1)
            self.output.append(f"\n{indent}* ")
        elif tag_lower == "blockquote":
            self.output.append("\n\n> ")
        elif tag_lower in ["strong", "b"]:
            self.output.append("**")
        elif tag_lower in ["em", "i"]:
            self.output.append("*")
        elif tag_lower == "code":
            self.output.append("`")
        elif tag_lower == "a":
            href = attrs_dict.get("href", "")
            self.output.append("[")
            self._current_href = href
        elif tag_lower == "img":
            src = attrs_dict.get("src", "")
            alt = attrs_dict.get("alt", "image").strip()
            if src in self.asset_map and self.current_file_dir:
                asset_abs = os.path.join(ASSETS_DIR, self.asset_map[src])
                src = os.path.relpath(asset_abs, self.current_file_dir)
            self.output.append(f"\n\n![{alt}]({src})\n\n")

    def handle_endtag(self, tag):
        tag_lower = tag.lower()

        if tag_lower in ["script", "style", "svg", "noscript"]:
            self.ignore = False
            return

        if tag_lower == "title":
            self.in_title = False
            return

        if self.ignore:
            return

        if tag_lower in ["h1", "h2", "h3", "h4", "h5", "h6"]:
            self.heading_level = 0
            self.output.append("\n")
        elif tag_lower in ["ul", "ol"]:
            self.in_list = max(0, self.in_list - 1)
            self.output.append("\n")
        elif tag_lower in ["strong", "b"]:
            self.output.append("**")
        elif tag_lower in ["em", "i"]:
            self.output.append("*")
        elif tag_lower == "code":
            self.output.append("`")
        elif tag_lower == "a":
            href = getattr(self, "_current_href", "")
            self.output.append(f"]({href})")
            self._current_href = ""

    def handle_data(self, data):
        if self.in_title:
            self.title += data
            return

        if not self.ignore:
            text = " ".join(data.split())
            if text:
                self.output.append(text + " ")

    def get_markdown(self, url):
        clean_text = "".join(self.output)
        clean_text = re.sub(r'\n{3,}', '\n\n', clean_text).strip()

        header = []
        page_title = self.title.strip() or "VectorShift"
        header.append(f"# {page_title}\n")
        if self.description:
            header.append(f"> {self.description}\n")
        header.append(f"**Source**: [{url}]({url})\n\n---\n")

        return "\n".join(header) + "\n\n" + clean_text


def rewrite_html_assets(html, file_dir, asset_map):
    """Rewrites image/icon/media URLs in HTML to relative disk paths."""
    def repl_img(match):
        prefix = match.group(1)
        src = match.group(2)
        suffix = match.group(3)
        if src in asset_map:
            asset_abs = os.path.join(ASSETS_DIR, asset_map[src])
            rel_path = os.path.relpath(asset_abs, file_dir)
            return f"{prefix}{rel_path}{suffix}"
        return match.group(0)

    def repl_link(match):
        prefix = match.group(1)
        href = match.group(2)
        suffix = match.group(3)
        if href in asset_map:
            asset_abs = os.path.join(ASSETS_DIR, asset_map[href])
            rel_path = os.path.relpath(asset_abs, file_dir)
            return f"{prefix}{rel_path}{suffix}"
        return match.group(0)

    rewritten = IMG_SRC_REGEX.sub(repl_img, html)
    rewritten = LINK_HREF_REGEX.sub(repl_link, rewritten)
    rewritten = OG_IMAGE_REGEX.sub(repl_img, rewritten)
    return rewritten


def scrape_marketing_page(url):
    """Fetches a single marketing page and extracts content and assets."""
    rel_html, rel_md = url_to_relative_paths(url)
    data, _, _ = fetch_url(url)
    html = data.decode("utf-8", errors="ignore")

    # Discover all assets
    assets = set()
    for m in IMG_SRC_REGEX.finditer(html):
        assets.add(m.group(2))
    for m in LINK_HREF_REGEX.finditer(html):
        assets.add(m.group(2))
    for m in OG_IMAGE_REGEX.finditer(html):
        assets.add(m.group(2))

    return {
        "url": url,
        "rel_html": rel_html,
        "rel_md": rel_md,
        "html": html,
        "assets": list(assets)
    }


def main():
    print("=" * 70)
    print("  VectorShift Marketing Site & PE Glossary Scraper")
    print(f"  Target: {BASE_URL}")
    print(f"  Destination: {MARKETING_DIR}")
    print("=" * 70)

    os.makedirs(HTML_DIR, exist_ok=True)
    os.makedirs(MD_DIR, exist_ok=True)
    os.makedirs(ASSETS_DIR, exist_ok=True)

    urls = discover_marketing_urls()

    # Step 1: Concurrently fetch all pages
    print(f"\n[*] Concurrently fetching {len(urls)} marketing pages (threads={MAX_WORKERS})...")
    scraped_pages = []
    failed_pages = []
    all_asset_urls = set()

    start_time = time.time()
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        future_to_url = {executor.submit(scrape_marketing_page, url): url for url in urls}
        completed = 0
        total = len(future_to_url)

        for future in as_completed(future_to_url):
            url = future_to_url[future]
            completed += 1
            try:
                page_data = future.result()
                scraped_pages.append(page_data)
                for a in page_data["assets"]:
                    if not a.startswith("data:"):
                        all_asset_urls.add(a)
                if completed % 25 == 0 or completed == total:
                    print(f"  [{completed:3d}/{total:3d}] Pages downloaded ({completed/total*100:.1f}%)")
            except Exception as e:
                print(f"  [!] Failed page ({url}): {e}")
                failed_pages.append({"url": url, "error": str(e)})

    fetch_elapsed = time.time() - start_time
    print(f"[+] Downloaded {len(scraped_pages)} pages in {fetch_elapsed:.2f}s (failed: {len(failed_pages)})")

    # Step 2: Download all unique assets
    print(f"\n[*] Downloading {len(all_asset_urls)} unique marketing assets to marketing/assets/ ...")
    asset_map = {}
    asset_start_time = time.time()

    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        future_to_asset = {executor.submit(download_asset, a, ASSETS_DIR): a for a in all_asset_urls}
        for future in as_completed(future_to_asset):
            orig_url = future_to_asset[future]
            try:
                url_key, filename, ok = future.result()
                if ok:
                    asset_map[orig_url] = filename
            except Exception as e:
                print(f"  [!] Asset download error ({orig_url}): {e}")

    asset_elapsed = time.time() - asset_start_time
    print(f"[+] Successfully saved {len(asset_map)} assets in {asset_elapsed:.2f}s")

    # Step 3: Write HTML and Markdown files
    print("\n[*] Writing organized HTML and Markdown files with relative asset links...")
    manifest_entries = []

    for p in scraped_pages:
        html_dest = os.path.join(HTML_DIR, p["rel_html"])
        md_dest = os.path.join(MD_DIR, p["rel_md"])

        os.makedirs(os.path.dirname(html_dest), exist_ok=True)
        os.makedirs(os.path.dirname(md_dest), exist_ok=True)

        # 1. Rewrite HTML
        rewritten_html = rewrite_html_assets(p["html"], os.path.dirname(html_dest), asset_map)
        with open(html_dest, "w", encoding="utf-8") as f:
            f.write(rewritten_html)

        # 2. Convert to Markdown
        parser = HtmlToMarkdownConverter(asset_map=asset_map, current_file_dir=os.path.dirname(md_dest))
        parser.feed(p["html"])
        md_content = parser.get_markdown(p["url"])
        with open(md_dest, "w", encoding="utf-8") as f:
            f.write(md_content)

        manifest_entries.append({
            "title": parser.title.strip() or p["rel_md"],
            "url": p["url"],
            "html_file": p["rel_html"],
            "markdown_file": p["rel_md"],
            "word_count": len(md_content.split()),
            "category": "glossary" if "glossary" in p["rel_md"] else "core_marketing"
        })

    # Step 4: Download marketing sitemap
    try:
        sitemap_data, _, _ = fetch_url(f"{BASE_URL}/sitemap.xml")
        with open(os.path.join(MARKETING_DIR, "sitemap.xml"), "wb") as f:
            f.write(sitemap_data)
        print("  [✓] marketing/sitemap.xml")
    except Exception as e:
        print(f"  [!] Could not save sitemap: {e}")

    # Step 5: Save manifest.json
    print("\n[*] Generating marketing/manifest.json ...")
    categories = {}
    for e in manifest_entries:
        cat = e["category"]
        categories[cat] = categories.get(cat, 0) + 1

    manifest = {
        "scraped_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "base_url": BASE_URL,
        "total_pages": len(manifest_entries),
        "total_assets": len(asset_map),
        "total_words": sum(e["word_count"] for e in manifest_entries),
        "categories": categories,
        "pages": sorted(manifest_entries, key=lambda x: x["markdown_file"])
    }

    with open(os.path.join(MARKETING_DIR, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

    total_time = time.time() - start_time
    print(f"\n{'=' * 70}")
    print(f"  MARKETING CLONING COMPLETE in {total_time:.2f}s!")
    print(f"  - Total Pages Cloned:   {len(manifest_entries)} (HTML & Markdown)")
    print(f"  - Total Assets Cloned:  {len(asset_map)}")
    print(f"  - Manifest Location:    marketing/manifest.json")
    print(f"{'=' * 70}\n")


if __name__ == "__main__":
    main()
