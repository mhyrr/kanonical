import React, { useState, useEffect, useRef } from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"

import PostList from "../components/post-list"

const DateField = styled.div`
  position: relative;
  small{
    font-style: italic;
    font-size: var(--h6);
    color: var(--secondary);
    margin: calc(var(--spacing) / 2) 0;
    padding-right: 1em;
  }
`

const TitleField = styled.h4`
  color: var(--dark);
  text-shadow: 0px 0px 1px rgba(var(--secondary), 0.3);
  margin: 0;
`

const AuthorField = styled.div`
  font-style: italic;
  font-size: var(--h6);
  color: var(--primary);
  margin: calc(var(--spacing) / 4) 0;
  font-size: .7rem;
`

const SimpleItem = styled.li`
  list-style: none;
  position: relative;
  display: flex;
  padding: 1em;
`

const Preface = styled.h5`
  margin: calc(var(--spacing) * 2) 0;
  font-size: var(--size-400);
  font-weight: 400;
  color: var(--dark);

  & a {
    text-decoration: underline;
    color: var(--secondary);
    text-shadow: .2px .2px 0 var(--darkRGB 0.5);
    font-weight: 600;
  }

  & ul {
      padding: 0;
      margin: calc(var(--spacing) / 2) 0;
      list-style: none;
      display: grid;
      justify-items: baseline;
      grid-gap: var(--size-300);
      grid-template-columns: repeat(auto-fit, minmax(20ch, 1fr));

      @media screen and (max-width: 500px) {
        & {
          display: block;
        }
      }
  }

  & li {
    padding: 0;
    margin: calc(var(--spacing) / 2) 0;
    list-style: none;
    display: grid;
    justify-items: baseline;
    grid-gap: var(--size-300);
    grid-template-columns: repeat(auto-fit, minmax(20ch, 1fr));

    @media screen and (max-width: 500px) {
      & {
        display: block;
      }
    }
  }
`;

const Tags = styled.div`
  margin: calc(var(--spacing) * 2) 0;
  font-size: var(--size-200);
  font-weight: 200;
  color: var(--dark);
  display: flex;
  justify-content: center;

  ul {
    height: 100%;
    width: 420px;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-transform: capitalize;
    list-style-type: none;

    li {
      border: 1px solid rgba(var(--primaryRGB), 0.5);
      background: linear-gradient(135deg, rgba(255,255,255,.6) 0%, rgba(var(--secondaryRGB), 0.4) 200%);
      backdrop-filter: blur(20px);
      border-radius: 8px;

      padding: .5rem;
      margin: .25rem;
      font-size: 1.15rem;
      font-family: "Roboto";
      font-weight: 300;

      & a {
        text-decoration: none;
        color: var(--secondary);
        font-weight: 200;
      }
    }

    @media (min-width: 768px) {
      ul {
        align-items: center;
        li {
          padding-left: 2rem;
          justify-content: flex-end;
        }
      }
    }

`;

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const types = data.allMarkdownRemark.distinct



  // State for the list
  const [list, setList] = useState([...posts.slice(0, 200)])

  // State to trigger load more
  const [loadMore, setLoadMore] = useState(false)

  // State of whether there is more to load
  const [hasMore, setHasMore] = useState(posts.length > 200)

  //Set a ref for the loading div
  const loadRef = useRef()

  const [typeFilter, setTypeFilter] = useState("none")

  // Handle intersection with load more div
  const handleObserver = (entities) => {
    const target = entities[0]
    if (target.isIntersecting) {
      setLoadMore(true)
    }
  }


  const setFilter = (type) => {
    console.log(type)
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
      <Seo title="Everything written, for quite awhile" />

      <h4>(Almost) Everything I've Written.</h4>

      <Preface>
        I've been writing since I cleared out of school and was able to see that it was really useful.
        The thoughts in my head were unruly and unordered and I was never
        able to make them clear.  I started writing them down just to figure out what I was trying to say.. only to find out
        that what I was trying to say wasn't very clear.
        <br/><br/>
        <strong>Writing is clarified thinking.</strong>  If you're not able to write down what you think, it's probably
        not as clear as you'd like to believe.
        Writing helps you <Link to="/whywrite">ask the right questions</Link>.
        And it helps capture your life and legacy.  I've <Link to="/legacy-writing">written about this</Link> before.  (I'm sure you're surprised.)

      </Preface>

      <Tags>
        <ul>
          <li><a href="#all" onClick={() => {setTypeFilter("none")}}>All of it</a></li>
          {types.map(type => {
            return (
              <li><a href="#{type}" onClick={() => {setTypeFilter(type)}}>{type}</a></li>
            )
          })}
        </ul>
      </Tags>


      {list.filter(post => {
          if (typeFilter == "none") {
            return true
          } else {
            return post.frontmatter.type == typeFilter
          }
        })
        .map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <SimpleItem key={post.fields.slug}>
                <DateField>
                  <small>{post.frontmatter.date}</small>
                  <AuthorField>({post.wordCount.words.toLocaleString("en-US")} words)</AuthorField>
                </DateField>
                <TitleField>
                  <Link to={post.frontmatter.path} itemProp="url">
                    <span itemProp="headline">{title}</span>
                  </Link>
                </TitleField>

            </SimpleItem>
          )
        })
      }

      <div ref={loadRef}>
        {hasMore ? <p> </p> : <p></p>}
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
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, filter: {frontmatter: {type: {ne: "about"}}}) {
      nodes {
        excerpt(pruneLength: 320)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MM/DD/YYYY")
          title
          description
          path
          type
        }
        wordCount {
          words
        }
      }
      distinct(field: frontmatter___type)
    }
  }
`
