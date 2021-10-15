import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"


const ShareLink = styled(Link)`
  color: #ff0000;

  link {
    background-color: transparent;
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
