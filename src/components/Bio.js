/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

const BioHeader = styled.div`
  display:flex;
  padding-top: 0rem;
  padding-bottom: .5rem;
`;

const BioTitle = styled.div`
  margin-top: 1rem;
  padding-left: 1rem;
`;

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
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

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <BioHeader className="bio" >
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile.png"
        width={64}
        height={64}
        quality={95}
        style={{marginTop:"-6px"}}
        alt="Me and my better half"
      />
      {author?.name && (
        <BioTitle>
          Hi I'm <strong>{author.name}</strong>. {author?.summary || null}
          {` `}


          {/*<a href={`https://twitter.com/${social?.twitter || ``}`}>
            You should follow them on Twitter
          </a>*/}
        </BioTitle>
      )}

    </BioHeader>

  )
}

export default Bio
