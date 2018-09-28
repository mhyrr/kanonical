import React from 'react'
import profilePic from './profile.png'

const Header = (props) => (
    <header id="header" style={props.timeout ? {display: 'none'} : {}}>
        <div className="logo">
          <img
            src={profilePic}
            alt={`Greg Olsen`}
            style={{
              float: 'left'
            }}
          />
        </div>
        <div className="content">
            <div className="inner anim">
                <h1>Hi, I'm Greg.</h1>
                <div className="mask">
                  <ul>
                    <li className="anim1"><p>Occasionally, I <i>do</i> things.</p></li>
                    <li className="anim2"><p>Occasionally, I <i>write</i> things.</p></li>
                    <li className="anim3"><p>Occasionally, I <i>read</i> things.</p></li>
                    <li className="anim4"><p>Occasionally, I <i>build</i> things.</p></li>
                    <li className="anim5"><p>Occasionally, I <i>photograph</i> things.</p></li>
                  </ul>
                </div>
            </div>
        </div>
        <nav>
            <ul>
                <li><a href="javascript:;" onClick={() => {props.onOpenArticle('intro')}}>Intro</a></li>
                <li><a href="javascript:;" onClick={() => {props.onOpenArticle('work')}}>Work</a></li>
                <li><a href="javascript:;" onClick={() => {props.onOpenArticle('about')}}>About</a></li>
                <li><a href="javascript:;" onClick={() => {props.onOpenArticle('contact')}}>Contact</a></li>
            </ul>
        </nav>
    </header>
)

Header.propTypes = {
    onOpenArticle: React.PropTypes.func,
    timeout: React.PropTypes.bool
}

export default Header
