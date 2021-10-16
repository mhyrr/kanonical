import React, { useState, useEffect, useRef } from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes


  // State for the list
  const [list, setList] = useState([...posts.slice(0, 10)])

  // State to trigger load more
  const [loadMore, setLoadMore] = useState(false)

  // State of whether there is more to load
  const [hasMore, setHasMore] = useState(posts.length > 10)

  //Set a ref for the loading div
  const loadRef = useRef()

  // Handle intersection with load more div
  const handleObserver = (entities) => {
    const target = entities[0]
    if (target.isIntersecting) {
      setLoadMore(true)
    }
  }

  //Initialize the intersection observer API
  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    }
    const observer = new IntersectionObserver(handleObserver, options)
    if (loadRef.current) {
      observer.observe(loadRef.current)
    }
  }, [])

  // Handle loading more articles
  useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = list.length
      const isMore = currentLength < posts.length
      const nextResults = isMore
        ? posts.slice(currentLength, currentLength + 10)
        : []
      setList([...list, ...nextResults])
      setLoadMore(false)
    }
  }, [loadMore, hasMore]) //eslint-disable-line

  //Check if there is more
  useEffect(() => {
    const isMore = list.length < posts.length
    setHasMore(isMore)
  }, [list]) //eslint-disable-line


  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <h2>All of the blog things..</h2>
      <ol style={{ listStyle: `none` }}>
        {list.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
      <div ref={loadRef}>
        {hasMore ? <p>Loading...</p> : <p></p>}
      </div>
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
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
      nodes {
        excerpt(pruneLength: 320)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
