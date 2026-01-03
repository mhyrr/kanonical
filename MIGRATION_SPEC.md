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

*This specification was created through deep codebase analysis and comprehensive interview with the site owner.*
