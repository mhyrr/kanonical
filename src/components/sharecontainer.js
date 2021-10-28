import React from "react"
import { FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa"
import ShareIcon from "./shareicon"
import styled from "styled-components"

const ShareArea = styled.div`

  display: inline-flex;

  h5 {
    color: var(--primary) !important;
  }

  svg {
    width: 24px;
    height: 24px;
    margin-right: var(--spacing);
  }

  a {
    text-decoration: none;
    margin-right: 0;
    position: relative;

    &:after {
      content: none;
    }
  }
`

const ShareCont = ({ facebook, twitter, linkedin, href }) => {
  return (
    <ShareArea>
      <h5>Like the content?  Share it around..</h5>
        {twitter && (
          <ShareIcon shareUrl={`https://twitter.com/intent/tweet?url=${href}`}>
            <FaTwitter />
          </ShareIcon>
        )}
        {facebook && (
          <ShareIcon
            shareUrl={`https://www.facebook.com/sharer.php?u=${href}%2F`}
          >
            <FaFacebook />
          </ShareIcon>
        )}
        {linkedin && (
          <ShareIcon
            shareUrl={`https://www.linkedin.com/sharing/share-offsite/?url=${href}`}
          >
            <FaLinkedin />
          </ShareIcon>
        )}
    </ShareArea>
  )
}

export default ShareCont
