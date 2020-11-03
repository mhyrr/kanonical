import React from 'react'
import Link from 'gatsby-link'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile_new1.png'
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
        <Link
          to='/'
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
        </Link>
        <br/>
        Hi I'm <Link to='/'>Greg</Link>.  Occasionally, I do things.

        
      </p>
    )
  }
}

export default Bio
