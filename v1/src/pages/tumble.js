
import React, {component} from 'react'
import Link from 'gatsby-link'
import { CSSGrid, layout, measureItems, makeResponsive } from "react-stonecutter"
import get from 'lodash/get'
import Helmet from 'react-helmet'

import {Card, CardAttr, CardLink, CardDate} from '../components/Card'
import Bio from '../components/Bio'
import Layout from "../components/layout"

class Tumble extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      links: get(this, 'props.data.allGoogleSheetLinksRow.edges'),
      words: get(this, 'props.data.allGoogleSheetWordsRow.edges'),
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

    return (
      <Layout>
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

        </div>
      </Layout>
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

    allGoogleSheetWordsRow {
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
