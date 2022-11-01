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

const IndexHeader = () => {
  const data = useStaticQuery(graphql`
    query IHQuery {
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
        <div>
          <RoundContainer>
            <StaticImage
              className="bio-avatar"
              layout="constrained"
              formats={["auto", "webp", "avif"]}
              src="../images/profile2.jpeg"
              width={128}
              height={128}
              quality={95}
              style={{minWidth: "64px"}}
              alt="My kids are the best"
            />
          </RoundContainer>
        </div>
      </Link>
      {author?.name && (
        <BioTitle>
          Hey 👋🏼 I'm <strong>{author.name}</strong>.
        </BioTitle>
      )}

      <BioPara>
      I'm a guy on the internet with too many interests.
      Most of them orbit around <strong>learning</strong> and <strong>writing</strong> and <strong>software</strong> and <strong>kids</strong> and <strong>books</strong> and <strong>business</strong>.  That covers too much.
      </BioPara>
      <BioPara>
      Credentials are sooo boring. I like this list better.
      <ul>
        <li>3 amazing kids and 1 amazing wife</li>

        <li>Bought our 2nd house 5 years ago and paid it off</li>

        <li>Still go to church</li>

        <li>Bought a pontoon boat to hang out, fish, and drink beer</li>

        <li>Split time between Maryland and Delaware</li>

        <li>Wrote software or led software teams for a living for 20 years, including some fun machine learning and model training stuff</li>

        <li>Run a lot</li>

        <li>Would choose books first over food and clothes</li>

        <li>42 and still feel like a wide-eyed little kid</li>

        <li>Raced cars and taught other people how to race cars</li>

        <li>Helped build a company from 2 to 200+</li>

        <li>Love building things out of (wood | words | code | ideas)</li>
      </ul>
      </BioPara>
    </BioHeader>

  )
}

const BioPara = styled.p`
  margin-top: auto;
  font-size: var(--size-400);

  ul {
    margin: 0.2rem;
    line-height: 1;
  }

  li {
    margin: 0;
    line-height: 1.2rem;
    padding: 0.2rem;
  }
`;

const RoundContainer = styled.div`
  border-radius: 64px;
  overflow: hidden;
`;

const BioHeader = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0rem;
  padding-bottom: .5rem;
  strong {
      display:contents !important;
  }
`;

const BioTitle = styled.h2`
  margin-top: 1.3rem;
  padding-left: 1rem;

`;

export default IndexHeader
