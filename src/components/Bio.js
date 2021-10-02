/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

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
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile.png"
        width={64}
        height={64}
        quality={95}
        alt="Me and my better half"
      />
      {author?.name && (
        <p>
          Hi I'm <strong>{author.name}</strong>. {author?.summary || null}
          {` `}


          {/*<a href={`https://twitter.com/${social?.twitter || ``}`}>
            You should follow them on Twitter
          </a>*/}
        </p>
      )}

    </div>

  )
}

export default Bio
