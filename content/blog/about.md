---
title: About This Site
date: 2010-11-07T12:00:00.000Z
url: "/about-page/"
type: about
---

## Reach Out!

I'd love to talk!  [Hit me up](mailto:hey@kanonical.io).



#### Colophon

I've gone through all sorts of different frameworks and tools for building websites including Wordpress, Ghost, wikis, and any number of static site generators.  A lot of people prefer a tool they can just setup and start writing.  Because that's the focus: writing.  I'm just not wired like that.  I'll use all sorts of templated or no-code tools to move projects along faster.  But this right here is my home on the internet, and it will always need to be handcrafted dammit!  Don't know why, but that's how it is.  

"Handcrafted" is, of course, completely arbitrary.  Everything is a huge vertical of abstractions and code.  What I really mean is that I wanted a stack that let me do what I want, bring in the data I want, mess around with actual code, and factor HTML/CSS without WYSIWIG or anything else getting in the way.

Here's where I've ended up:

- [Gatsby](https://www.gatsbyjs.com/).  Gatsby's original claim was to be able to pull data from many backends and unify it in a single data layer accessible via GraphQL.  This is 80% great and there are a ton of source plugins out there to pull from every conceivable place.  In practice, I only really use a couple of them, listed below.  I've tried a few other source plugins that haven't worked at all, so it's a bit of a mixed bag in the long tail (there's a lot of plugins).  The rest of Gatsby is great.  I can run `gatsby develop` and get live-reloading and local updates.  It's got all the fanciness of Webpack and fast builds and super quick page reloads.  
- The [Tumble](/tumble) is it's own beast.  I have a system for updating it via emails to myself and I've [written about that separately](/tumbld).
- [React](https://reactjs.org/) is what Gatsby uses for any and all component development.  I prefer the Vue syntax (React hooks/state syntax still feels weird), but the React component system is huge.  
- [Styled Components](https://styled-components.com/) makes React and CSS so much better.  I'm skeptical of anyone that doesn't have a love/hate relationship with CSS.   Styled Components makes encapsulation of style much cleaner.
- Big shoutout to the free and MIT-licensed themes over at [GatsbyTemplates](https://gatsbytemplates.io/free/) - tons of good ideas.
- Gatsby lets you [import and format Markdown](https://www.gatsbyjs.com/docs/adding-a-list-of-markdown-blog-posts/) files for pages.  
- I pull data regularly from several Google Sheets using another [source plugin](https://www.gatsbyjs.com/plugins/gatsby-source-google-sheets/)  None of the data for this place needs to be updated more than hourly, so this works great.  So I start with a spreadsheet that looks like this:
  ![Books sheet](/img/about-books.png)
  and end up with a GraphQL query that looks like this
  ![Books GraphQL](/img/about-gql-books.png)
  and of course you can mix stuff from different sources
  ![All the GraphQL](/img/about-gql-index.png)
- Hosting by [Netlify](https://www.netlify.com/).  Free for small stuff and very developer friendly.  They let you fix software versions, import environment variables (secrets, etc.) and deploy via `git push`
