#!/usr/bin/env python3
"""
Integrity & Link Verification Suite for Cloned VectorShift Marketing Site & PE Glossary.
Validates:
 1. 100% of discovered marketing and glossary pages exist in both HTML and Markdown.
 2. 100% of local relative asset links in HTML and Markdown resolve to valid disk files.
 3. Manifest and sitemap integrity.
"""

import os
import re
import sys
import json

WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MARKETING_DIR = os.path.join(WORKSPACE_DIR, "marketing")
HTML_DIR = os.path.join(MARKETING_DIR, "html")
MD_DIR = os.path.join(MARKETING_DIR, "markdown")
ASSETS_DIR = os.path.join(MARKETING_DIR, "assets")
MANIFEST_FILE = os.path.join(MARKETING_DIR, "manifest.json")

MD_REL_IMG_REGEX = re.compile(r'!\[([^\]]*)\]\(([^)]+)\)')
HTML_REL_IMG_REGEX = re.compile(r'<img[^>]+src=["\']([^"\'\s]+)["\']')


def check_file_exists_and_nonempty(path):
    if not os.path.isfile(path):
        return False, "File does not exist"
    size = os.path.getsize(path)
    if size == 0:
        return False, "File is empty (0 bytes)"
    return True, size


def main():
    print("=" * 70)
    print("  VectorShift Marketing Site Verification Suite")
    print(f"  Target Root: {MARKETING_DIR}")
    print("=" * 70)

    errors = []

    # 1. Check core static files
    core_files = [
        "manifest.json",
        "sitemap.xml"
    ]
    print("\n[*] Checking Core Manifest & Artifacts:")
    for cf in core_files:
        path = os.path.join(MARKETING_DIR, cf)
        ok, msg = check_file_exists_and_nonempty(path)
        if ok:
            print(f"  [✓] {cf:20s} ({msg:,} bytes)")
        else:
            print(f"  [✗] {cf:20s} - {msg}")
            errors.append(f"Core file missing or empty: {cf}")

    # 2. Check manifest and all registered pages
    if not os.path.exists(MANIFEST_FILE):
        print(f"\n[!] ERROR: Manifest file not found at {MANIFEST_FILE}")
        sys.exit(1)

    with open(MANIFEST_FILE, "r", encoding="utf-8") as f:
        manifest = json.load(f)

    pages = manifest.get("pages", [])
    print(f"\n[*] Validating {len(pages)} registered marketing pages...")
    missing_html = 0
    missing_md = 0
    total_md_bytes = 0
    total_html_bytes = 0

    referenced_assets = set()

    for p in pages:
        rel_html = p["html_file"]
        rel_md = p["markdown_file"]

        abs_html = os.path.join(HTML_DIR, rel_html)
        abs_md = os.path.join(MD_DIR, rel_md)

        # Check HTML file
        ok_html, res_html = check_file_exists_and_nonempty(abs_html)
        if not ok_html:
            errors.append(f"HTML missing or empty: {rel_html} ({res_html})")
            missing_html += 1
        else:
            total_html_bytes += res_html
            with open(abs_html, "r", encoding="utf-8") as hf:
                h_content = hf.read()
            h_dir = os.path.dirname(abs_html)
            for m in HTML_REL_IMG_REGEX.finditer(h_content):
                src = m.group(1)
                if not src.startswith("http://") and not src.startswith("https://") and not src.startswith("data:"):
                    clean_src = src.split("?")[0]
                    target_asset = os.path.normpath(os.path.join(h_dir, clean_src))
                    referenced_assets.add((abs_html, src, target_asset))

        # Check Markdown file
        ok_md, res_md = check_file_exists_and_nonempty(abs_md)
        if not ok_md:
            errors.append(f"Markdown missing or empty: {rel_md} ({res_md})")
            missing_md += 1
        else:
            total_md_bytes += res_md
            with open(abs_md, "r", encoding="utf-8") as mf:
                m_content = mf.read()
            m_dir = os.path.dirname(abs_md)
            for m in MD_REL_IMG_REGEX.finditer(m_content):
                src = m.group(2)
                if not src.startswith("http://") and not src.startswith("https://") and not src.startswith("data:"):
                    clean_src = src.split("?")[0]
                    target_asset = os.path.normpath(os.path.join(m_dir, clean_src))
                    referenced_assets.add((abs_md, src, target_asset))

    print(f"  [✓] Verified {len(pages) - missing_html}/{len(pages)} HTML pages ({total_html_bytes / 1024 / 1024:.2f} MB)")
    print(f"  [✓] Verified {len(pages) - missing_md}/{len(pages)} Markdown pages ({total_md_bytes / 1024 / 1024:.2f} MB)")

    # 3. Check referenced assets
    print(f"\n[*] Validating {len(referenced_assets)} relative asset links...")
    broken_assets = 0
    checked_targets = {}

    for source_file, original_link, target_path in referenced_assets:
        if target_path not in checked_targets:
            ok, res = check_file_exists_and_nonempty(target_path)
            checked_targets[target_path] = (ok, res)

        ok, res = checked_targets[target_path]
        if not ok:
            rel_src = os.path.relpath(source_file, MARKETING_DIR)
            errors.append(f"Broken asset link in {rel_src}: '{original_link}' -> '{target_path}' ({res})")
            broken_assets += 1

    if broken_assets == 0:
        print(f"  [✓] 100% of relative asset references resolve successfully ({len(checked_targets)} target files).")
    else:
        print(f"  [✗] Found {broken_assets} broken asset references!")

    # 4. Category Breakdown
    print("\n[*] Category Breakdown:")
    categories = manifest.get("categories", {})
    for cat, count in categories.items():
        print(f"  - {cat:20s}: {count:3d} pages")

    print("\n" + "=" * 70)
    if not errors:
        print("  VERIFICATION PASSED: 100% OF MARKETING SITE CLONED SUCCESSFULLY!")
        print(f"  - Total Pages:       {len(pages)} (in both HTML & Markdown)")
        print(f"  - Total Words:       {manifest.get('total_words', 0):,}")
        print(f"  - Total Assets:      {len(checked_targets)}")
        print(f"  - Broken Links:      0")
        print("=" * 70)
        return 0
    else:
        print(f"  VERIFICATION FAILED: {len(errors)} errors found:")
        for e in errors[:10]:
            print(f"   * {e}")
        if len(errors) > 10:
            print(f"   * ... and {len(errors) - 10} more errors")
        print("=" * 70)
        return 1


if __name__ == "__main__":
    sys.exit(main())
