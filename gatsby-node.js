const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)


  const pageTemplate = path.resolve("src/templates/page.js")

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
            frontmatter {
              path
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.frontmatter.path,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }


  // Auto generate pages
  // Pages built using templates/page-template.js
  const pageData = [
    {
      name: "privacy",
      title:
        "Privacy",
      content:
        "Thanks for visiting! This site is simply a small corner of the world to share things that I'm thinking about.  As part of that, the site policy is to respect your privacy regarding any information we may collect from you.  We don’t share any private infromation publicly or with third-parties, except when required to by law.  The personal data that may be collected, by itself or through third parties, includes: Cookies, usage data, and email addresses. The cookies we track are technical and anonymous statistical cookies through Google Analytics, so that you can have a better experience on our site.",
    },
    {
      name: "cookies",
      title:
        "Cookies",
      content:
        "The cookies we track are technical and anonymous statistical cookies through Google Analytics, so that you can have a better experience on our site.  You can choose to turn cookies off in the \"help\" section of your browser toolbar or to receive a notification when you are receiving a new cookie.",
    },
  ]
  pageData.forEach(page => {
    createPage({
      path: `/${page.name}`,
      component: pageTemplate,
      context: { page },
    })
  })
}


exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
