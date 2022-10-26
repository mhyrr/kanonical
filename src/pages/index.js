import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PostList from "../components/post-list"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes


  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <h2>Some recent scribblings..</h2>

      <PostList posts={posts} />
      
      <header><h2><Link to="/blog">More..</Link></h2></header>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 6, sort: {fields: frontmatter___date, order: DESC}) {
      nodes {
        excerpt(pruneLength: 200)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          path
        }
      }
    }
  }
`
