import * as React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Share from "../components/ShareContainer"


const BlogPostStyles = styled.div`
  .meta {
    h2 {
      font-size: var(--h4);
      color: var(--primaryColor);
      margin: calc(var(--spacing) / 2) 0;
    }
  }

  .post-img {
    margin: calc(var(--spacing) * 2) 0;

    @media (min-width: 1200px) {
      margin: calc(var(--spacing) * 4) 0;
    }
  }

  img {
    max-width: 860px;
  }

  font-weight: 400;
  font-size: var(--h4);
  color: var(--primaryColor);

  a {
    text-decoration: none;
    margin-right: calc(var(--spacing) / 2);
    position: relative;

    &:after {
      content: "";
      display: block;
      position: absolute;
      height: 0.1rem;
      width: 100%;
      background-color: var(--charcoal);
      left: 0;
      bottom: -0.25rem;
      opacity: 1;
      transition: opacity var(--transSlow);
    }

    &:hover,
    &:focus {
      cursor: pointer;

      &:after {
        opacity: 0.15;
      }
    }

    &::last-child {
      margin-right: 0;
    }
  }
`

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Layout className="reading" location={location} title={siteTitle}>


        <BlogPostStyles id="reading">
          <article
            className="blog-post"

            itemScope
            itemType="http://schema.org/Article"
          >
            <header>
              <h1 itemProp="headline">{post.frontmatter.title}</h1>
              <p>{post.frontmatter.date}</p>
            </header>
            <section
              dangerouslySetInnerHTML={{ __html: post.html }}
              itemProp="articleBody"
            />
            <hr />
            <footer>
              {/* If there are tags for the post, render this section */}
              {post.frontmatter.tags && (
                <>
                  <hr />
                  <h4>
                    Posted under /{" "}
                    {post.frontmatter.tags.map((tagName, index) => {
                      return (
                        <Link to={`/tags/${tagName}`} key={index}>
                          {tagName}
                        </Link>
                      )
                    })}
                  </h4>
                </>
              )}
              <Share twitter  href={location.href} />
            </footer>
          </article>


          <nav className="blog-post-nav">
            <ul
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0,
              }}
            >
              <li>
                {previous && (
                  <Link to={previous.fields.slug} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </BlogPostStyles>
      </Layout>
    </>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
