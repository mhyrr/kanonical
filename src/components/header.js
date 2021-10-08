import React, { useEffect, useState } from "react"
import styled from 'styled-components';
import { useStaticQuery, graphql, Link } from "gatsby"
import Bio from "./bio"
import Burger from "./burger"
import Navigation from "./navigation"
import { HeaderStyles } from "../styles/navstyles"

const Container = styled.div`
  padding: 0;
  background: #f1faee;
  height: 100px;
  z-index: 10;
  width: 100%;
  margin: 0;
`;

const Header = () => {
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
    <HeaderStyles className={scroll ? "scrolled" : null}>
      <Bio />
      <Burger />
      <Navigation />
    </HeaderStyles>
  )

}
export default Header
