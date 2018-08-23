
import React, {component} from 'react'
import Link from 'gatsby-link'
import StackGrid from "react-stack-grid"
import get from 'lodash/get'
import Helmet from 'react-helmet'

import {Card, CardAttr, CardLink, CardDate} from '../components/Card'
import Bio from '../components/Bio'

class Tumble extends React.Component {

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
        console.log(url.substring(0,12));
        console.log(title.substring(0,12));
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

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const links = get(this, 'props.data.allGoogleSheetLinksRow.edges')

    return (
      <div width="100%">
        <Helmet title={get(this, 'props.data.site.siteMetadata.title')} />

        <StackGrid
          columnWidth={300}
          appearDelay={100}
          duration={260}
          gutterWidth={20}
          gutterHeight={20}
          style={{marginTop: '60px'}}>
        {links.map(link => {
          if (link.node.path !== '/404/') {
            const title = get(link, 'node.title') || link.node.path

            link.node.date = link.node.date || "19700101";
            // Do some date function
            // console.log(link.node.date);
            var isoDate = link.node.date;//.slice(0, 4) + "-" + link.node.date.slice(4, 6) + "-" + link.node.date.slice(6,8)
            // console.log(isoDate);
            var formattedDate = Date.parse(isoDate);

            var element
            var type = "link"
            if (link.node.content != undefined) {

              if (link.node.content.endsWith(".png") || link.node.content.endsWith(".jpg") || link.node.content.endsWith(".gif")) {
                element = (
                  <a href={link.node.content} target="_blank">
                    <img src={link.node.content} style={{
                      float: 'left',
                    }} />
                  </a>
                );
                type = "img";
              }
              else if ( link.node.content.trim().startsWith("http://") || link.node.content.trim().startsWith("https://")) {

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
                  <h3 style={{marginTop: '5px'}}>{link.node.content}</h3>
                );

              }
              else {
                element = (<p dangerouslySetInnerHTML={{ __html: link.node.content }} />);
              }
            }
            else {
              element = (<p dangerouslySetInnerHTML={{ __html: link.node.content }} />);
            }

            return (

              <Card type={type} key={link.node.path}>

                <CardLink>{element}</CardLink>

                <CardAttr type={type}>
                  <span>{this.courtesyOf(link.node.content, link.node.title, type)}</span>
                </CardAttr>

                <CardDate title={this.formatDate(formattedDate)}>{this.timeSince(formattedDate)} ago</CardDate>
              </Card>


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
