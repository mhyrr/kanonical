
import React, {component} from 'react'
import Link from 'gatsby-link'
import StackGrid from "react-stack-grid"
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'

class Tumble extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const links = get(this, 'props.data.allGoogleSheetLinksRow.edges')

    return (
      <div width="100%">
        <Helmet title={get(this, 'props.data.site.siteMetadata.title')} />

        <StackGrid columnWidth={300} appearDelay={100} duration={960} gutterWidth={20} gutterHeight={20}>
        {links.map(link => {
          if (link.node.path !== '/404/') {
            const title = get(link, 'node.title') || link.node.path

            // var element
            // if (link.node.content.endsWith(".gif")) {
            //   element = (
            //     <img src="{link.node.content}" />
            //   );
            // }
            // else {
            //   <p dangerouslySetInnerHTML={{ __html: link.node.content }} />
            // }



            return (
              <div style={{ background: '#DDDDDD' }} key={link.node.path}>
                <h3

                >
                  <Link
                    style={{ boxShadow: 'none' }}
                    to={link.node.path}
                  >
                    {link.node.title}
                  </Link>
                </h3>
                <small>{link.node.date}</small>
                <p dangerouslySetInnerHTML={{ __html: link.node.content }} />
              </div>
            )
          }
        })}

        </StackGrid>

      </div>
    )
  }
}

Tumble.propTypes = {
  route: React.PropTypes.object,
}

export default Tumble

export const pageQuery = graphql`
  query TumbleQuery {
    site {
      siteMetadata {
        title
      }
    }

    allGoogleSheetLinksRow {
      totalCount
      edges {
        node {
          date
          title
          content
        }
      }
    }
  }
`
