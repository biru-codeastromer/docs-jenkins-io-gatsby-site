import React from "react"
import { graphql } from "gatsby"

const Badge = ({ data }) => {
  const latestRelease = data.allWeeklyYaml.nodes[0]

  return (
    <pre>
      {JSON.stringify({
        schemaVersion: 1,
        label: "Jenkins Weekly",
        message: latestRelease.version,
        color: "blue",
        cacheSeconds: 300,
      })}
    </pre>
  )
}

export const query = graphql`
  query {
    allWeeklyYaml(sort: { version: DESC }, limit: 1) {
      nodes {
        version
      }
    }
  }
`

export default Badge
