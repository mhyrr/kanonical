import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"

const RVSection = styled.section`

  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }


  .gatsby-resp-image-wrapper {
    margin: 0.5rem;
  }


    header {
      p {
        font-style: italic;
      }
    }


    font-weight: 400;
    font-size: var(--h4);
    color: var(--dark);


    @media (min-width: 1800px) {
      --h1: 2.8rem;
      --h2: 2rem;
      --h3: 1.8rem;
      --h4: 1.6rem;
      --h5: 1.4rem;
      --para: 1.1rem;
    }

    h1 {
      color: var(--dark);
      text-shadow: 2px 2px 0 rgba(var(--primaryRGB), var(--alpha));
    }

    h2, h3 {
      font-size: var(--h4);
      color: var(--dark);
      text-shadow: 2px 2px 0 rgba(var(--primaryRGB), var(--alpha));
      margin: calc(var(--spacing) * 1.5 ) 0;
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
    markdownRemark(frontmatter: {path: {eq: "/rving/"}}) {
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
