import * as React from "react"
import styled from 'styled-components';
import { useStaticQuery, graphql, Link } from "gatsby"

const TitleLink = styled.h2`
  font-size: var(--fontSize-7);
  margin: 0;
`;

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

  return (
    <Container>
      <TitleLink><Link to="/">{title}</Link></TitleLink>
    </Container>
  )

}
export default Header
