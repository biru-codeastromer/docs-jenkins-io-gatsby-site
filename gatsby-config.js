module.exports = {
  siteMetadata: {
    title: `Jenkins Documentation`,
    description: `Jenkins Documentation Site`,
    author: `@jenkinsci`,
    siteUrl: `https://your-site-url.com`,
    jenkins: {
      latest: "2.514",
      stable: "2.504.2",
    },
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-json`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/changelogs`,
        name: `changelogs`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages/download/data`,
        name: `downloadData`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/roadmap`,
        name: `roadmap`,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Jenkins Documentation`,
        short_name: `Jenkins`,
        start_url: `/`,
        background_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/images/jenkins-icon.png`,
      },
    },
  ],
}
