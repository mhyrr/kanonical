import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import {
  mainMenuItems,
  footerMenuItems,
  socialMenuItems,
} from "./menu-items"
import styled from "styled-components"
import PropTypes from "prop-types"
import { FaTwitter, FaInstagram, FaGithub } from "react-icons/fa"
import ShareIcon from "./shareicon"


const FooterStyles = styled.footer`
  padding: calc(var(--spacing) * 2);
  background-color: rgba(var(--lightRGB));
  font-family: var(--serif);
  font-weight: 300;
  font-style: normal;
  color: var(--secondary);
  //box-shadow: inset 0px 16px 16px -8px rgba(var(--primaryRGB), 0.8);

  .flex {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

      flex-direction: row;
      justify-content: center;
    
  }

  li {
    list-style: none;
    padding-left: 0;
    margin-top: 5px;
    margin-bottom: 5px;

    @media (min-width: 768px) {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }

  a {
    text-decoration: none;
    color: var(--primary);
    //text-shadow: 0.2px 0.2px 0 rgba(var(--darkRGB), 0.6);
    transition: var(--transMed);

    &:hover {
      color: var(--secondary);
    }
  }

  @media (min-width: 768px) {
    padding-top: calc(var(--spacing) * 4);
    padding-bottom: calc(var(--spacing) * 4);
  }

  .brand-cont,
  .brand-cont img {
    margin-bottom: calc(var(--spacing) * 2);
  }

  .brand-cont {
    margin-left: 0;
    margin-right: auto;
    width: 100%;

    a {
      display: inline-block;
    }

    img {
      width: 100%;
    }
  }

  .footer-menu {
    margin: 0;
    width: 50%;
    flex-shrink: 0;
    margin-bottom: calc(var(--spacing) * 2);
    padding: 0;
    margin-bottom: calc(var(--spacing) * 2);

    &:last-child {
      margin-bottom: 0;
    }

    @media (min-width: 375px) {
      width: calc(100% / 3);
      margin-bottom: 0;
    }

    @media (min-width: 768px) {
      flex-basis: 125px;
      flex-grow: 0;
      margin-bottom: 0;

      li {
        padding-left: calc(var(--spacing) / 2);
      }
    }

    @media (min-width: 1200px) {
      flex-basis: 175px;
    }
  }

  .brand-cont,
  .menus-cont,
  .copy-cont {
    width: 100%;
    font-size: 2rem;
  }

  .brand-cont {
    width: 125px;

    @media (min-width: 600px) {
      width: 150px;
      flex-basis: 150px;
      flex-shrink: 0;
      flex-grow: 0;
    }
  }

  .menus-cont {

    margin: calc(var(--spacing) * 2)  0;

    @media (min-width: 375px) {
      display: flex;
    }

      justify-content: center;
  }

  .copy {
    margin: 0;
    padding: 0;
    text-align: center;
    margin-top: calc(var(--spacing) * 2);

    text-decoration: none;
    color: var(--primary);
    //text-shadow: 0.2px 0.2px 0 rgba(var(--darkRGB), 0.6);
    transition: var(--transMed);

    
    @media (min-width: 600px) {
      margin-top: 0;
    }

    li {
      margin-right: var(--spacing);
    }
  }
`

const Ruler = styled.div`
  margin: 0 auto;
  width: 60%;
  border-bottom: 1px var(--primary) solid;
  text-align: center;
`;

const Footer = ({ Logo }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author {
              name
            }
            siteUrl
          }
        }
      }
    `
  )

  const footerData = data.site.siteMetadata

  return (
    <FooterStyles>
      <div className="flex">
        
        <Ruler/>
        
        <div className="menus-cont">

          <ShareIcon shareUrl={`https://twitter.com/mhyrr`}>
            <FaTwitter />
          </ShareIcon>
          <ShareIcon shareUrl={`https://instagram.com/mhyrr`}>
            <FaInstagram />
          </ShareIcon>
          <ShareIcon shareUrl={`https://github.com/mhyrr`}>
            <FaGithub />
          </ShareIcon>
          
  {/*
        {mainMenuItems || socialMenuItems || footerMenuItems ? (
          
          {socialMenuItems && (
            <ul className="footer-menu">
              {socialMenuItems.map((item, index) => {
                return (
                  <li key={index}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.name}
                    </a>
                  </li>
                )
              })}
            </ul>
          )}

          
          {footerMenuItems && (
            <ul className="footer-menu">
              {footerMenuItems.map((item, index) => (
                <li key={`footerMenuItem${index}`}>
                  <Link to={item.path}>{item.title}</Link>
                </li>
              ))}
            </ul>
          )}) : null}
  */}


        </div>
        
        <ul className="copy">
          {/* if there is an author stated in the config, render this */}
          <li>
            Crafted in Maryland or Delaware.
          </li>
          <li>
            <Link to="/about">Colophon and other details.</Link>
          </li>


          {footerData.author.name && (
            <li>
              <a
                href={footerData.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                &copy; {new Date().getFullYear()} {footerData.author.name}
              </a>
            </li>

          )}
        </ul>

      </div>
    </FooterStyles>
  )
}

Footer.propTypes = {
  Logo: PropTypes.string,
}


export default Footer
