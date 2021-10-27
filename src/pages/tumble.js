
import React, { component, useState, useEffect, useRef } from "react"
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import { CSSGrid, layout, measureItems, makeResponsive } from "react-stonecutter"
import get from 'lodash/get'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Card, CardAttr, CardLink, CardDate} from '../components/Card'
import Bio from '../components/bio'
import Layout from "../components/layout"
import Typography from "../styles/typography"
import GlobalStyles from "../styles/globalstyles"
import Header from "../components/header"


class Tumble extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      links: get(this, 'props.data.allGoogleSpreadsheetLinksLinks.edges').slice(0,20),
      words: get(this, 'props.data.allGoogleSpreadsheetWordsWords.edges').slice(0,20),
      showLinks: true,
      showQuotes: true,
      showWords: true,
      showPics: true,
      showVids: true,
    };
    // console.log(this.props.match.path)
  }

  componentDidMount() {
    this.setState({cards: this.buildCards()})
  }

  quoteEnd(str) {
    var p = new RegExp("(”|\")\\s+\-+\\s*.*$");
    return p.test(str);
  }

  formatDate(date) {
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

  timeSince(date) {

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

  courtesyOf(url, title, type) {

    if (url != undefined) {

      if (type == "link") {

        if (url.indexOf("http") != -1) {
          return "Courtesy of " + url.trim().replace(/.*https?\:\/\//, '').split('/')[0];
        }
        else {
          return "The internet is searchable, so if this quote is unattributed, you should still be able to find it!";
        }
      }
      else if (type == "quote") {
        // console.log(url.substring(0,12));
        // console.log(title.substring(0,12));
        if (url.substring(1,12) === title.substring(1,12)) {
          return "The internet is searchable, so if this quote is unattributed, you should still be able to find it!";
        } else {
          return title;
        }
      }
      else if (type == "img") {
        return title;
      }

    }

    else {
      return url;
    }

  }

  isPic(link) {
    return link.node.content.endsWith(".png") || link.node.content.endsWith(".jpg") || link.node.content.endsWith(".gif");
  }

  isVid(link) {
    return link.node.content.includes("youtube") || link.node.content.includes("youtu.be");
  }

  isLink(link) {
    return link.node.content.trim().startsWith("http://") || link.node.content.trim().startsWith("https://");
  }

  buildCards() {
    var key = 0;

    // console.log("buidling cards..");

    var cards = [];

    cards.push(this.state.links.filter(link => {
      if (link.node.content != undefined) {
        // console.log(this.state.showPics)
        // console.log(this.state.showVids)
        // console.log(this.state.showLinks)
        // console.log(this.state.showQuotes)

        if (this.isPic(link) ) {
          return this.state.showPics;
        }
        else if (this.isVid(link) ) {
          return this.state.showVids;
        }
        else if (this.isLink(link) ) {
          return this.state.showLinks;
        }
        else {
          return this.state.showQuotes;
        }
      }
      return false;
      }).map(link => {

        if (link.node.path !== '/404/') {
          const title = get(link, 'node.title') || link.node.path
          key++;
          link.node.date = link.node.date || "19700101";
          // Do some date function
          // console.log(link.node.date);
          var isoDate = link.node.date;//.slice(0, 4) + "-" + link.node.date.slice(4, 6) + "-" + link.node.date.slice(6,8)
          // console.log(isoDate);
          var formattedDate = Date.parse(isoDate);

          var element
          var type = "link"

          if (link.node.content != undefined) {
            link.node.content = link.node.content.replace("“", "\"").replace("”", "\"")
            if (this.isPic(link)) {
              element = (
                <a href={link.node.content} target="_blank">
                  <img src={link.node.content} style={{
                    float: 'left',
                  }} />
                </a>
              );
              type = "img";
            }
            else if ( this.isVid(link) ) {
              type = "vid";

              element = (
                <div>
                  <h5>{link.node.title}</h5>
                  <iframe width="322" height="180" src={link.node.content.replace("youtube.com/watch?v=", "youtube.com/embed/").replace("youtu.be", "youtube.com/embed")} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
              );
            }
            else if ( this.isLink(link) ) {

              element = (
                <a href={link.node.content} target="_blank">{link.node.title}</a>
              );

            }
            else if (
              (link.node.content.trim().startsWith("\"") && link.node.content.trim().endsWith("\"")) ||
              (link.node.content.trim().startsWith("*") && link.node.content.trim().endsWith("*")) ||
              (link.node.content.trim().startsWith("“") && link.node.content.trim().endsWith("”")) ||
              (link.node.content.trim().startsWith("“") && this.quoteEnd(link.node.content.trim())) ||
              (link.node.content.trim().startsWith("\"") && this.quoteEnd(link.node.content.trim()))
              ) {
              type = "quote";
              element = (
                <div className="quote" style={{marginTop: '5px'}}>{link.node.content}</div>
              );

            }
            else {
              element = (<p dangerouslySetInnerHTML={{ __html: link.node.content }} />);
            }
          }
          else {
            element = (<p dangerouslySetInnerHTML={{ __html: link.node.content }} />);
          }

          let card = <li className={type} key={key} style={{ width:350}}>
              <Card type={type}>

                <CardLink>{element}</CardLink>

                <CardAttr type={type}>
                  <span>{this.courtesyOf(link.node.content, link.node.title, type)}</span>
                </CardAttr>

                <CardDate title={this.formatDate(formattedDate)}>{this.timeSince(formattedDate)} ago</CardDate>
              </Card>

            </li>

          return (
            {date: link.node.date, card: card}
          )
        }
    }))

    cards.push(this.state.words.filter(word => {
        if (word.node.definition != undefined) {
          // console.log(this.state.showPics)
          // console.log(this.state.showVids)
          // console.log(this.state.showLinks)
          // console.log(this.state.showQuotes)
          return this.state.showWords;
        }
        return false;
      }).map(word => {
        key++;

        var element = (
          <div className="word" style={{marginTop: '5px'}}>{word.node.definition}</div>
        );
        var type = "word";
        var isoDate = word.node.date;//.slice(0, 4) + "-" + link.node.date.slice(4, 6) + "-" + link.node.date.slice(6,8)
        // console.log(isoDate);
        var formattedDate = Date.parse(isoDate);


        let card = <li className={type} key={key} style={{ width:350}}>
            <Card type={type}>

              <CardLink><a href={word.node.word.replace(/^/, 'https://www.merriam-webster.com/dictionary/')} target="_blank">{word.node.word}</a></CardLink>

              <CardLink>{element}</CardLink>

              <CardDate title={this.formatDate(formattedDate)}>{this.timeSince(formattedDate)} ago</CardDate>
            </Card>

          </li>

        return (
          {date: word.node.date, card: card}
        )
      })
    )

    // console.log(cards);

    return cards.flat().sort(function(a, b) {
      a = new Date(a.date);
      b = new Date(b.date);
      return a>b ? -1 : a<b ? 1 : 0;
    });

  }

  toggleLinks() {

    this.state.showLinks = true;
    this.state.showPics = false;
    this.state.showQuotes = false;
    this.state.showVids = false;
    this.state.showWords = false;
    console.log(this.state.showLinks)
    this.setState({cards: this.buildCards()})
  }

  togglePics() {

    this.state.showPics = true;
    this.state.showLinks = false;
    this.state.showQuotes = false;
    this.state.showVids = false;
    this.state.showWords = false;
    console.log(this.state.showPics)
    this.setState({cards: this.buildCards()})
  }

  toggleQuotes() {

    this.state.showQuotes = true;
    this.state.showLinks = false;
    this.state.showVids = false;
    this.state.showPics = false;
    this.state.showWords = false;
    console.log(this.state.showQuotes)
    this.setState({cards: this.buildCards()})
  }

  toggleWords() {

    this.state.showWords = true;
    this.state.showQuotes = false;
    this.state.showLinks = false;
    this.state.showVids = false;
    this.state.showPics = false;
    console.log(this.state.showQuotes)
    this.setState({cards: this.buildCards()})
  }

  toggleVids() {

    this.state.showVids = true;
    this.state.showPics = false;
    this.state.showQuotes = false;
    this.state.showLinks = false;
    this.state.showWords = false;
    console.log(this.state.showVids)
    this.setState({cards: this.buildCards()})
  }

  setAll() {
    this.state.showPics = true;
    this.state.showQuotes = true;
    this.state.showLinks = true;
    this.state.showVids = true;
    this.state.showWords = true;
    this.setState({cards: this.buildCards()})
  }


  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')

    this.state.cards = this.buildCards().map(a => a.card);
    // if (Object.keys(this.state.cards).length === 0 && this.state.cards.constructor === Object) {
    //   this.state.cards: this.buildCards()})
    // }

    // console.log("Links: " + this.state.links)
    // console.log("Cards: " + this.state.cards);



    let Grid = makeResponsive(measureItems(CSSGrid), {
      maxWidth: 1920,
      minPadding: 100
    });


    const target = React.createRef();

    return (
        <div className="tumble">
          <GlobalStyles/>
          <Typography />
          <TumbleStyles>
            <Header id="tumbleHeader" target={target} ></Header>
            <div id="tumbleOptions">
              <h4>A list of things I've read or thought about, collated over ten plus years..</h4>
              <nav className="navAnim">
                  <ul>
                      <li className="navanim2"><a href="#links" onClick={() => {this.toggleLinks()}}>Links</a></li>
                      <li className="navanim3"><a href="#quotes" onClick={() => {this.toggleQuotes()}}>Quotes</a></li>
                      <li className="navanim3"><a href="#words" onClick={() => {this.toggleWords()}}>Words</a></li>
                      <li className="navanim4"><a href="#pics" onClick={() => {this.togglePics()}}>Pics</a></li>
                      <li className="navanim5"><a href="#vids" onClick={() => {this.toggleVids()}}>Vids</a></li>
                      <li className="navanim5"><a href="#all" onClick={() => {this.setAll()}}>All</a></li>
                  </ul>
              </nav>
            </div>

            <Grid
              ref={elem => this.grid = elem}
              className="tumbleGrid"
              component="ul"
              columns={3}
              columnWidth={350}
              gutterWidth={6}
              gutterHeight={12}
              layout={layout.pinterest}
              duration={800}
              easing="ease-out"
              >
               {this.state.cards}
            </Grid>
          </TumbleStyles>
        </div>
    )
  }
}

Object.defineProperty(Array.prototype, 'flat', {
  value: function(depth = 1) {
    return this.reduce(function (flat, toFlatten) {
      return flat.concat((Array.isArray(toFlatten) && (depth>1)) ? toFlatten.flat(depth-1) : toFlatten);
    }, []);
  }
});


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
      color: var(--primary);

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
      margin: 0;
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
    list-style: none;
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

export default Tumble

export const pageQuery = graphql`
  query TumbleQuery {
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
