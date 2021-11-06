
import React, { component, useState, useEffect, useRef } from "react"
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import { CSSGrid, layout, measureItems, makeResponsive } from "react-stonecutter"
import get from 'lodash/get'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Masonry } from 'masonic'
import {Card, CardAttr, CardLink, CardDate} from '../components/card'
import Layout from "../components/layout"
import Typography from "../styles/typography"
import GlobalStyles from "../styles/globalstyles"
import Header from "../components/header"
import { motion } from 'framer-motion'


const isPic = (link) => {
  return link.node.content.endsWith(".png") || link.node.content.endsWith(".jpg") || link.node.content.endsWith(".gif");
}

const isVid = (link) => {
  return link.node.content.includes("youtube") || link.node.content.includes("youtu.be");
}

const isLink = (link) => {
  return link.node.content.trim().startsWith("http://") || link.node.content.trim().startsWith("https://");
}

const isWord = (word) => {
  return word.node.word != undefined
}


const Tumbler = ({data}) => {

    const links =  data.allGoogleSpreadsheetLinksLinks.edges
    const words =  data.allGoogleSpreadsheetWordsWords.edges
    const siteTitle = data.site.siteMetadata.title

    const [showLinks, setShowLinks] = useState(true);
    const [showPics, setShowPics] = useState(true);
    const [showVids, setShowVids] = useState(true);
    const [showQuotes, setShowQuotes] = useState(true);
    const [showWords, setShowWords] = useState(true);

    const all = links.concat(words).sort( (a, b) => { return (b.node.date).localeCompare(a.node.date) }).filter(item => {

        if (item.node.content != undefined || item.node.word != undefined) {

          if (isWord(item) ) {
            return showWords
          }
          else if (isPic(item) ) {
            return showPics
          }
          else if (isVid(item) ) {
            return showVids
          }
          else if (isLink(item) ) {
            return showLinks
          }
          else {
            return showQuotes
          }
        }

        return false;
      }
    )

    var key = 0

    const courtesyOf = (url, title, type) => {

        if (url != undefined) {

            if (type == "link") {

              if (url.indexOf("http") != -1) {
                  let tld = url.trim().replace(/.*https?\:\/\//, '').split('/')[0]
                  return <span>Courtesy of <a href={"https://" + tld}>{tld}</a></span>
              }
              else {
                  return <span>The internet is searchable, so if this quote is unattributed, you should still be able to find it!</span>
              }
            }
            else if (type == "quote") {
              // console.log(url.substring(0,12));
              // console.log(title.substring(0,12));
              if (url.substring(1,12) === title.substring(1,12)) {
                  return <span>The internet is searchable, so if this quote is unattributed, you should still be able to find it!</span>
              } else {
                  return <span>{title}</span>
              }
            }
            else if (type == "img") {
              return <span>{title}</span>
            }

        }

        else {
            return <span>{url}</span>;
        }

    }


    const formatDate = (date) => {
      var date = new Date(date);
      var monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "June", "July",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
      ];

      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();

      return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

    const timeSince = (date) => {

      // console.log("Date: " + date);

      var seconds = Math.floor((new Date() - date) / 1000);

      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
        return interval + " years";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        return interval + " months";
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
        return interval + " days";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return interval + " hours";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        return interval + " minutes";
      }
      return Math.floor(seconds) + " seconds";
    }

    const quoteEnd = (str) => {
        var p = new RegExp("(”|\")\\s+\-+\\s*.*$");
        return p.test(str);
    }

    const toggleLinks = () => {

      setShowLinks(true)
      setShowPics(false)
      setShowWords(false)
      setShowVids(false)
      setShowQuotes(false)
    }

    const togglePics = () => {

      setShowPics(true)
      setShowWords(false)
      setShowVids(false)
      setShowQuotes(false)
      setShowLinks(false)
      // this.setState({cards: this.buildCards()})
    }

    const toggleQuotes = () => {

      setShowQuotes(true)
      setShowWords(false)
      setShowPics(false)
      setShowVids(false)
      setShowLinks(false)
    }

    const toggleWords = () => {

      setShowWords(true)
      setShowPics(false)
      setShowVids(false)
      setShowLinks(false)
      setShowQuotes(false)
      // this.setState({cards: this.buildCards()})
    }

    const toggleVids = () => {

      setShowVids(true)
      setShowWords(false)
      setShowPics(false)
      setShowLinks(false)
      setShowQuotes(false)

    }

    const setAll = () => {
      setShowWords(true)
      setShowPics(true)
      setShowVids(true)
      setShowLinks(true)
      setShowQuotes(true)
    }


    const FinalCard = ({index, data, width}) => {

      if (data.node.content != undefined) {
        if (data.node.path !== '/404/') {
          const title = get(data, 'node.title') || data.node.path
          key++;
          data.node.date = data.node.date || "19700101";
          // Do some date function
          // console.log(data.node.date);
          var isoDate = data.node.date;//.slice(0, 4) + "-" + data.node.date.slice(4, 6) + "-" + data.node.date.slice(6,8)
          // console.log(isoDate);
          var formattedDate = Date.parse(isoDate);

          var element
          var type = "link"

          if (data.node.content != undefined) {
            data.node.content = data.node.content.replace("“", "\"").replace("”", "\"")
            if (isPic(data)) {
              element = (
                <a href={data.node.content} target="_blank">
                  <img src={data.node.content} style={{
                    float: 'left',
                  }} />
                </a>
              );
              type = "img";
            }
            else if ( isVid(data) ) {
              type = "vid";

              element = (
                <div>
                  <h5>{data.node.title}</h5>
                  <iframe width="260" height="120" src={data.node.content.replace("youtube.com/watch?v=", "youtube.com/embed/").replace("youtu.be", "youtube.com/embed")} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
              );
            }
            else if ( isLink(data) ) {

              element = (
                <a href={data.node.content} target="_blank" style={{textDecoration: 'underline'}}>{data.node.title}</a>
              );

            }
            else if (
              (data.node.content.trim().startsWith("\"") && data.node.content.trim().endsWith("\"")) ||
              (data.node.content.trim().startsWith("*") && data.node.content.trim().endsWith("*")) ||
              (data.node.content.trim().startsWith("“") && data.node.content.trim().endsWith("”")) ||
              (data.node.content.trim().startsWith("“") && quoteEnd(data.node.content.trim())) ||
              (data.node.content.trim().startsWith("\"") && quoteEnd(data.node.content.trim()))
              ) {
              type = "quote";
              element = (
                <div className="quote" style={{marginTop: '5px'}}>{data.node.content}</div>
              );

            }
            else {
              element = (<p dangerouslySetInnerHTML={{ __html: data.node.content }} />);
            }
          }
          else {
            element = (<p dangerouslySetInnerHTML={{ __html: data.node.content }} />);
          }

          let card =
              <Card type={type} className={type} key={key} style={{ width:270}}>

                <CardLink>{element}</CardLink>

                <CardAttr type={type}>
                  {courtesyOf(data.node.content, data.node.title, type)}
                </CardAttr>

                <CardDate title={formatDate(formattedDate)}>{timeSince(formattedDate)} ago</CardDate>
              </Card>


          return (
            card
          )
        }

      }
      else {
          key++;

          var element = (
            <div className="word" style={{marginTop: '5px', fontSize: '.75rem'}}>{data.node.definition}</div>
          );
          var type = "word";
          var isoDate = data.node.date;//.slice(0, 4) + "-" + data.node.date.slice(4, 6) + "-" + data.node.date.slice(6,8)
          // console.log(isoDate);
          var formattedDate = Date.parse(isoDate);


          let card =
              <Card type={type} className={type} key={key} style={{ width:270}}>

                <CardLink><a href={data.node.word.replace(/^/, 'https://www.merriam-webster.com/dictionary/')} target="_blank">{data.node.word}</a></CardLink>

                <CardLink>{element}</CardLink>

                <CardDate title={formatDate(formattedDate)}>{timeSince(formattedDate)} ago</CardDate>
              </Card>

          return (
            card
          )
      }
    }

    const target = React.createRef();

    return (

        <div className="tumble" width="90%">
          <GlobalStyles/>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            <Typography />
            <TumbleStyles>
              <Header id="tumbleHeader" target={target} ></Header>
              <div id="tumbleOptions">
                <h4>A list of things I've read or thought about, collated over ten plus years..</h4>
                <nav className="navAnim">
                    <ul>
                        <li className="navanim2"><a href="#links" onClick={() => {toggleLinks()}}>Links</a></li>
                        <li className="navanim3"><a href="#quotes" onClick={() => {toggleQuotes()}}>Quotes</a></li>
                        <li className="navanim3"><a href="#words" onClick={() => {toggleWords()}}>Words</a></li>
                        {/*<li className="navanim4"><a href="#pics" onClick={() => {togglePics()}}>Pics</a></li>
                        <li className="navanim5"><a href="#vids" onClick={() => {toggleVids()}}>Vids</a></li>*/}
                        <li className="navanim5"><a href="#all" onClick={() => {setAll()}}>All</a></li>
                    </ul>
                </nav>
              </div>

              <Masonry className="tumbleGrid" columnWidth={280} rowGutter={8} overscanBy={8} items={all} render={FinalCard} />
            </TumbleStyles>
          </motion.div>

      </div>

    )


}

export default Tumbler


const TumbleStyles = styled.div`

  a {
    display: inline-block;
    text-decoration: none;
    position: relative;
    -webkit-transition: var(--transMed);
    transition: var(--transMed);
    color: var(--dark);
    line-height: 1.75rem;

    &:hover {
      color: var(--dark);

      &::after {
        width: 0;
        left: 100%;
      }
    }
  }

  #tumbleHeader {
    top: 0;
  }

  #tumbleOptions {
    padding-top: calc(var(--spacing) * 6);
    padding-bottom: calc(var(--spacing) * 2);
    max-width: 60%;
    margin-right: auto;
    margin-left: auto;
  }

  .navAnim {

    max-width: 60%;
    margin-right: auto;
    margin-left: auto;

    ul {
      height: 100%;
      margin-left: -40px;
      margin-bottom: 20px;
      padding: 0;
      display: flex;
      text-transform: capitalize;
      li {
        padding-left: 2rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
        font-size: 1.15rem;
        font-weight: 300;
      }
    }

    a {
      display: inline-block;
      text-decoration: none;
      position: relative;
      -webkit-transition: var(--transMed);
      transition: var(--transMed);
      color: var(--dark);
      line-height: 1.75rem;

      &:hover {
        color: var(--primary);

        &::after {
          width: 0;
          left: 100%;
        }
      }
    }
  }

  .post-img {
    margin: calc(var(--spacing) * 2) 0;

    @media (min-width: 1200px) {
      margin: calc(var(--spacing) * 4) 0;
    }
  }

  ol,
  ul {
    margin: 0;
    padding: 0;
    list-style: none !important;
  }

  img {
    max-width: 720px;
  }

  font-weight: 400;
  font-size: var(--h4);
  color: var(--dark);

  h1 {
    color: var(--dark);
    text-shadow: 2px 2px 0 rgba(var(--primaryRGB), var(--alpha));
  }

  h2, h3 {
    font-size: var(--h4);
    color: var(--dark);
    text-shadow: 2px 2px 0 rgba(var(--primaryRGB), var(--alpha));
    margin: calc(var(--spacing) / 2) 0;
  }

  a {
    text-decoration: none;
    margin-right: 0;
    position: relative;

    &:hover,
    &:focus {
      cursor: pointer;

      &:after {
        opacity: 1.0;
      }
    }

    &::last-child {
      margin-right: 0;
    }
  }



`

export const pageQuery = graphql`
  query TumblerInfiniteQuery {
    site {
      siteMetadata {
        title
      }
    }

    allGoogleSpreadsheetLinksLinks {
      totalCount
      edges {
        node {
          date
          title
          content
        }
      }
    }

    allGoogleSpreadsheetWordsWords {
      totalCount
      edges {
        node {
          date
          word
          definition
        }
      }
    }
  }
`
