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

const WordsField = styled.div`
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
  padding: 0em;
`

const BlogIndex = ({ data, location }) => {

  const siteTitle = data.site?.title || `Title`

  const books = data.allGoogleSpreadsheetBooksBooks.edges

  const rightNow = books.filter(book => {
    return book.node.current == "y"
  })

  let today = new Date().getFullYear();
  const booksThisYear = books.filter(book => {
    let bookYear = new Date(book.node.date) || new Date("01-01-1900")
    return (bookYear.getFullYear() === today && book.node.done === "done")
  })

  let yearBefore = today - 1
  const booksLastYear = books.filter(book=> {
    let bookYear = new Date(book.node.date) || new Date("01-01-1900")
    return (bookYear.getFullYear() === yearBefore && book.node.done === "done")
  })

  console.log(booksLastYear)

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <h4>Things I'm Currently Reading</h4>

      {rightNow.map(book => {
        return (
          <SimpleItem key={book.node.title}>
              <TitleField>
                <Link to={book.node.link} itemProp="url">
                  <span itemProp="headline">{book.node.title}</span>
                </Link>
              </TitleField>
          </SimpleItem>
        )

      })}

      <h4>Things I've Read This Year</h4>

      {booksThisYear.map(book => {
        return (
          <SimpleItem key={book.node.title}>
              <TitleField>
                <Link to={book.node.link} itemProp="url">
                  <span itemProp="headline">{book.node.title}</span>
                </Link>
              </TitleField>
          </SimpleItem>
        )

      })}

      <h4>Things I Read Last Year</h4>

      {booksLastYear.map(book => {
        return (
          <SimpleItem key={book.node.title}>
              <TitleField>
                <Link to={book.node.link} itemProp="url">
                  <span itemProp="headline">{book.node.title}</span>
                </Link>
              </TitleField>
          </SimpleItem>
        )

      })}

      {/*{list.map(post => {
        const title = post.frontmatter.title || post.fields.slug

        return (
          <SimpleItem key={post.fields.slug}>
              <DateField>
                <small>{post.frontmatter.date}</small>
                <WordsField>({post.wordCount.words.toLocaleString("en-US")} words)</WordsField>
              </DateField>
              <TitleField>
                <Link to={post.frontmatter.path} itemProp="url">
                  <span itemProp="headline">{title}</span>
                </Link>
              </TitleField>

          </SimpleItem>
        )
      })}
      <div ref={loadRef}>
        {hasMore ? <p>Loading...</p> : <p></p>}
      </div>*/}

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
