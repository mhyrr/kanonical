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
      <Link to="/">
        <StaticImage
          className="bio-avatar"
          layout="constrained"
          formats={["auto", "webp", "avif"]}
          src="../images/profile2.png"
          width={64}
          height={64}
          quality={95}
          style={{minWidth: "64px"}}
          alt="Me and my better half"
        />
      </Link>
      {author?.name && (
          <BioTitle>
            Hi I'm <strong>{author.name}</strong>.
            Occasionally I do things.

            {/*
            <div className="mask">
              <ul>
                <li className="anim1"><span>do</span></li>

                <li className="anim2"><p><i>write</i></p></li>
                <li className="anim3"><p><i>think</i></p></li>
                <li className="anim4"><p><i>photograph</i></p></li>
              </ul>
            </div>
            things.*/}



            {/*<a href={`https://twitter.com/${social?.twitter || ``}`}>
              You should follow them on Twitter
            </a>*/}
          </BioTitle>
      )}
       
    </BioHeader>

  )
}


const BioHeader = styled.div`
  display:flex;
  padding-top: 0rem;
  padding-bottom: .5rem;
`;

const BioTitle = styled.div`
  margin-top: 1.3rem;
  padding-left: 1rem;
  font-size: var(--para);

  ul, ol {
    padding: 0;
    margin: 0;
    display: inline;
    position: relative;
    width: 40px !important;
  }

  li {
     display: inline-block;
     text-align: center;
     list-style: none;
     padding: 0;

  }

  .mask {
    height: 60px;
    white-space:nowrap;
    position: relative;
    display: inline;
    overflow : hidden;
  }

  .mask span {
    padding-left: 8px;
    padding-right: 8px;
  }

  .mask li.anim1 {
     /* padding: 0 0 0 114px; */
    -moz-animation: cycle 20s linear infinite;
    -webkit-animation: cycle 20s linear infinite;
    animation: cycle 20s linear infinite;
  }

  .mask li.anim2 {
    /* padding: 0 0 0 108px; */
    -moz-animation: cycle2 20s linear infinite;
    -webkit-animation: cycle2 20s linear infinite;
    animation: cycle2 20s linear infinite;
  }

  .mask li.anim3 {
    /* padding: 0 0 0 104px; */
    -moz-animation: cycle3 20s linear infinite;
    -webkit-animation: cycle3 20s linear infinite;
    animation: cycle3 20s linear infinite;
  }

  .mask li.anim4 {
    /* padding: 0 0 0 80px; */
    -moz-animation: cycle4 20s linear infinite;
    -webkit-animation: cycle4 20s linear infinite;
    animation: cycle4 20s linear infinite;
  }

  .mask li.anim5  {
    /* padding: 0 0 0 68px; */
    -moz-animation: cycle5 20s linear infinite;
    -webkit-animation: cycle5 20s linear infinite;
    animation: cycle5 20s linear infinite;
  }



`;

export default Bio
