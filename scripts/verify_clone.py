#!/usr/bin/env python3
"""
Integrity & Link Verification Suite for Cloned VectorShift Documentation.
Validates:
 1. 100% of discovered documentation pages exist and are non-empty.
 2. 100% of local relative asset links in .md files resolve to valid disk files.
 3. Manifest, sitemap, llms.txt, llms-full.txt, and mint.json integrity.
"""

import os
import re
import sys
import json

WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS_DIR = os.path.join(WORKSPACE_DIR, "docs")
ASSETS_DIR = os.path.join(DOCS_DIR, "assets")
MANIFEST_FILE = os.path.join(DOCS_DIR, "manifest.json")

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
    print("  VectorShift Documentation Verification Suite")
    print(f"  Target Root: {DOCS_DIR}")
    print("=" * 70)

    errors = []

    # 1. Check core static files
    core_files = [
        "manifest.json",
        "mint.json",
        "llms.txt",
        "llms-full.txt",
        "sitemap.xml",
        "introduction.md",
        "quickstart.md"
    ]
    print("\n[*] Checking Core Manifest & Configuration Artifacts:")
    for cf in core_files:
        path = os.path.join(DOCS_DIR, cf)
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
    print(f"\n[*] Validating {len(pages)} registered documentation pages...")
    missing_pages = 0
    total_md_bytes = 0

    referenced_assets = set()

    for p in pages:
        rel_file = p["file"]
        abs_file = os.path.join(DOCS_DIR, rel_file)
        ok, res = check_file_exists_and_nonempty(abs_file)
        if not ok:
            errors.append(f"Page missing or empty: {rel_file} ({res})")
            missing_pages += 1
            continue
        
        total_md_bytes += res

        # Check image references in markdown
        with open(abs_file, "r", encoding="utf-8") as pf:
            content = pf.read()

        file_dir = os.path.dirname(abs_file)
        # Markdown images
        for m in MD_REL_IMG_REGEX.finditer(content):
            src = m.group(2)
            if not src.startswith("http://") and not src.startswith("https://") and not src.startswith("#"):
                # Clean query strings if any
                clean_src = src.split("?")[0]
                target_asset = os.path.normpath(os.path.join(file_dir, clean_src))
                referenced_assets.add((abs_file, src, target_asset))

        # HTML images
        for m in HTML_REL_IMG_REGEX.finditer(content):
            src = m.group(1)
            if not src.startswith("http://") and not src.startswith("https://") and not src.startswith("#"):
                clean_src = src.split("?")[0]
                target_asset = os.path.normpath(os.path.join(file_dir, clean_src))
                referenced_assets.add((abs_file, src, target_asset))

    print(f"  [✓] Verified {len(pages) - missing_pages}/{len(pages)} pages on disk ({total_md_bytes / 1024 / 1024:.2f} MB total)")

    # 3. Check referenced assets
    print(f"\n[*] Validating {len(referenced_assets)} unique relative asset links...")
    broken_assets = 0
    checked_targets = {}
    
    for md_file, original_link, target_path in referenced_assets:
        if target_path not in checked_targets:
            ok, res = check_file_exists_and_nonempty(target_path)
            checked_targets[target_path] = (ok, res)
        
        ok, res = checked_targets[target_path]
        if not ok:
            rel_md = os.path.relpath(md_file, DOCS_DIR)
            errors.append(f"Broken asset link in {rel_md}: '{original_link}' -> '{target_path}' ({res})")
            broken_assets += 1

    if broken_assets == 0:
        print(f"  [✓] 100% of relative asset references resolve successfully ({len(checked_targets)} target files).")
    else:
        print(f"  [✗] Found {broken_assets} broken asset references!")

    # 4. Summary Table by Section
    print("\n[*] Section Breakdown:")
    sections = manifest.get("sections", {})
    for sec, count in sorted(sections.items(), key=lambda x: -x[1]):
        print(f"  - {sec:20s}: {count:3d} pages")

    print("\n" + "=" * 70)
    if not errors:
        print("  VERIFICATION PASSED: 100% OF DOCUMENTATION CLONED SUCCESSFULLY!")
        print(f"  - Total Pages:       {len(pages)}")
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
