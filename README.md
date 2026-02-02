# Kanonical

Personal site of Greg Olsen. A life management interface built with Hugo.

## Quick Start

```bash
# Install Hugo (macOS)
brew install hugo

# Fetch Google Sheets data
export KANONICAL_SHEET_CRED='<your-service-account-json>'
./bin/fetch-sheets

# Run locally
hugo server -D
```

Site runs at http://localhost:1313

## Structure

```
kanonical/
├── content/           # Markdown content
│   ├── blog/          # Blog posts
│   ├── about/         # About page
│   └── _index.md      # Homepage content
├── layouts/           # Hugo templates
├── assets/css/        # Tailwind CSS
├── static/            # Static files (images, js)
├── data/              # JSON from Google Sheets (generated)
├── bin/               # fetch-sheets binary
└── hugo.toml          # Hugo configuration
```

## Data Sources

The site pulls data from Google Sheets at build time:

| Sheet | Content |
|-------|---------|
| Books | Reading tracker |
| Workouts | Strava data |
| Links | Quotes and bookmarks |
| Words | Vocabulary |

Run `./bin/fetch-sheets` to update `data/*.json` files.

## Deployment

Deploys automatically to Netlify on push to `master`.

Build command: `./bin/fetch-sheets-linux && hugo --minify`

Environment variable required: `KANONICAL_SHEET_CRED`

## Writing New Posts

```bash
# Create a new post
hugo new blog/YYYY-MM-DD-slug.md
```

Frontmatter:
```yaml
---
title: "Post Title"
date: 2026-01-15
url: /custom-slug/      # optional
description: "Brief excerpt"
tags: ["topic"]         # optional
---
```

## License

Content is copyright Greg Olsen. Code is 0BSD.
