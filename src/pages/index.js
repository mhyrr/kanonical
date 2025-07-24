import * as React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostList from "../components/post-list"

import IndexHeader from "../components/indexheader"
import { BookList, Book, BookTitle, AuthorField } from "./books"

const Index = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const workoutData = data.allGoogleSpreadsheetStravaSheet1.nodes
  const books = data.allGoogleSpreadsheetBooksBooks.edges
  const quotes = data.allGoogleSpreadsheetLinksLinks.edges

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

      <IndexSubtitle>I've started a Substack! If you've made it this far, you should sign up!<br/><br/>

      <iframe src="https://brainsareplastic.substack.com/embed" width="400" height="300" style={{border:"1px solid #EEE", background:"white"}}></iframe>
      </IndexSubtitle>

      <IndexTitle>Things I've Written</IndexTitle>

      <PostList posts={posts} />

      <header><IndexSubtitle><Link to="/blog">There's plenty more to read too</Link></IndexSubtitle></header>

      <IndexTitle>Things I'm Reading</IndexTitle>

      <BookList style={{margin: "1rem"}}>
        {rightNow.map(book => {
          return (
            <Book key={book.node.title}>
                <BookTitle>
                  <span itemProp="headline"><a href={book.node.link}>{book.node.title}</a></span>
                </BookTitle>
                <AuthorField>- {book.node.author}</AuthorField>
            </Book>
          )
        })}
      </BookList>
      <header><IndexSubtitle><Link to="/books">That's {bookCount} books so far this year.</Link></IndexSubtitle></header>

      <SmallGrid>
        <li>
          <IndexTitle>Projects</IndexTitle>
            <Questions>
              <li><b><a href="https://www.thefuriousopposites.com/">The Furious Opposites</a></b> - A Both/And view of understanding technology. Go subscribe!</li>
              <li><b><a href="https://faradash.com/">Faradash</a></b> - A dashboard of foreign spending based on Foreign Agent Registration data. Vibecoded on a Tuesday.</li>
              <li><b><a href="https://github.com/mhyrr/collegevalue">CollegeValue</a></b> - Compare colleges and majors based on how much money graduates make versus how much debt they accrue.  Based on open-source data from the Department of Education. </li>
              
            </Questions>
        </li>
        <li>
          <IndexTitle>Things I'm Wondering</IndexTitle>
            <Questions>
              <li>How are phones and AI are changing the way we grow up?</li>
              <li>How can work on small projects drive family revenue?</li>
              <li>Can restaurants use spreadsheets as menus?</li>
              <li>How do you get better at speaking?</li>
              <li>What does it take to write a spy novel?</li>
            </Questions>
        </li>
      </SmallGrid>
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
          <IndexTitle>Quotes Newly Discovered</IndexTitle>
          <Questions>
            {quotes.map(q => {
              return (
                <li>{q.node.content}<br/><QuoteAuthor>-{q.node.title}</QuoteAuthor></li>
              )

            })}

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
  margin: calc(var(--spacing) * 1.5) 0;

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
  padding: .5rem;

  li {
    padding-bottom: .5rem;
  }
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

    & a {
      text-decoration: underline;
      color: var(--secondary);
      text-shadow: .2px .2px 0 var(--darkRGB 0.5);
      font-weight: 400;
    }

    & b {
      color: var(--secondary);
      text-shadow: .2px .2px 0 var(--darkRGB 0.5);
      font-weight: 400;
    }
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

const QuoteAuthor = styled.span`
  font-style: italic;
  font-weight: 400;
  font-size: var(--h6);
  color: var(--primary);
  font-weight: 300;
  float: right;
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
  padding: 1rem;
  text-align: center;
    & a {
      text-decoration: underline;
      color: var(--secondary);
      text-shadow: .2px .2px 0 var(--darkRGB 0.5);
      font-weight: 400;
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
    allGoogleSpreadsheetLinksLinks(limit: 4, filter: {content: {regex: "/^(?!https:\/\/)/"}}) {
      edges {
        node {
          content
          title
        }
      }
    }
  }
`
