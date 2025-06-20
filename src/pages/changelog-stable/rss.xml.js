import React from "react"
import { graphql } from "gatsby"
import RSS from "rss"
import { Helmet } from "react-helmet"

const LTSRSSFeed = ({ data }) => {
  const feed = new RSS({
    title: "Jenkins LTS Changelog",
    description: "Changelog for Jenkins LTS releases",
    feed_url: "https://jenkins.io/changelog-stable/rss.xml",
    site_url: "https://jenkins.io/changelog-stable",
    language: "en",
  })

  data.allLtsYaml.nodes.slice(0, 25).forEach(release => {
    feed.item({
      title: `Jenkins ${release.version}`,
      description: release.changes.items.join("\n"),
      url: `https://jenkins.io/changelog-stable/#v${release.version}`,
      date: new Date(release.date),
    })
  })

  return null
}

export const query = graphql`
  query {
    allLtsYaml(sort: { version: DESC }) {
      nodes {
        version
        date
        changes {
          message
        }
      }
    }
  }
`

export const Head = ({ data }) => {
  const feed = new RSS({
    title: "Jenkins LTS Changelog",
    description: "Changelog for Jenkins LTS releases",
    feed_url: "https://jenkins.io/changelog-stable/rss.xml",
    site_url: "https://jenkins.io/changelog-stable",
    language: "en",
  })

  data.allLtsYaml.nodes.slice(0, 25).forEach(release => {
    feed.item({
      title: `Jenkins ${release.version}`,
      description: release.changes.items.join("\n"),
      url: `https://jenkins.io/changelog-stable/#v${release.version}`,
      date: new Date(release.date),
    })
  })

  return (
    <Helmet>
      <link
        rel="alternate"
        type="application/rss+xml"
        href="/changelog-stable/rss.xml"
      />
    </Helmet>
  )
}

export default LTSRSSFeed
