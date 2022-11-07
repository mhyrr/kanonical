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
  font-size: var(--size-400);
  font-weight: 400;
  text-shadow: .2px .2px 1px rgba(var(--primaryRGB), 0.5);
  margin: 0;
  margin-bottom: calc(var(--spacing) * .2);

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

const GoalGrid = styled.div`
  display: grid;
  padding: 0;
  justify-items: center;
  grid-gap: var(--size-600);
  grid-template-columns: repeat(auto-fit, minmax(23ch, 1fr));
  margin: calc(var(--spacing) * 1) 0;
  @media screen and (max-width: 500px) {
    & {
      display: block;
    }
  }
`;

const GridHeading = styled.h3`
  text-align: center;
`;

const GoalList = styled.ul`
  margin-top: auto;
  list-style: none;
  display: grid;
  padding: 0;
  justify-items: center;
  grid-gap: var(--size-400);
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
    font-weight: 400;
  }

`;

const Goal = styled.li`
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

const GoalBox = styled.div`
  padding: 1rem;
  border: 1px solid rgba(var(--secondaryRGB), 0.5);
  background: linear-gradient(135deg, rgba(255,255,255,.6) 0%, rgba(var(--primaryRGB), 0.4) 200%);
  backdrop-filter: blur(20px);
  border-radius: 8px;
`;

const ReviewBox = styled.div`
  padding: 1rem;
  border: 1px solid rgba(var(--primaryRGB), 0.5);
  background: linear-gradient(135deg, rgba(255,255,255,.6) 0%, rgba(var(--secondaryRGB), 0.4) 200%);
  backdrop-filter: blur(20px);
  border-radius: 8px;
`;

const Excerpt = styled.p`
  // margin-top: auto;
  font-size: var(--size-350);
  -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 80%, transparent 100%);

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

const Goals = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const list = data.allMarkdownRemark.nodes

  const goals = list.filter(node => {
    return (node.frontmatter.type === "goals")
  })
  const reviews = list.filter(node => {
    return (node.frontmatter.type === "review")
  })
  var endOfYear = "12/31/" + new Date().getFullYear();
  reviews.unshift({
    excerpt: "<br/><br/>Hey, this year ain't over yet!  Can't wait to see how it turns out!<br/>",
    fields: {slug: "/"},
    frontmatter: {
      date: endOfYear,
      title: "Work In Progress",
      path: "/",
      type: "review"
    }
  })

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Goals and Yearly Reviews" />
      <TitleField>
        <strong>Every year I set goals.</strong> <br/><br/>

        I used to think this was dumb.
        "Only the milquetoast underachievers set Resolutions," said I.
        Then I tried it. And learned I was foolish.  Writing down goals helped me stay focused on what mattered for the whole year.

        I don't hit them all.  If I did, they probably wouldn't be very good goals.  But it still helped a lot.
        <br/><br/>
        Yearly retrospectives helped just as much.  Not only was it a great way to understand just how the year
        went, it helped clarify what the right steps would be for the next year.

        <br/><br/>
        You should try it too.  But, <strong>it only works if you write them down.</strong>

      </TitleField>
      <GoalGrid>


      </GoalGrid>
      <GoalGrid>
        <GoalList>
          <GridHeading>Goals</GridHeading>
          {goals.map(post => {
            const title = post.frontmatter.title || post.fields.slug

            return (
              <Goal key={post.fields.slug}>
                <MetaHeader>
                  <TitleField>
                    <Link to={post.frontmatter.path} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </TitleField>
                </MetaHeader>
                <GoalBox>
                  <Excerpt
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                  />
                <Link to={post.frontmatter.path} itemProp="url">
                    <span>Read more..</span>
                  </Link>
                </GoalBox>
              </Goal>
            )
          })}
        </GoalList>
        <GoalList>
          <GridHeading>Reviews</GridHeading>
          {reviews.map(post => {
            const title = post.frontmatter.title || post.fields.slug
            let readMore
            if (post.frontmatter.date != endOfYear) {
              readMore =
                <Link to={post.frontmatter.path} itemProp="url">
                  <span>Read more..</span>
                </Link>
            }
            else {
              readMore = <span><br/></span>
            }
            return (
              <Goal key={post.fields.slug}>
                <MetaHeader>
                  <TitleField>
                    <Link to={post.frontmatter.path} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </TitleField>
                </MetaHeader>
                <ReviewBox>
                  <Excerpt
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                  />
                  {readMore}
                </ReviewBox>
              </Goal>
            )
          })}
          {/* This is such a crappy hack right now */}
          <Goal><span><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></span></Goal>
          <Goal><span><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></span></Goal>

        </GoalList>
      </GoalGrid>
    </Layout>
  )
}

export default Goals

//({post.wordCount.words.toLocaleString("en-US")}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: {order: [ASC,DESC], fields: [frontmatter___type, frontmatter___date]}
      filter: {frontmatter: {type: {in: ["goals", "review"]}}}
    ) {
      nodes {
        excerpt(pruneLength: 180)
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
      }
    }
  }
`
