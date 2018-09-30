import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import pic01 from '../images/pic01.jpg'
import pic02 from '../images/pic02.jpg'
import pic03 from '../images/pic03.jpg'
import { rhythm } from '../utils/typography'

class Main extends React.Component {
  render() {

    let close = <div className="close" onClick={() => {this.props.onCloseArticle()}}></div>

    return (
      <div id="main" style={this.props.timeout ? {display: 'flex'} : {display: 'none'}}>

        <article id="blog" className={`${this.props.article === 'blog' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
          <h2 className="major">Articles</h2>

            {this.props.posts.map(post => {
              if (post.node.path !== '/404/') {
                const title = get(post, 'node.frontmatter.title') || post.node.path
                return (
                  <div key={post.node.frontmatter.path}>
                    <h3
                      style={{
                        display: 'inline',
                        marginBottom: rhythm(1 / 4),
                      }}
                    >
                      <Link
                        style={{ boxShadow: 'none' }}
                        to={post.node.frontmatter.path}
                      >
                        {post.node.frontmatter.title}
                      </Link>
                    </h3>
                    <small style={{
                      display: 'inline',
                      float: 'right',
                    }}>{post.node.frontmatter.date}</small>
                    <p dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
                  </div>
                )
              }
            })}
          {close}
        </article>


      </div>
    )
  }
}

Main.propTypes = {
  route: React.PropTypes.object,
  article: React.PropTypes.string,
  articleTimeout: React.PropTypes.bool,
  onCloseArticle: React.PropTypes.func,
  timeout: React.PropTypes.bool
}

export default Main
