module.exports = {
  siteMetadata: {
    title: "Kanonical",
    description: "Hi, I'm Greg.  Occasionally, I do things.",
    author: "",
    siteUrl: "http://www.kanonical.io",
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-101072268-1`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography",
      },
    },
    {
      resolve: "gatsby-plugin-sitemap"
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: 'UA-101072268-1',
      }
    },
    {
    resolve: 'gatsby-source-google-spreadsheets',
      options: {
        spreadsheetId: '1xyxBcVq5TehTu3mW1lL8N0lhTEr0eUUvnH9b16raj8w',
        worksheetTitle: 'links',
        credentials: require('./src/client_secret.json')
      }
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-postcss`,
  ],
}
