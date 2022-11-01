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

export const AuthorField = styled.span`
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


export const BookList = styled.ul`

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

export const Book = styled.li`
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

export const BookTitle = styled.span`
  line-height: 1.28
  margin-top: 0.5rem !important;
  margin-bottom: 0.2rem;
  text-transform: capitalize;
  font-size: var(--size-400);
  font-weight: 600;
  color: var(--secondary);
  text-shadow: .2px .2px 0 var(--darkRGB 0.5);

  & a {
    text-decoration: underline;
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

const Preface = styled.h6`
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

const BookIndex = ({ data, location }) => {

  const siteTitle = `All the Books`

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

  let twoYearsBefore = today - 2
  const booksTwoYearsAgo = books.filter(book=> {
    var done = book.node.done || "null"
    var bookYear = new Date(book.node.date) || new Date("01-01-1900")
    return (bookYear.getFullYear() === twoYearsBefore && done.toLowerCase() === "done")
  })

  const otherBooks = books.filter(book => {
    var done = book.node.done || "null"
    return (!rightNow.includes(book) && !booksThisYear.includes(book) && !booksLastYear.includes(book) && !booksTwoYearsAgo.includes(book) && done.toLowerCase() === "done")
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

      <Preface>
        I really like books.  Like, a lot.
        I've built up a list of everything I've read over the years.
        I'm missing a bunch in the distant past, but I've been keeping this list consistently since around 2018.
        <br/><br/>
        I'm a big fan of <a href="https://tomcritchlow.com/">Tom Critchlow's</a> <a href="https://tomcritchlow.com/2020/04/15/library-json/">Library.json idea</a> too.
          Here's <a href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(library))}`} download="library.json">my Library.json</a> index.

          <YearsTitle>Favorites Of The Last Few Years</YearsTitle>

        <ul>
          <li><Link to={'/books-2021/'} itemProp="url">Best of 2021</Link></li>
          <li><Link to={'/books-2020/'} itemProp="url">Best of 2020</Link></li>
          <li><Link to={'/books-2019/'} itemProp="url">Best of 2019</Link></li>
        </ul>

      </Preface>

      <YearsTitle>Things I'm Currently Reading</YearsTitle>

      <BookList>
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

      <YearsTitle>Things I've Read So Far In {today}</YearsTitle>

      <BookList>
      {booksThisYear.map(book => {
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

      <YearsTitle>Things I Read In {yearBefore}</YearsTitle>

      <BookList>
      {booksLastYear.map(book => {
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


      <YearsTitle>Things I Read In {twoYearsBefore}</YearsTitle>

      <BookList>
      {booksTwoYearsAgo.map(book => {
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

      <YearsTitle>Everything before that..</YearsTitle>

      {otherBooks.map(book => {
        return (
          <SimpleItem key={book.node.title}>
              <TitleField>
                <Link to={book.node.link} itemProp="url">
                  <span itemProp="headline">{book.node.title} <AuthorField>by {book.node.author}</AuthorField></span>
                </Link>
              </TitleField>
          </SimpleItem>
        )

      })}




    </Layout>
  )
}

export default BookIndex

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
