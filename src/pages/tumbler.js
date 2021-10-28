
import React, { component, useState, useEffect, useRef } from "react"
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import { CSSGrid, layout, measureItems, makeResponsive } from "react-stonecutter"
import get from 'lodash/get'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import moment from 'moment'
import {Card, CardAttr, CardLink, CardDate} from '../components/card'
import Bio from '../components/bio'
import Layout from "../components/layout"


const Tumbler = ({data}) => {

    const links =  data.allGoogleSpreadsheetLinksLinks.edges
    const words =  data.allGoogleSpreadsheetWordsWords.edges
    const siteTitle = data.site.siteMetadata.title

    const all = links.concat(words).sort( (a, b) => { return (b.node.date).localeCompare(a.node.date) });


    const courtesyOf = (url, title, type) => {

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


    const quoteEnd = (str) => {
        var p = new RegExp("(”|\")\\s+\-+\\s*.*$");
        return p.test(str);
    }


    const isPic = (link) => {
        return link.node.content.endsWith(".png") || link.node.content.endsWith(".jpg") || link.node.content.endsWith(".gif");
    }

    const isVid = (link) => {
        return link.node.content.includes("youtube") || link.node.content.includes("youtu.be");
    }

    const isLink = (link) => {
        return link.node.content.trim().startsWith("http://") || link.node.content.trim().startsWith("https://");
    }

    const buildCards = (items, siteTitle) => {
        var key = 0;

        var cards = [];

        cards.push(items.filter(item => {
            if (item.node.content == undefined && item.node.definition == undefined) {
                return false;
            }
            return true;
        }).map(item => {
            if (item.node.content != undefined) {
                if (item.node.path !== '/404/') {
                    const title = get(item, 'node.title') || item.node.path
                    key++;
                    item.node.date = item.node.date || "19700101";
                    // Do some date function
                    // console.log(item.node.date);
                    var isoDate = item.node.date;//.slice(0, 4) + "-" + item.node.date.slice(4, 6) + "-" + item.node.date.slice(6,8)
                    // console.log(isoDate);
                    var formattedDate = Date.parse(isoDate);

                    var element
                    var type = "item"

                    if (item.node.content != undefined) {
                      item.node.content = item.node.content.replace("“", "\"").replace("”", "\"")
                      if (isPic(item)) {
                        element = (
                          <a href={item.node.content} target="_blank">
                            <img src={item.node.content} style={{
                              float: 'left',
                            }} />
                          </a>
                        );
                        type = "img";
                      }
                      else if ( isVid(item) ) {
                        type = "vid";

                        element = (
                          <div>
                            <h5>{item.node.title}</h5>
                            <iframe width="322" height="180" src={item.node.content.replace("youtube.com/watch?v=", "youtube.com/embed/").replace("youtu.be", "youtube.com/embed")} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                          </div>
                        );
                      }
                      else if ( isLink(item) ) {

                        element = (
                          <a href={item.node.content} target="_blank">{item.node.title}</a>
                        );

                      }
                      else if (
                        (item.node.content.trim().startsWith("\"") && item.node.content.trim().endsWith("\"")) ||
                        (item.node.content.trim().startsWith("*") && item.node.content.trim().endsWith("*")) ||
                        (item.node.content.trim().startsWith("“") && item.node.content.trim().endsWith("”")) ||
                        (item.node.content.trim().startsWith("“") && quoteEnd(item.node.content.trim())) ||
                        (item.node.content.trim().startsWith("\"") && quoteEnd(item.node.content.trim()))
                        ) {
                        type = "quote";
                        element = (
                          <div className="quote" style={{marginTop: '5px'}}>{item.node.content}</div>
                        );

                      }
                      else {
                        element = (<p dangerouslySetInnerHTML={{ __html: item.node.content }} />);
                      }
                    }
                    else {
                      element = (<p dangerouslySetInnerHTML={{ __html: item.node.content }} />);
                    }

                    let card = <li className={type} key={key} style={{ width:350}}>
                        <Card type={type}>

                          <CardLink>{element}</CardLink>

                          <CardAttr type={type}>
                            <span>{courtesyOf(item.node.content, item.node.title, type)}</span>
                          </CardAttr>

                          <CardDate title={moment(formattedDate).fromNow()}>{moment(formattedDate).fromNow()}</CardDate>
                        </Card>

                      </li>

                    return (
                      {date: item.node.date, card: card}
                    )
                  }

            }
            else {
                key++;

                var element = (
                  <div className="word" style={{marginTop: '5px'}}>{item.node.definition}</div>
                );
                var type = "word";
                var isoDate = item.node.date;//.slice(0, 4) + "-" + item.node.date.slice(4, 6) + "-" + item.node.date.slice(6,8)
                // console.log(isoDate);
                var formattedDate = Date.parse(isoDate);


                let card = <li className={type} key={key} style={{ width:350}}>
                    <Card type={type}>

                      <CardLink><a href={item.node.word.replace(/^/, 'https://www.merriam-webster.com/dictionary/')} target="_blank">{item.node.word}</a></CardLink>

                      <CardLink>{element}</CardLink>

                      <CardDate title={moment(formattedDate).fromNow()}>{moment(formattedDate).fromNow()}</CardDate>
                    </Card>

                  </li>

                return (
                  {date: item.node.date, card: card}
                )


            }

        }))


        return cards.flat();

      }

    let Grid = makeResponsive(measureItems(CSSGrid), {
      maxWidth: 1920,
      minPadding: 100
    });


    return (

        <div className="tumble" width="90%">

        <header id="header">
          <h1 id="hdr" style={{display: 'flex', color: 'rgba(250, 250, 248, 0.9)'}}>
            <Link
              style={{ float: 'left', marginLeft: '3rem', paddingBottom: '8px', marginBottom: '-16px', textDecoration: 'none !important' }}
              to='/'>
              Kanonical
            </Link>
          </h1>
          <h2>A list of things I've read or thought about,</h2><h2 style={{marginTop: '-1rem'}}>collated over ten plus years..</h2>

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
        </header>

        <Grid
        //   ref={elem => this.grid = elem}
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
           {buildCards(all, siteTitle).map(a => a.card)}
        </Grid>
      </div>

    )


}

export default Tumbler


export const pageQuery = graphql`
  query TumblerQuery {
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
