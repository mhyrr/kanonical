import * as React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostList from "../components/post-list"
import BookIndex from "./books"
import IndexHeader from "../components/indexheader"
import { BookList, Book, BookTitle, AuthorField } from "./books"

const Index = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const workoutData = data.allGoogleSpreadsheetStravaSheet1.nodes
  const books = data.allGoogleSpreadsheetBooksBooks.edges

  const rightNow = books.filter(book => {
    return book.node.current == "y"
  })

  let today = new Date().getFullYear();
  const booksThisYear = books.filter(book => {
    var done = book.node.done || "null"
    var bookYear = new Date(book.node.date) || new Date("01-01-1900")
    return (bookYear.getFullYear() === today && done.toLowerCase() === "done")
  })
  const bookCount = booksThisYear.length;

  const workouts = workoutData.map(workout => {
    workout.movingTime = workout.movingTime.replace(/\s/g, "");
    workout.aveSpeed = workout.aveSpeed.replace(/\s/g, "");

    return workout
  })

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Hey I'm Greg.  Occasionally I do things." />

      <IndexHeader/>



      <IndexTitle>Things I've Written</IndexTitle>

      <PostList posts={posts} />

      <header><IndexSubtitle><Link to="/blog">There's plenty more to read too</Link></IndexSubtitle></header>

      <IndexTitle>Things I'm Reading</IndexTitle>

      <BookList style={{margin: "1rem"}}>
        {rightNow.map(book => {
          return (
            <Book key={book.node.title}>
                <BookTitle>
                  <span itemProp="headline"><a href="{book.node.link}">{book.node.title}</a></span>
                </BookTitle>
                <AuthorField>- {book.node.author}</AuthorField>
            </Book>
          )
        })}
      </BookList>
      <header><IndexSubtitle><Link to="/books">That's {bookCount} books so far this year.</Link></IndexSubtitle></header>

      <SmallGrid>
        <li>
          <IndexTitle>Workouts I've Killed</IndexTitle>
          <Workouts>
          {workouts.map(run => {
            return (
              <Book key={run.distance}>
                <Workout>
                  <span itemProp="headline">{run.distance} Mile {run.type}, {run.startDateLocal}</span>
                </Workout>
                <Pace>{run.movingTime} {(run.aveSpeed == "Infinity:NaN") ? " minutes" : "at " + run.aveSpeed + " pace" }</Pace>
              </Book>
            )
          })}
          </Workouts>
        </li>
        <li>
          <IndexTitle>Things I'm Wondering</IndexTitle>
            <Questions>
              <li>How are phones and technology changing the way we grow up?</li>
              <li>What do people actually need out of college?</li>
              <li>How can more people enjoy two houses?</li>
              <li>How can work on small projects drive family revenue?</li>
              <li>What does it take to write a spy novel?</li>
            </Questions>
        </li>
      </SmallGrid>

    </Layout>
  )
}

export default Index

const SmallGrid = styled.ul`
  list-style: none;
  display: grid;
  padding: 0;
  justify-items: center;
  grid-gap: var(--size-600);
  grid-template-columns: repeat(auto-fit,minmax(23ch,1fr));
  margin: calc(var(--spacing) * 2) 0;

  li {
    margin: 0;
    padding: 0;
  }
`;

const Workouts = styled.ul`
  list-style: none;
  display: grid;
  padding: 0;
  margin: 0;
  justify-items: left;

`;

const Questions = styled.ul`
  list-style: none;
  display: grid;
  padding: 0;
  margin: 0;
  justify-items: left;

  li {
    line-height: 1.28;
    margin: calc(var(--spacing) * 1) calc(var(--spacing) * 1.5)  ;
    font-size: var(--size-400);
    font-weight: 300;
    color: var(--dark);
    text-shadow: .2px .2px 0 var(--primaryRGB 0.5);
  }
`;

const Workout = styled.div`
  line-height: 1.28;
  margin: calc(var(--spacing) * 1) 0 0 0;
  font-size: var(--size-400);
  font-weight: 300;
  color: var(--dark);
  text-shadow: .2px .2px 0 var(--primaryRGB 0.5);
`;

const Pace = styled.span`
  font-style: italic;
  font-weight: 400;
  font-size: var(--h6);
  color: var(--primary);
  font-weight: 300;
`;

const IndexTitle = styled.h2`
  margin-top: 2rem;
  text-align: center;
    & a {
      text-decoration: underline;
      color: var(--secondary);
      text-shadow: .2px .2px 0 var(--darkRGB 0.5);
      font-weight: 600;
    }
`;

const IndexSubtitle = styled.h4`
  margin: .5rem;
  text-align: center;
    & a {
      text-decoration: underline;
      color: var(--secondary);
      text-shadow: .2px .2px 0 var(--darkRGB 0.5);
      font-weight: 600;
    }
`

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 6, sort: {fields: frontmatter___date, order: DESC}, filter: {frontmatter: {type: {ne: "about"}}}) {
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
    allGoogleSpreadsheetStravaSheet1(limit: 5) {
      nodes {
        aveSpeed
        distance
        movingTime
        startDateLocal(fromNow: true)
        type
      }
    }
    allGoogleSpreadsheetBooksBooks(sort: {fields: date, order: DESC}) {
      edges {
        node {
          date
          current
          author
          done
          link
          title
        }
      }
    }
  }
`
