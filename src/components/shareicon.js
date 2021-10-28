import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"


const ShareLink = styled(Link)`
  color: var(--secondary);
  padding: 8px;

  link {
    background-color: transparent;

    a {
      text-decoration: none;
      margin-right: 0;
      position: relative;

      &:after {
        content: none;
        height: 0;
      }
    }
  }

  svg {
    margin-right: 0;
  }
`

const ShareIcon = ({ shareUrl, children }) => {
  return (
    <ShareLink to={shareUrl} target="_blank" rel="noopenner noreferrer">
      {children}
    </ShareLink>
  )
}

export default ShareIcon
