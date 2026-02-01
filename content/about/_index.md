---
title: About This Site
url: /about/
---

## Reach Out!

I'd love to talk!  [Hit me up](mailto:hey@kanonical.io).

#### Colophon

I've gone through all sorts of different frameworks and tools for building websites including Wordpress, Ghost, wikis, and any number of static site generators. Most recently I was on Gatsby for about 5 years. A lot of people prefer a tool they can just setup and start writing. Because that's the focus: writing. I'm just not wired like that. I'll use all sorts of templated or no-code tools to move projects along faster. But this right here is my home on the internet, and it will always need to be handcrafted dammit! Don't know why, but that's how it is.

"Handcrafted" is, of course, completely arbitrary. Everything is a huge vertical of abstractions and code. What I really mean is that I wanted a stack that let me do what I want, bring in the data I want, mess around with actual code, and factor HTML/CSS without WYSIWYG or anything else getting in the way.

Here's where I've ended up:

- [Hugo](https://gohugo.io/). A single binary static site generator that's been around since 2013. No npm, no node_modules, no dependency anxiety. Just markdown in, HTML out. Builds the whole site in under 2 seconds.
- The [Tumble](/tumble) is its own beast. I have a system for updating it via emails to myself and I've [written about that separately](/tumbld).
- Plain CSS with utility classes. No build step, no PostCSS, no purging. Just a single stylesheet that does what I need.
- Data lives in Google Sheets—books I'm reading, workouts, quotes, vocabulary. A Python script fetches it all at build time and drops JSON files that Hugo templates can read. Low-tech, high-leverage.
- Hosting by [Netlify](https://www.netlify.com/). Free for small stuff and very developer friendly. They let you pin software versions, set environment variables, and deploy via `git push`.

The whole thing was migrated from Gatsby with the help of Claude in early 2026. The goal was **longevity**—a stack I trust to work for another 10+ years without npm breaking or dependencies going stale. So far, so good.
