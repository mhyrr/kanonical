import React, { useEffect, useState } from "react"
import styled from 'styled-components';
import { useStaticQuery, graphql, Link } from "gatsby"
import Bio from "./bio"
import Burger from "./burger"
import Navigation from "./navigation"
import { HeaderStyles, HeaderContainer } from "../styles/navstyles"
import ReadingProgress from "./readingprogress"

const Container = styled.div`
  padding: 0;
  background: #f1faee;
  height: 100px;
  z-index: 10;
  width: 100%;
  margin: 0;
`;

const Header = (target) => {

  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)
  const title = data.site.siteMetadata?.title || `Title`

  const [scroll, setScroll] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50)
    })
  }, [])

  return (

    <HeaderContainer id={target.id || null} className={scroll ? "scrolled" : null} >
      <HeaderStyles>
        <Bio />
        <Burger />
        <Navigation />
      </HeaderStyles>
      <ReadingProgress target={target} />
    </HeaderContainer>
  )

}
export default Header
