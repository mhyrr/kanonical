import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"

const RVSection = styled.section`

  ul {
    padding: 0;
    margin: 0;
  }

  li {
    line-height: 1.5;
  }

  .gatsby-resp-image-wrapper {
    margin: 0.5rem;
  }

  & a {
    text-decoration: underline;
    color: var(--secondary);
    text-shadow: .2px .2px 0 var(--darkRGB 0.5);
    font-weight: 600;
  }

`;

const RV = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const post = data.markdownRemark

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={post.frontmatter.title} />

      <RVSection
        dangerouslySetInnerHTML={{ __html: post.html }}
        itemProp="articleBody"
      />

    </Layout>
  )
}

export default RV

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: {path: {eq: "/rving"}}) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        type
      }
    }
  }
`
