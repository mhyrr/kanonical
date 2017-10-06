import React from 'react'
import Link from 'gatsby-link'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile.png'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <p
        style={{
          marginBottom: rhythm(2.5),
          verticalAlign: 'middle',
        }}
      >
        <img
          src={profilePic}
          alt={`Greg Olsen`}
          style={{
            float: 'left',
            marginRight: rhythm(1 / 4),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />

        <br/>
        Hi I'm Greg.  Occasionally, I do things.
        <Link
          style={{ float: 'right' }}
          to='archive'
        >
          Archive
        </Link>
      </p>
    )
  }
}

export default Bio
