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

const YearsTitle = styled.h4`
  margin: calc(var(--spacing) / 2) 0;
`;

const TitleField = styled.h6`
  color: var(--dark);
  text-shadow: 0px 0px 1px rgba(var(--secondary), 0.3);
  margin: 0;
`

const AuthorField = styled.span`
  font-style: italic;
  font-size: var(--h6);
  color: var(--primary);
`

const SimpleItem = styled.li`
  list-style: none;
  position: relative;
  display: flex;
  padding: .1em;
`


const BookList = styled.ul`

  padding: 0;
  margin: calc(var(--spacing) * 2) 0;
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

`;

const Book = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  // border: 3px solid rgba(var(--darkRGB), 0.4);
  // background: linear-gradient(135deg, rgba(var(--secondaryRGB), 0.4) 0%,rgba(255,255,255,.6) 100%);
  // backdrop-filter: blur(20px);
   border-radius: 8px;

  margin: 0;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }

  @media screen and (max-width: 500px) {
    & {
      margin-top: var(--size-200);
    }
  }
`;

const BookTitle = styled.span`
  line-height: 1.28
  margin-top: 0.5rem !important;
  margin-bottom: 0;
  text-transform: capitalize;
  font-size: var(--size-400);
  font-weight: 700;
  color: var(--dark);

  & a {
    text-decoration: none;
    color: inherit;
  }

  & a::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const BlogIndex = ({ data, location }) => {

  const siteTitle = data.site?.title || `Title`

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

  let yearBefore = today - 1
  const booksLastYear = books.filter(book=> {
    var done = book.node.done || "null"
    var bookYear = new Date(book.node.date) || new Date("01-01-1900")
    return (bookYear.getFullYear() === yearBefore && done.toLowerCase() === "done")
  })

  const otherBooks = books.filter(book => {
    var done = book.node.done || "null"
    return (!rightNow.includes(book) && !booksThisYear.includes(book) && !booksLastYear.includes(book) && done.toLowerCase() === "done")
  })


  var library = books.filter(item => {
    var done = item.node.done || "null"
    return done.toLowerCase() === "done"
  }).map(item => {
    var book = {}
    book.title = item.node.title
    book.id = null
    book.author = item.node.author
    book.image = null
    book.date_finished = item.node.date
    book.link = item.node.link
    book.notes = null
    return book
  })
  library.name =  "AJ Troy's Library"
  library.url =  "https://www.ajtroy.com/"
  library.bio = "My Running List of Books Read"



  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />

      <YearsTitle>Things I'm Currently Reading</YearsTitle>

      <BookList>
        {rightNow.map(book => {
          return (
            <Book key={book.node.title}>
                <BookTitle>
                  <Link to={book.node.link} itemProp="url">
                    <span itemProp="headline">{book.node.title}</span>
                  </Link>
                </BookTitle>
                <AuthorField>- {book.node.author}</AuthorField>
            </Book>
          )
        })}
      </BookList>

      <h4>Things I've Read So Far In {today}</h4>

      <BookList>
      {booksThisYear.map(book => {
        return (
          <Book key={book.node.title}>
              <BookTitle>
                <Link to={book.node.link} itemProp="url">
                  <span itemProp="headline">{book.node.title}</span>
                </Link>
              </BookTitle>
              <AuthorField>- {book.node.author}</AuthorField>
          </Book>
        )
      })}
      </BookList>

      <h4>Things I Read In {yearBefore}</h4>

      <BookList>
      {booksLastYear.map(book => {
        return (
          <Book key={book.node.title}>
              <BookTitle>
                <Link to={book.node.link} itemProp="url">
                  <span itemProp="headline">{book.node.title}</span>
                </Link>
              </BookTitle>
              <AuthorField>- {book.node.author}</AuthorField>
          </Book>
        )
      })}
      </BookList>

      <h4>Everything before that..</h4>

      {otherBooks.map(book => {
        return (
          <SimpleItem key={book.node.title}>
              <TitleField>
                <Link to={book.node.link} itemProp="url">
                  <span itemProp="headline">{book.node.title} by <AuthorField>{book.node.author}</AuthorField></span>
                </Link>
              </TitleField>
          </SimpleItem>
        )

      })}


    <h4><a href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(library))}`} download="library.json">Library?</a>Hmm..Library.json</h4>


    </Layout>
  )
}

export default BlogIndex

export const allBooks = graphql`
  query {
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
