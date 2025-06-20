import React from "react"
import { graphql } from "gatsby"
import RSS from "rss"
import { Helmet } from "react-helmet"

const WeeklyRSSFeed = ({ data }) => {
  const feed = new RSS({
    title: "Jenkins Weekly Changelog",
    description: "Changelog for Jenkins weekly releases",
    feed_url: "https://jenkins.io/changelog/rss.xml",
    site_url: "https://jenkins.io/changelog",
    language: "en",
  })

  data.allWeeklyYaml.nodes
    .filter(release => release.date) // Only include releases with dates
    .slice(0, 30)
    .forEach(release => {
      feed.item({
        title: `Jenkins ${release.version}`,
        description: release.changes.map(c => c.message).join("\n"),
        url: `https://jenkins.io/changelog/#v${release.version}`,
        date: new Date(release.date),
      })
    })

  return null
}

export const query = graphql`
  query {
    allWeeklyYaml(sort: { version: DESC }) {
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
    title: "Jenkins Weekly Changelog",
    description: "Changelog for Jenkins weekly releases",
    feed_url: "https://jenkins.io/changelog/rss.xml",
    site_url: "https://jenkins.io/changelog",
    language: "en",
  })

  data.allWeeklyYaml.nodes
    .filter(release => release.date) // Only include releases with dates
    .slice(0, 30)
    .forEach(release => {
      const changesText = release.changes
        .map(change => change.message)
        .join("\n")

      feed.item({
        title: `Jenkins ${release.version}`,
        description: changesText,
        url: `https://jenkins.io/changelog/#v${release.version}`,
        date: new Date(release.date),
      })
    })

  return (
    <Helmet>
      <link
        rel="alternate"
        type="application/rss+xml"
        href="/changelog/rss.xml"
      />
    </Helmet>
  )
}

export default WeeklyRSSFeed
