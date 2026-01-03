# Kanonical Site Migration Specification

**Author:** Greg Olsen
**Date:** January 2, 2026
**Status:** Draft for Review

---

## Executive Summary

Kanonical is a 16-year personal site that functions as a **life management interface**—not merely a blog. It aggregates blog posts, books, workouts, quotes, vocabulary, and goals into a unified experience. The current Gatsby implementation has served well but suffers from JS ecosystem fatigue, GraphQL complexity, and dependency management anxiety.

This specification defines requirements for migrating to a new architecture that prioritizes **longevity** (10+ year horizon), **content portability**, and **reduced friction** in the publishing workflow.

---

## 1. Core Philosophy

### What This Site Is
- A **curious generalist's** public notebook
- A **builder/maker's** portfolio of thinking
- A **thoughtful writer's** long-form archive
- A place where personal data (books, workouts, quotes) is treated as first-class content

### What Success Looks Like
> "Confidence in longevity—I trust this will work for another 10+ years."

Not faster publishing. Not prettier design. **Stability and durability.**

---

## 2. Architecture Principles

### 2.1 Content-Framework Separation (Critical)

The content layer MUST be completely decoupled from the framework layer:

```
/content/              ← Portable, framework-agnostic
  /blog/               ← Markdown files with frontmatter
  /data/               ← YAML/JSON for static data (optional)

/framework/            ← Replaceable SSG implementation
  (Astro, Jekyll, 11ty, Hugo, custom, etc.)
```

**Rationale:** If the framework dies (like Gatsby is dying), content migration should be trivial. Markdown is the contract.

### 2.2 Local-First Development

- Full local build and preview before any deployment
- No reliance on cloud services for development workflow
- `npm run dev` or equivalent must render the complete site locally

### 2.3 Stable Foundation Over Evolvability

The owner wants a **finished** site, not a platform to tinker with endlessly. Choose boring, proven technology over cutting-edge.

---

## 3. Content Inventory

### 3.1 Blog Posts (~50+ files)

**Location:** `/content/blog/`
**Format:** Markdown with YAML frontmatter
**Naming:** `YYYY-MM-DD-slug.md`

**Current Frontmatter:**
```yaml
---
title: Post Title
date: 2026-01-01T22:39:00.000Z
path: /custom-slug/          # URL path (MUST preserve)
type: goals                  # Used for filtering
description: Optional excerpt
---
```

**Required Enhancements:**
- Add optional `tags: []` array for multi-topic posts
- Keep `type` for backward compatibility, but tags become primary taxonomy

**Content Features Used:**
- Standard Markdown
- Code blocks with syntax highlighting (basic Prism-level)
- Images (inline and figure-style)
- YouTube embeds (responsive iframes)
- Internal links between posts

**NOT Used:**
- MDX (React components in Markdown)—can be dropped entirely

### 3.2 Tumble (Tumblelog)

**Current:** `src/pages/tumble.js`
**Purpose:** 15+ years of curated bookmarks—links, quotes, words, images, videos
**Data Source:** Google Sheets (Links sheet + Words sheet)

**Features to Preserve:**
- Masonry/grid layout
- Type filtering (Links, Quotes, Words, All)
- Relative time display ("3 days ago")
- Infinite scroll feel

**Architecture Decision:** Keep as separate page, not integrated into homepage.

### 3.3 External Data Sources (Google Sheets)

**Four sheets, all must be preserved:**

| Sheet | Content | Usage |
|-------|---------|-------|
| Links | Quotes, links, misc | Tumble page, homepage quotes |
| Books | Reading tracker | Homepage "currently reading", /books page |
| Strava | Workout data | Homepage workouts section |
| Words | Vocabulary | Tumble page |

**Authentication:** Google Service Account via environment variable (`KANONICAL_SHEET_CRED`)

**Curation Model:** Actively curated via email automation (external system adds rows). This workflow is open to alternatives but must remain low-friction.

**Build Integration:** Sheets are fetched at build time. Pushes trigger builds; manual rebuilds for sheet-only updates.

### 3.4 Specialty Pages

All currently implemented as individual React components in `src/pages/`:

| Page | Purpose | Data Source |
|------|---------|-------------|
| `/` (homepage) | Unified dashboard | Multiple (posts, books, workouts, quotes) |
| `/blog` | Post listing with filtering | Markdown files |
| `/books` | Reading tracker | Google Sheets |
| `/goals` | Goal tracking | Markdown posts filtered by type |
| `/tumble` | Tumblelog | Google Sheets |
| `/essays` | Essay collection | Markdown filtered |
| `/cardinals` | Unknown—verify if still relevant | TBD |
| `/rving` | RV-related content | TBD |
| `/about` | Bio/about page | Markdown or static |

**Status:** All pages confirmed as still relevant.

---

## 4. URL Preservation (Critical)

### 4.1 Blog Post URLs

Posts define their own URLs via `path` frontmatter:

```yaml
path: /custom-slug/
```

**Requirement:** All existing URLs MUST work after migration. No redirects needed if URLs are identical.

### 4.2 Page URLs

Static pages must maintain their current paths:
- `/books`
- `/goals`
- `/tumble`
- `/blog`
- `/essays`
- `/about`
- etc.

### 4.3 Asset URLs

Images and linked files must either:
1. Maintain identical paths, OR
2. Have redirects configured

---

## 5. Design Direction

### 5.1 Overall Aesthetic

**Inspiration:** [thariq.io](https://www.thariq.io/) as *directional inspiration*, not a template.

**Key qualities to capture:**
- Typography-forward design
- Elegant navigation feel
- Restraint and breathing room
- Minimal visual noise

**Approach:** Fresh start. This is a redesign, not a recreation.

### 5.2 Elements to Preserve

| Element | Status | Rationale |
|---------|--------|-----------|
| Page transitions (Framer Motion style) | KEEP | Core to site identity |
| Reading progress bar | KEEP | Genuinely helps readers |
| Dark mode toggle | KEEP | Follow system preference by default |
| Infinite scroll on blog listing | KEEP | Preferred navigation pattern |
| Glassmorphism cards | DROP | Not essential, can reimagine |
| Current color scheme | DROP | Open to new palette |

### 5.3 Theme System

- Default to **system preference** (respects OS dark/light mode)
- Allow manual toggle
- Implement via CSS custom properties for instant switching
- No flash of wrong theme on load

### 5.4 Responsive Design

- Mobile-first approach
- Key breakpoint at 768px (current pattern)
- Typography scales with viewport
- Grid layouts collapse to single column on mobile

---

## 6. Technical Requirements

### 6.1 Framework Evaluation

Owner is **open to exploration**. Candidates to evaluate:

| Framework | Language | Pros | Cons |
|-----------|----------|------|------|
| **Astro** | JS/TS | Modern, partial hydration, good DX | Still JS ecosystem |
| **Jekyll** | Ruby | Owner has experience, stable, boring | Slower builds, Ruby env |
| **11ty (Eleventy)** | JS | Minimal, flexible, fast | Less structure than others |
| **Hugo** | Go | Extremely fast, single binary | Templating learning curve |
| **Zola** | Rust | Fast, single binary, simple | Smaller ecosystem |
| **Custom** | Any | Total control | Maintenance burden |

**Preferred languages:** TypeScript, Ruby, Elixir

**Owner used Jekyll previously**—this is a safe, known choice.

### 6.2 Build Requirements

- Full static site generation
- Local development server with hot reload
- Build time under 30 seconds for full site
- Incremental builds if possible

### 6.3 Data Layer

**What's wanted:**
- API-style abstraction: `getBooks()`, `getPosts()`, `getWorkouts()`
- SQL-like filtering capability
- Type-safe data structures (if TypeScript)
- No GraphQL

**Google Sheets Integration:**
- Fetch at build time via Google Sheets API
- Cache locally during development
- Service account authentication

### 6.4 Deployment

**Current:** Netlify
**Status:** Open to alternatives (Vercel, Cloudflare Pages)

**Requirements:**
- Automatic deploys on git push
- Preview deployments for branches
- Custom domain support
- HTTPS by default

### 6.5 Dependencies

**Tolerance:** "Whatever works"—dependency count is not a concern.

**But:** The JS ecosystem dependency churn is the core frustration. Prefer:
- Fewer layers of abstraction
- Dependencies with long-term maintenance
- Single-binary tools where possible (Hugo, Zola)

---

## 7. Content Workflow

### 7.1 Current Pain Points

1. **Frontmatter friction** - Setting up date, path, type, description is tedious
2. **Image handling** - Getting images into the right place and properly linked
3. **Draft process** - Currently drafts in Reflect, then moves to markdown

### 7.2 Ideal Workflow

```
1. Write in Reflect (or any editor)
2. Move to /content/blog/ as .md file
3. Minimal frontmatter (ideally auto-generated where possible)
4. Images in same directory or /static/, referenced relatively
5. Local preview
6. Git commit + push
7. Auto-deploy
```

### 7.3 Frontmatter Simplification

Consider deriving fields automatically:
- `date` from filename (`2026-01-02-slug.md` → Jan 2, 2026)
- `path` from filename if not specified
- `description` as first paragraph if not specified

Required fields:
- `title` (always manual)
- `tags` (optional, array)

---

## 8. Features by Priority

### 8.1 Must Have (Migration Blockers)

- [ ] All existing blog posts render correctly
- [ ] All URLs preserved (no broken links)
- [ ] Google Sheets integration for books, workouts, quotes, words
- [ ] Tumble page with filtering and masonry layout
- [ ] Dark mode with system preference default
- [ ] Reading progress indicator
- [ ] Page transitions/animations
- [ ] Infinite scroll on blog listing
- [ ] RSS feed
- [ ] Local development with full preview
- [ ] Responsive design

### 8.2 Should Have (High Value)

- [ ] Tags/categories system for posts
- [ ] Type-based filtering on blog page (preserve current behavior)
- [ ] Substack RSS import (auto-cross-post to personal site)
- [ ] Improved image handling in content workflow
- [ ] Sitemap generation

### 8.3 Nice to Have (Future Phases)

- [ ] Search functionality (client-side is fine)
- [ ] Related posts (tag-based or semantic)
- [ ] Comments/feedback mechanism
- [ ] Analytics (simpler than GA, or none)

### 8.4 Explicitly Out of Scope

- AI-powered features (semantic search, chatbots, etc.)
- CMS or admin interface
- User authentication
- E-commerce or payments
- Newsletter management (use Substack)

---

## 9. Migration Strategy

### 9.1 Approach: Parallel Build

1. Keep current Gatsby site running
2. Build new site in parallel (separate branch or repo)
3. Migrate content (should be trivial—it's markdown)
4. Validate all URLs work
5. Validate all data sources integrate
6. Validate visual design meets goals
7. Switch DNS
8. Deprecate Gatsby

### 9.2 Content Migration Checklist

- [ ] Export all markdown files (already in `/content/blog/`)
- [ ] Verify frontmatter compatibility
- [ ] Migrate images and assets
- [ ] Test all internal links
- [ ] Test all external embeds (YouTube, etc.)
- [ ] Validate code block syntax highlighting

### 9.3 Data Migration Checklist

- [ ] Google Sheets auth works in new framework
- [ ] Books data renders correctly
- [ ] Workouts data renders correctly
- [ ] Links/quotes data renders correctly
- [ ] Words data renders correctly
- [ ] Tumble page fully functional

### 9.4 URL Validation

Generate list of all current URLs:
```bash
# From sitemap or by crawling
curl https://www.kanonical.io/sitemap.xml
```

After migration, verify each URL returns 200.

---

## 10. Open Questions

### 10.1 Framework Decision

**Recommendation path:**
1. Build a minimal prototype in 2-3 candidates (Astro, Jekyll, Hugo)
2. Evaluate: build speed, DX, Google Sheets integration ease
3. Choose based on "which do I trust for 10 years?"

### 10.2 Specialty Pages

Need to verify current implementation and relevance of:
- `/cardinals`
- `/rving`
- `/essays`

Are these filtered views of blog posts, or distinct content?

### 10.3 GDPR/Cookie Consent

Current site has cookie consent banner. With simplified/no analytics:
- Is this still needed?
- Can privacy/cookies pages be simplified or removed?

### 10.4 Substack Integration

For Substack auto-import:
- Substack provides RSS at `username.substack.com/feed`
- At build time, fetch RSS, convert to markdown, render as posts
- Or: keep Substack links as external, just surface recent on homepage

---

## 11. Success Criteria

The migration is complete when:

1. **All content accessible** - Every blog post, every Tumble entry, every book
2. **All URLs work** - Zero broken inbound links
3. **Visual refresh achieved** - Site looks distinctly new, not a clone
4. **Build is reliable** - `npm run build` (or equivalent) never fails mysteriously
5. **Local preview works** - Can see full site before deploying
6. **Owner feels confident** - "This will work for another 10 years"

---

## Appendix A: Current Tech Stack

| Component | Current | Notes |
|-----------|---------|-------|
| Framework | Gatsby 3.14.6 | Static site generator |
| UI | React 16.14.0 | Component library |
| Styling | styled-components 5.3.1 | CSS-in-JS |
| Animation | Framer Motion 4.1.17 | Page transitions |
| Data | gatsby-source-google-spreadsheet | Sheets integration |
| Content | gatsby-transformer-remark | Markdown processing |
| Deployment | Netlify | Hosting + CI/CD |
| Analytics | Google Analytics (UA) | Rarely checked |

## Appendix B: File Structure Reference

```
/Users/mhyrr/work/kanonical/
├── content/
│   └── blog/              # ~50 markdown files (2008-2026)
├── src/
│   ├── components/        # React components
│   ├── pages/             # Page components (index, blog, books, etc.)
│   ├── templates/         # blog-post.js, page.js
│   └── styles/            # globalstyles.js, navstyles.js
├── static/                # Static assets
├── gatsby-config.js       # Plugin configuration
├── gatsby-node.js         # Build-time logic
└── package.json           # 40+ dependencies
```

## Appendix C: Design Reference

**Primary Inspiration:** [thariq.io](https://www.thariq.io/)
- Minimal, typography-focused
- Dark aesthetic (but user prefers system preference toggle)
- Subtle animations
- Single-column layout for reading

**Qualities to Capture:**
- Restraint
- Breathing room
- Elegant navigation
- Typography as primary design element

---

## Appendix D: Hugo Migration Roadmap

**Framework Decision: Hugo**

After evaluation, Hugo is the recommended framework for this migration based on:
- Single binary (zero runtime dependencies)
- 13+ years of stability
- Sub-second builds
- Native data file support for Google Sheets integration
- Proven 10+ year longevity track record

### D.1 Target Architecture

```
kanonical-hugo/
├── content/
│   ├── blog/                    # Migrated from /content/blog/
│   │   └── 2024-01-15-post.md
│   ├── about.md                 # Static pages as content
│   ├── essays/                  # Filtered collection
│   └── goals/                   # Filtered collection
├── data/
│   ├── books.json               # ← Fetched from Google Sheets
│   ├── workouts.json            # ← Fetched from Google Sheets
│   ├── links.json               # ← Fetched from Google Sheets
│   └── words.json               # ← Fetched from Google Sheets
├── layouts/
│   ├── _default/
│   │   ├── baseof.html          # Base template
│   │   ├── list.html            # List pages (blog index, etc.)
│   │   └── single.html          # Single post template
│   ├── partials/
│   │   ├── header.html
│   │   ├── footer.html
│   │   ├── head.html            # Meta, CSS, theme script
│   │   └── post-card.html
│   ├── blog/
│   │   ├── list.html            # Blog listing with infinite scroll
│   │   └── single.html          # Blog post template
│   ├── tumble/
│   │   └── list.html            # Tumble page with masonry
│   └── index.html               # Homepage
├── static/
│   ├── js/
│   │   └── main.js              # Transitions, progress bar, dark mode
│   ├── css/
│   │   └── style.css            # Or use Hugo Pipes for SCSS
│   └── images/
├── assets/                      # For Hugo Pipes (SCSS, JS bundling)
├── scripts/
│   └── fetch-sheets.py          # Google Sheets → JSON
├── hugo.toml                    # Site configuration
├── netlify.toml                 # Deployment configuration
└── README.md
```

### D.2 Phase 1: Foundation (The Proof)

**Goal:** One blog post renders correctly with working local dev.

**Steps:**

1. **Install Hugo**
   ```bash
   # macOS
   brew install hugo

   # Verify
   hugo version
   ```

2. **Scaffold new site**
   ```bash
   hugo new site kanonical-hugo
   cd kanonical-hugo
   ```

3. **Create minimal theme structure**
   ```bash
   mkdir -p layouts/_default layouts/partials
   ```

4. **Create base template** (`layouts/_default/baseof.html`)
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>{{ .Title }} | Kanonical</title>
     <link rel="stylesheet" href="/css/style.css">
   </head>
   <body>
     {{ partial "header.html" . }}
     <main>
       {{ block "main" . }}{{ end }}
     </main>
     {{ partial "footer.html" . }}
   </body>
   </html>
   ```

5. **Copy one blog post** from `/content/blog/` to test
   - Verify frontmatter compatibility
   - Hugo uses `url:` instead of `path:` for custom URLs

6. **Run local server**
   ```bash
   hugo server -D
   # Site at http://localhost:1313
   ```

**Success Criteria:** Blog post renders at correct URL, hot reload works.

### D.3 Phase 2: Content Migration

**Goal:** All 50+ blog posts rendering with correct URLs.

**Steps:**

1. **Frontmatter adaptation**

   Current Gatsby format:
   ```yaml
   ---
   title: Post Title
   date: 2026-01-01T22:39:00.000Z
   path: /custom-slug/
   type: goals
   description: Optional excerpt
   ---
   ```

   Hugo format:
   ```yaml
   ---
   title: Post Title
   date: 2026-01-01T22:39:00.000Z
   url: /custom-slug/              # 'url' instead of 'path'
   type: goals
   description: Optional excerpt
   tags: []                        # New: optional tags
   ---
   ```

2. **Bulk migration script** (`scripts/migrate-frontmatter.py`)
   ```python
   # Simple find/replace: 'path:' → 'url:'
   # Run once, verify, commit
   ```

3. **Copy content directory**
   ```bash
   cp -r ../kanonical/content/blog ./content/
   ```

4. **Verify URL preservation**
   ```bash
   hugo list all | grep -v "draft"
   # Compare against current sitemap
   ```

5. **Test internal links**
   - Hugo has built-in ref/relref for internal links
   - Or keep as relative markdown links

### D.4 Phase 3: Google Sheets Integration

**Goal:** Books, workouts, links, and words data available in templates.

**Steps:**

1. **Create fetch script** (`scripts/fetch-sheets.py`)
   ```python
   #!/usr/bin/env python3
   """
   Fetches Google Sheets data and writes to /data/*.json

   Usage: ./scripts/fetch-sheets.py

   Requires: KANONICAL_SHEET_CRED environment variable
   """

   import os
   import json
   from google.oauth2 import service_account
   from googleapiclient.discovery import build

   SHEETS = {
       'books': {
           'id': '1D4K-8Tf-kJKMqqe1zGv6AXs5fQWTbTbxan_gDFmkErE',
           'range': 'Books!A:F'
       },
       'workouts': {
           'id': '1WKkLtwJujS-AL4WB_sLlxyFtbBgxl6zTcrAoUwnr9O0',
           'range': 'Sheet1!A:E'
       },
       'links': {
           'id': '1xyxBcVq5TehTu3mW1lL8N0lhTEr0eUUvnH9b16raj8w',
           'range': 'Links!A:D'
       },
       'words': {
           'id': '1pam_ovDuYjkp5Zm52Y_TgCCTFSbEFjVHWzc_uwNjSQA',
           'range': 'Words!A:C'
       }
   }

   def fetch_sheet(service, sheet_id, range_name):
       result = service.spreadsheets().values().get(
           spreadsheetId=sheet_id,
           range=range_name
       ).execute()
       values = result.get('values', [])
       if not values:
           return []
       headers = values[0]
       return [dict(zip(headers, row)) for row in values[1:]]

   def main():
       creds_json = os.environ.get('KANONICAL_SHEET_CRED')
       creds = service_account.Credentials.from_service_account_info(
           json.loads(creds_json),
           scopes=['https://www.googleapis.com/auth/spreadsheets.readonly']
       )
       service = build('sheets', 'v4', credentials=creds)

       os.makedirs('data', exist_ok=True)

       for name, config in SHEETS.items():
           data = fetch_sheet(service, config['id'], config['range'])
           with open(f'data/{name}.json', 'w') as f:
               json.dump(data, f, indent=2)
           print(f"Wrote {len(data)} rows to data/{name}.json")

   if __name__ == '__main__':
       main()
   ```

2. **Use data in templates**
   ```html
   <!-- layouts/index.html -->
   {{ range first 5 (where site.Data.books "current" "y") }}
     <li>{{ .title }} by {{ .author }}</li>
   {{ end }}

   {{ range first 5 site.Data.workouts }}
     <li>{{ .type }}: {{ .distance }}</li>
   {{ end }}
   ```

3. **Local development workflow**
   ```bash
   # Fetch once, then iterate on templates
   python scripts/fetch-sheets.py
   hugo server
   ```

4. **Cache data in git** (optional)
   - Commit `/data/*.json` for faster local dev
   - Or .gitignore and always fetch

### D.5 Phase 4: Templates & Pages

**Goal:** All pages rendering with correct structure.

**Page Implementation Order:**

| Priority | Page | Template | Data Source |
|----------|------|----------|-------------|
| 1 | Blog post | `layouts/blog/single.html` | Markdown |
| 2 | Blog listing | `layouts/blog/list.html` | Markdown |
| 3 | Homepage | `layouts/index.html` | Mixed |
| 4 | Books | `layouts/books/list.html` | data/books.json |
| 5 | Tumble | `layouts/tumble/list.html` | data/links.json + data/words.json |
| 6 | Goals | `layouts/goals/list.html` | Filtered markdown |
| 7 | Essays | `layouts/essays/list.html` | Filtered markdown |
| 8 | About | `layouts/_default/single.html` | Markdown |
| 9 | Specialty | As needed | TBD |

**Filtering by type (for /goals, /essays):**
```html
{{ range where site.RegularPages "Params.type" "goals" }}
  <!-- render goal post -->
{{ end }}
```

### D.6 Phase 5: Client-Side Interactivity

**Goal:** Page transitions, reading progress, dark mode working.

**Single file approach** (`static/js/main.js`, ~200 lines):

```javascript
// =====================
// Dark Mode
// =====================
(function() {
  const STORAGE_KEY = 'theme';
  const DARK = 'dark';
  const LIGHT = 'light';

  function getPreferred() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
  }

  function setTheme(theme) {
    document.documentElement.classList.toggle(DARK, theme === DARK);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  // Set immediately to prevent flash
  setTheme(getPreferred());

  // Toggle handler
  window.toggleTheme = function() {
    setTheme(document.documentElement.classList.contains(DARK) ? LIGHT : DARK);
  };
})();

// =====================
// Reading Progress
// =====================
(function() {
  const progress = document.getElementById('reading-progress');
  if (!progress) return;

  function updateProgress() {
    const scrolled = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const percent = height > 0 ? (scrolled / height) * 100 : 0;
    progress.style.width = percent + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
})();

// =====================
// Page Transitions
// =====================
(function() {
  const main = document.querySelector('main');
  if (!main) return;

  // Fade in on load
  main.style.opacity = '0';
  main.style.transition = 'opacity 0.2s ease';
  requestAnimationFrame(() => {
    main.style.opacity = '1';
  });

  // Fade out on navigate
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (!link || link.host !== window.location.host) return;

    e.preventDefault();
    main.style.opacity = '0';
    setTimeout(() => {
      window.location = link.href;
    }, 200);
  });
})();

// =====================
// Infinite Scroll (Blog)
// =====================
(function() {
  const container = document.getElementById('post-list');
  const sentinel = document.getElementById('scroll-sentinel');
  if (!container || !sentinel) return;

  let page = 1;
  const postsPerPage = 10;
  const allPosts = JSON.parse(document.getElementById('all-posts-data')?.textContent || '[]');

  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;

    const start = page * postsPerPage;
    const next = allPosts.slice(start, start + postsPerPage);

    if (next.length === 0) {
      observer.disconnect();
      return;
    }

    next.forEach(post => {
      container.insertAdjacentHTML('beforeend', renderPost(post));
    });

    page++;
  }, { rootMargin: '200px' });

  observer.observe(sentinel);

  function renderPost(post) {
    return `<article class="post-card">...</article>`;
  }
})();
```

**CSS for dark mode** (`static/css/style.css`):
```css
:root {
  --bg: #fffdfa;
  --text: #313349;
  --primary: #39D085;
  --secondary: #DB6443;
}

:root.dark {
  --bg: #1a1a2e;
  --text: #e0e0e0;
  --primary: #DB6443;
  --secondary: #39D085;
}

body {
  background: var(--bg);
  color: var(--text);
  transition: background 0.2s, color 0.2s;
}
```

### D.7 Phase 6: Tumble Page

**Goal:** Masonry layout with filtering, all data rendering.

**Approach:**
- Use CSS Grid or vanilla JS masonry (no library needed)
- Filter via JS (show/hide based on type)
- Data from `site.Data.links` + `site.Data.words`

```html
<!-- layouts/tumble/list.html -->
{{ define "main" }}
<div class="tumble-filters">
  <button onclick="filterTumble('all')">All</button>
  <button onclick="filterTumble('link')">Links</button>
  <button onclick="filterTumble('quote')">Quotes</button>
  <button onclick="filterTumble('word')">Words</button>
</div>

<div id="tumble-grid" class="masonry">
  {{ range site.Data.links }}
    <div class="tumble-card" data-type="{{ .type }}">
      {{ .content }}
      <time>{{ .date }}</time>
    </div>
  {{ end }}
  {{ range site.Data.words }}
    <div class="tumble-card" data-type="word">
      <strong>{{ .word }}</strong>
      <p>{{ .definition }}</p>
    </div>
  {{ end }}
</div>

<script>
function filterTumble(type) {
  document.querySelectorAll('.tumble-card').forEach(card => {
    card.hidden = type !== 'all' && card.dataset.type !== type;
  });
}
</script>
{{ end }}
```

### D.8 Phase 7: Polish & Validation

**Checklist:**

- [ ] All URLs match sitemap (run comparison script)
- [ ] Dark mode: no flash, persists across pages
- [ ] Page transitions: smooth fade in/out
- [ ] Reading progress: accurate on all post lengths
- [ ] Infinite scroll: loads correctly, no duplicates
- [ ] Tumble: filters work, masonry layout correct
- [ ] Mobile: responsive at all breakpoints
- [ ] RSS feed: validates, matches current structure
- [ ] Images: all render, correct paths
- [ ] Code blocks: syntax highlighting works
- [ ] YouTube embeds: responsive
- [ ] Performance: Lighthouse score acceptable

### D.9 Phase 8: Deployment

**Netlify Configuration** (`netlify.toml`):
```toml
[build]
  command = "python scripts/fetch-sheets.py && hugo --minify"
  publish = "public"

[build.environment]
  HUGO_VERSION = "0.140.0"
  PYTHON_VERSION = "3.9"

[context.production.environment]
  HUGO_ENV = "production"

[context.deploy-preview]
  command = "python scripts/fetch-sheets.py && hugo --buildDrafts --buildFuture"

[[redirects]]
  from = "/feed/"
  to = "/index.xml"
  status = 301
```

**Environment Variables in Netlify:**
- `KANONICAL_SHEET_CRED` - Google service account JSON

**Build Trigger Options:**
1. Git push (automatic)
2. Build hook URL (for sheet updates)
3. Scheduled builds via Netlify/GitHub Actions

### D.10 Phase 9: Cutover

1. **Final validation** on Netlify preview URL
2. **Update DNS** to point to new Netlify site
3. **Monitor** for 404s and broken links
4. **Celebrate** 🎉
5. **Archive** Gatsby repo (don't delete yet)

---

## Appendix E: Hugo Quick Reference

### Useful Commands

```bash
# Development
hugo server -D              # Serve with drafts
hugo server --bind 0.0.0.0  # Accessible on network

# Build
hugo                        # Build to /public
hugo --minify               # Minified production build
hugo --gc --minify          # Clean + minify

# Content
hugo new blog/my-post.md    # New post from archetype
hugo list all               # List all content
hugo list drafts            # List drafts only

# Debug
hugo config                 # Show resolved config
hugo env                    # Show Hugo environment
```

### Template Cheatsheet

```html
<!-- Variables -->
{{ .Title }}
{{ .Content }}
{{ .Date.Format "Jan 2, 2006" }}
{{ .Params.description }}
{{ .WordCount }}
{{ .ReadingTime }}

<!-- Iteration -->
{{ range .Pages }}...{{ end }}
{{ range first 5 .Pages }}...{{ end }}
{{ range where .Pages "Params.type" "goals" }}...{{ end }}

<!-- Conditionals -->
{{ if .Params.tags }}...{{ end }}
{{ with .Params.description }}...{{ end }}

<!-- Data Files -->
{{ site.Data.books }}
{{ range site.Data.workouts }}...{{ end }}

<!-- Partials -->
{{ partial "header.html" . }}
{{ partial "post-card.html" . }}

<!-- Assets (Hugo Pipes) -->
{{ $css := resources.Get "css/style.scss" | toCSS | minify }}
<link rel="stylesheet" href="{{ $css.Permalink }}">
```

### Frontmatter Reference

```yaml
---
title: "Post Title"                    # Required
date: 2026-01-15T10:00:00-05:00       # Required
url: /custom-slug/                     # Optional: custom URL
description: "Brief excerpt"           # Optional: for SEO/cards
type: goals                            # Optional: for filtering
tags: ["programming", "life"]          # Optional: taxonomy
draft: true                            # Optional: hide in production
---
```

---

## Appendix F: Component Migration Guide

### F.1 The Mental Model Shift

**Gatsby/React:** Components are JavaScript functions that return JSX. They accept props, manage state, and compose into trees. Styling lives in JS (styled-components).

**Hugo:** Partials are HTML templates with Go template syntax. They accept context (data), have no state, and compose via includes. Styling lives in CSS (Tailwind or vanilla).

The visual output can be **identical**. The authoring model is different.

### F.2 Component Mapping

| Gatsby Component | Hugo Equivalent | Location |
|------------------|-----------------|----------|
| `card.js` | `card.html` | `layouts/partials/card.html` |
| `post-list.js` | `post-list.html` | `layouts/partials/post-list.html` |
| `header.js` | `header.html` | `layouts/partials/header.html` |
| `footer.js` | `footer.html` | `layouts/partials/footer.html` |
| `layout.js` | `baseof.html` | `layouts/_default/baseof.html` |
| `bio.js` | `bio.html` | `layouts/partials/bio.html` |
| `seo.js` | `head.html` | `layouts/partials/head.html` |
| `share.js` | `share.html` | `layouts/partials/share.html` |
| `darktoggle.js` | `main.js` | `static/js/main.js` (vanilla JS) |
| `menu-items.js` | `nav.html` | `layouts/partials/nav.html` |

### F.3 Standalone Pages

**Gatsby approach:** Each page is a React component in `src/pages/`:
```
src/pages/
├── index.js      # Homepage
├── blog.js       # Blog listing
├── books.js      # Books page
├── tumble.js     # Tumblelog
└── goals.js      # Goals page
```

**Hugo approach:** Pages are either content files or layout templates:

```
content/
├── _index.md           # Homepage (uses layouts/index.html)
├── blog/_index.md      # Blog section (uses layouts/blog/list.html)
├── books/_index.md     # Books page (uses layouts/books/list.html)
├── tumble/_index.md    # Tumble page (uses layouts/tumble/list.html)
└── goals/_index.md     # Goals page (uses layouts/goals/list.html)

layouts/
├── index.html          # Homepage template
├── blog/
│   ├── list.html       # Blog listing
│   └── single.html     # Individual post
├── books/
│   └── list.html       # Books page
├── tumble/
│   └── list.html       # Tumble page
└── goals/
    └── list.html       # Goals listing
```

**Key insight:** In Hugo, `_index.md` files create "section" pages. The template in `layouts/{section}/list.html` renders them. Content and presentation are separated.

### F.4 Props → Context

**Gatsby (props):**
```jsx
const Card = ({ title, url, date, excerpt }) => (
  <article className="card">
    <a href={url}>{title}</a>
    <time>{date}</time>
    <p>{excerpt}</p>
  </article>
)

// Usage
<Card title={post.title} url={post.url} date={post.date} excerpt={post.excerpt} />
```

**Hugo (context via dict):**
```html
<!-- layouts/partials/card.html -->
<article class="card">
  <a href="{{ .url }}">{{ .title }}</a>
  <time>{{ .date | time.Format "Jan 2, 2006" }}</time>
  <p>{{ .excerpt }}</p>
</article>
```

```html
<!-- Usage in a template -->
{{ range .Pages }}
  {{ partial "card.html" (dict
    "url" .RelPermalink
    "title" .Title
    "date" .Date
    "excerpt" .Summary
  ) }}
{{ end }}
```

**Simpler alternative** - pass the whole page object:
```html
{{ range .Pages }}
  {{ partial "card.html" . }}
{{ end }}

<!-- In card.html, access via .Title, .RelPermalink, etc. -->
```

### F.5 Styled-Components → Tailwind

**Current Gatsby pattern (`src/components/card.js`):**
```jsx
import styled from 'styled-components'

export const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(255,255,255,.6) 0%, rgba(var(--secondaryRGB), 0.4) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(var(--primaryRGB), 0.5);

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }

  @media screen and (max-width: 500px) {
    display: block;
  }
`

export const CardLink = styled.a`
  text-decoration: none;
  color: var(--dark);
  font-weight: 600;

  &:hover {
    color: var(--primary);
  }
`

export const CardDate = styled.time`
  font-style: italic;
  font-size: var(--h6);
  color: var(--secondary);
`
```

**Hugo + Tailwind equivalent (`layouts/partials/card.html`):**
```html
<article class="relative flex flex-col p-2 rounded-lg
                bg-gradient-to-br from-white/60 to-secondary/40
                backdrop-blur-xl border border-primary/50
                hover:bg-white/50 transition-colors
                max-sm:block">
  <a href="{{ .url }}"
     class="no-underline text-dark font-semibold hover:text-primary transition-colors">
    {{ .title }}
  </a>
  <time class="italic text-sm text-secondary">
    {{ .date | time.Format "Jan 2, 2006" }}
  </time>
</article>
```

**Tailwind equivalents for common patterns:**

| Styled-Component | Tailwind |
|------------------|----------|
| `display: flex` | `flex` |
| `flex-direction: column` | `flex-col` |
| `padding: 0.5rem` | `p-2` |
| `border-radius: 8px` | `rounded-lg` |
| `font-weight: 600` | `font-semibold` |
| `font-style: italic` | `italic` |
| `backdrop-filter: blur(20px)` | `backdrop-blur-xl` |
| `@media (max-width: 500px)` | `max-sm:` prefix |
| `&:hover { ... }` | `hover:` prefix |
| `transition: var(--transMed)` | `transition-colors` or `transition-all` |
| `var(--primary)` | `text-primary` (with config) |

### F.6 Tailwind Setup for Hugo

**1. Initialize npm and install Tailwind:**
```bash
cd kanonical-hugo
npm init -y
npm install -D tailwindcss
npx tailwindcss init
```

**2. Configure Tailwind (`tailwind.config.js`):**
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layouts/**/*.html",
    "./content/**/*.md",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: '#313349',
        light: '#fffdfa',
        primary: '#39D085',
        secondary: '#DB6443',
        'yellow-highlight': '#F4D7A4',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        serif: ['Libre Baskerville', 'Georgia', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '72ch',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

**3. Create main CSS file (`assets/css/main.css`):**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom utilities if needed */
@layer components {
  .text-shadow-primary {
    text-shadow: 2px 2px 0 rgba(57, 208, 133, 0.5);
  }

  .text-shadow-secondary {
    text-shadow: 2px 2px 0 rgba(219, 100, 67, 0.5);
  }
}

/* Dark mode color overrides */
:root.dark {
  --tw-bg-opacity: 1;
}
```

**4. Include in base template (`layouts/_default/baseof.html`):**
```html
<!DOCTYPE html>
<html lang="en" class="{{ if .Site.Params.defaultDark }}dark{{ end }}">
<head>
  {{ partial "head.html" . }}

  {{/* Tailwind CSS via Hugo Pipes */}}
  {{ with resources.Get "css/main.css" }}
    {{ $css := . | css.TailwindCSS }}
    {{ if hugo.IsProduction }}
      {{ $css = $css | minify | fingerprint }}
    {{ end }}
    <link rel="stylesheet" href="{{ $css.RelPermalink }}" {{ if hugo.IsProduction }}integrity="{{ $css.Data.Integrity }}"{{ end }}>
  {{ end }}
</head>
<body class="bg-light dark:bg-dark text-dark dark:text-light transition-colors">
  {{ partial "header.html" . }}
  <main>
    {{ block "main" . }}{{ end }}
  </main>
  {{ partial "footer.html" . }}
  <script src="/js/main.js"></script>
</body>
</html>
```

### F.7 Complex Component Example: Post List

**Current Gatsby (`src/components/post-list.js`):**
```jsx
const PostList = styled.ul`
  padding: 0;
  margin: calc(var(--spacing) * 2) 0;
  list-style: none;
  display: grid;
  grid-gap: var(--spacing);
  grid-template-columns: repeat(auto-fit, minmax(30ch, 1fr));

  @media screen and (max-width: 500px) {
    display: block;
  }
`

export default ({ posts }) => (
  <PostList>
    {posts.map(post => (
      <li key={post.id}>
        <Card>
          <Link to={post.path}>{post.title}</Link>
          <time>{post.date}</time>
          <p>{post.excerpt}</p>
        </Card>
      </li>
    ))}
  </PostList>
)
```

**Hugo + Tailwind (`layouts/partials/post-list.html`):**
```html
<ul class="p-0 my-8 list-none
           grid gap-4 grid-cols-[repeat(auto-fit,minmax(30ch,1fr))]
           max-sm:block">
  {{ range . }}
    <li>
      {{ partial "card.html" (dict
        "url" .RelPermalink
        "title" .Title
        "date" .Date
        "excerpt" .Summary
        "wordcount" .WordCount
      ) }}
    </li>
  {{ end }}
</ul>
```

**Usage:**
```html
<!-- In layouts/blog/list.html -->
{{ define "main" }}
  <h1>Blog</h1>
  {{ partial "post-list.html" .Pages }}
{{ end }}
```

### F.8 Interactive Components

Some Gatsby components have client-side interactivity. These need vanilla JS in Hugo.

**Components requiring JS:**

| Component | Interactivity | Hugo Solution |
|-----------|---------------|---------------|
| `darktoggle.js` | Theme switching | Vanilla JS (see Appendix D.6) |
| `blog.js` | Infinite scroll | Intersection Observer (see Appendix D.6) |
| `blog.js` | Type filtering | JS click handlers |
| `tumble.js` | Masonry + filtering | CSS Grid + JS filtering |
| `header.js` | Mobile menu toggle | Vanilla JS |
| `header.js` | Scroll shadow | Scroll event listener |

**Example: Mobile Menu Toggle**

```html
<!-- layouts/partials/header.html -->
<header class="fixed top-0 w-full z-50 bg-light dark:bg-dark transition-shadow"
        id="site-header">
  <nav class="flex items-center justify-between p-4 max-w-4xl mx-auto">
    <a href="/" class="font-bold text-xl">Kanonical</a>

    <!-- Desktop nav -->
    <ul class="hidden md:flex gap-6">
      {{ range .Site.Menus.main }}
        <li><a href="{{ .URL }}">{{ .Name }}</a></li>
      {{ end }}
    </ul>

    <!-- Mobile burger -->
    <button id="menu-toggle" class="md:hidden p-2" aria-label="Toggle menu">
      <span class="burger-line"></span>
      <span class="burger-line"></span>
      <span class="burger-line"></span>
    </button>
  </nav>

  <!-- Mobile menu -->
  <div id="mobile-menu" class="hidden md:hidden">
    <ul class="flex flex-col p-4 gap-4">
      {{ range .Site.Menus.main }}
        <li><a href="{{ .URL }}">{{ .Name }}</a></li>
      {{ end }}
    </ul>
  </div>
</header>
```

```javascript
// In static/js/main.js
(function() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const header = document.getElementById('site-header');

  // Mobile menu toggle
  toggle?.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    toggle.classList.toggle('active');
  });

  // Header shadow on scroll
  window.addEventListener('scroll', () => {
    header.classList.toggle('shadow-lg', window.scrollY > 10);
  }, { passive: true });
})();
```

### F.9 What You Lose vs. Gain

**What you lose:**
- JSX syntax (Hugo uses `{{ }}` Go templates)
- Component-level state (`useState`, `useEffect`)
- React DevTools
- Hot module replacement for JS (Hugo has hot reload for templates/content)
- Import/export component system

**What you gain:**
- Zero JavaScript shipped for static UI
- Faster iteration with Tailwind utilities
- No hydration mismatches
- No bundle size concerns
- Simpler mental model (templates are just HTML)
- CSS that works without JS runtime
- Build times measured in milliseconds

### F.10 Migration Strategy for Components

**Phase 1: Structure**
1. Create `layouts/partials/` directory
2. Create empty `.html` files for each component
3. Set up Tailwind

**Phase 2: Static Components (no JS)**
1. `header.html` - navigation, logo
2. `footer.html` - copyright, links
3. `card.html` - post cards
4. `post-list.html` - grid of cards
5. `bio.html` - author bio
6. `head.html` - meta tags, SEO

**Phase 3: Interactive Components**
1. Dark mode toggle → vanilla JS
2. Mobile menu → vanilla JS
3. Reading progress → vanilla JS
4. Infinite scroll → vanilla JS
5. Tumble filtering → vanilla JS

**Phase 4: Page Templates**
1. `index.html` - homepage (compose partials)
2. `blog/list.html` - blog listing
3. `blog/single.html` - blog post
4. `books/list.html` - books page
5. `tumble/list.html` - tumblelog

**Validation:** Each component should produce visually identical output to Gatsby version before moving on.

---

*This specification was created through deep codebase analysis and comprehensive interview with the site owner.*
