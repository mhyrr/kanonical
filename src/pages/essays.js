import React, { useState, useEffect, useRef } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"

const DateField = styled.div`
  position: relative;
  small{
    font-style: italic;
    font-size: var(--h6);
    color: var(--secondary);
    margin: calc(var(--spacing) / 2) 0;
    padding-right: 1em;
  }
  margin-left: auto;
`

const TitleField = styled.h4`
  color: var(--dark);
  font-size: var(--size-600);
  font-weight: 500;
  text-shadow: .2px .2px 1px rgba(var(--primaryRGB), 0.5);
  margin: 0;

  & a {
    text-decoration: none !important;
    color: var(--dark) !important;
    font-weight: 600;
  }

`

const MetaField = styled.div`
  font-style: italic;
  font-size: var(--h6);
  color: var(--primary);
  margin: calc(var(--spacing) / 4) 0;
  font-size: .7rem;
`

const MetaHeader = styled.div`
  display: inline-flex;
  flex-end: right-justify;
`;

const SimpleItem = styled.li`
  list-style: none;
  position: relative;
  display: flex;
  padding: 1em;
`

const EssayList = styled.ul`

  list-style: none;
  display: grid;
  padding: 0;
  justify-items: center;
  grid-gap: var(--size-600);
  grid-template-columns: repeat(auto-fit, minmax(40ch, 1fr));
  margin: calc(var(--spacing) * 1) 0;
  @media screen and (max-width: 500px) {
    & {
      display: block;
    }
  }

  & a {
    color: var(--secondary);
    text-shadow: .1px .1px 1px rgba(var(--darkRGB), 0.5);
    font-weight: 600;
  }

`;

const Essay = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  margin: 0;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }

  @media screen and (max-width: 500px) {
    & {
      margin-top: var(--size-600);
    }
  }
`;

const ExcerptBox = styled.div`
  padding: 1rem;
  border: 1px solid rgba(var(--secondaryRGB), 0.5);
  background: linear-gradient(135deg, rgba(255,255,255,.6) 0%, rgba(var(--primaryRGB), 0.4) 200%);
  backdrop-filter: blur(20px);
  border-radius: 8px;
`;

const Excerpt = styled.p`
  // margin-top: auto;
  font-size: var(--size-350);
  -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 60%, transparent 100%);

  & ul {
    margin: .5rem 0;

  }
  & li {
    margin: 0;
    padding: 0;
    list-style-type: disc;
    display: list-item;
  }

`;

const Essays = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const list = data.allMarkdownRemark.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Essays" />
      <h4>The Essays.  </h4>
      <h5>
        <strong>Hey, you asked for it.</strong> Every once in awhile I start writing about an idea and it ends up taking on a life of it's own.
        The words divide and grow, and the digressions expand, and I just try to keep up.
        Eventually I end up with something bigger and longer than I imagined.
        It feels reasonable to call it an essay.
      </h5>

      <EssayList>
        {list.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <Essay key={post.fields.slug}>
              <MetaHeader>
                <TitleField>
                  <Link to={post.frontmatter.path} itemProp="url">
                    <span itemProp="headline">{title}</span>
                  </Link>
                </TitleField>
                <DateField>
                  <small>{post.frontmatter.date}</small>
                  <MetaField>{post.wordCount.words.toLocaleString("en-US")} words</MetaField>
                </DateField>
              </MetaHeader>
              <ExcerptBox>
                <Excerpt
                  dangerouslySetInnerHTML={{
                    __html: post.frontmatter.description || post.excerpt,
                  }}
                />
                <Link to={post.frontmatter.path} itemProp="url">
                  <span>Read more..</span>
                </Link>
              </ExcerptBox>
            </Essay>
          )
        })}
      </EssayList>
    </Layout>
  )
}

export default Essays

//({post.wordCount.words.toLocaleString("en-US")}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: {fields: frontmatter___date, order: DESC}
      filter: {frontmatter: {type: {eq: "essay"}}}
    ) {
      nodes {
        excerpt(pruneLength: 800)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MM/DD/YYYY")
          title
          description
          path
        }
        wordCount {
          words
        }
      }
    }
  }
`
