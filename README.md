# VectorShift Documentation & Marketing Site Mirror

A complete, offline-capable mirror of:
1. **VectorShift Documentation** (`https://docs.vectorshift.ai`): All 292 Mintlify Markdown pages and 445 media assets.
2. **VectorShift Marketing Site & Private Equity Glossary** (`https://vectorshift.ai`): 227 pages (both clean Markdown and offline HTML) covering product architecture, use cases, security, and the complete 215-term private market glossary.

---

## 📁 Repository Structure

```text
.
├── README.md                                  # Complete repository guide
│
├── docs/                                      # Cloned Mintlify documentation
│   ├── manifest.json                          # Full scrape manifest (pages, sections, stats)
│   ├── mint.json                              # Mintlify site config (theme, branding, navigation)
│   ├── sitemap.xml                            # Docs sitemap
│   ├── llms.txt                               # Curated LLM docs index
│   ├── llms-full.txt                          # 2.23 MB complete LLM text corpus
│   ├── introduction.md & index.md             # Core getting started
│   ├── quickstart.md                          # Platform quickstart
│   ├── support.md                             # Support & community
│   ├── sub-processors.md                      # Security & sub-processors
│   ├── assets/                                # 445 cloned images and animated GIFs
│   ├── account/                               # Account & organization management (6 pages)
│   ├── api-reference/                         # REST API endpoints (31 pages)
│   ├── nodes/                                 # Platform pipeline nodes (53 pages)
│   ├── platform/                              # No-code visual platform (61 pages)
│   └── sdk/                                   # Python SDK documentation (137 pages)
│
├── marketing/                                 # Cloned marketing site & PE glossary
│   ├── manifest.json                          # Marketing pages registry, stats, and categories
│   ├── sitemap.xml                            # Original marketing sitemap
│   ├── assets/                                # 170+ downloaded wordmarks, logos, and illustrations
│   ├── html/                                  # Offline static HTML mirror (227 pages)
│   │   ├── index.html                         # Home page
│   │   ├── product.html                       # Product architecture & financial workflows
│   │   ├── use-cases.html                     # Investment workflows
│   │   ├── resources.html                     # Resources center
│   │   ├── security.html                      # Security & compliance
│   │   ├── data-and-privacy.html              # Privacy architecture
│   │   ├── blog.html                          # Blog & announcements
│   │   ├── privacy-policy.html
│   │   ├── terms-conditions.html
│   │   ├── terms-of-service.html
│   │   └── glossary/                          # 216 Private Equity glossary HTML pages
│   │       ├── index.html
│   │       ├── adjusted-ebitda.html
│   │       ├── 100-day-plan.html
│   │       ├── accretion-dilution.html
│   │       └── ...
│   └── markdown/                              # Clean structured Markdown extracts (227 pages)
│       ├── index.md
│       ├── product.md
│       ├── use-cases.md
│       ├── resources.md
│       ├── security.md
│       ├── data-and-privacy.md
│       ├── blog.md
│       ├── privacy-policy.md
│       ├── terms-conditions.md
│       ├── terms-of-service.md
│       └── glossary/                          # 216 Private Equity glossary Markdown pages
│           ├── index.md
│           ├── adjusted-ebitda.md
│           ├── 100-day-plan.md
│           ├── accretion-dilution.md
│           └── ...
│
└── scripts/
    ├── scrape_docs.py                         # Multi-threaded documentation scraper
    ├── verify_clone.py                        # Documentation integrity verification suite
    ├── scrape_marketing.py                    # Multi-threaded marketing site scraper & converter
    └── verify_marketing.py                    # Marketing integrity verification suite
```

---

## 🚀 Quickstart & Commands

Both scrapers and verification suites use Python 3's built-in standard library. **No external pip packages are required.**

### 1. Re-Scrape or Update Documentation
```bash
python3 scripts/scrape_docs.py
python3 scripts/verify_clone.py
```

### 2. Re-Scrape or Update Marketing Site & Glossary
```bash
python3 scripts/scrape_marketing.py
python3 scripts/verify_marketing.py
```

---

## 📊 Mirror Statistics

| Component | Pages | Disk Format | Words | Local Assets | Broken Links |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Documentation** (`docs.vectorshift.ai`) | **292** | Markdown (`.md`) | 284,608 | 445 | 0 |
| **Marketing & PE Glossary** (`vectorshift.ai`) | **227** | HTML + Markdown | 283,076 | 170 | 0 |
| **Total Corpus** | **519 pages** | Dual | **567,684 words** | **615 assets** | **0** |
