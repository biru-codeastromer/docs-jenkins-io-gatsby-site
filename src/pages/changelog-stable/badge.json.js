import React from "react"
import { graphql } from "gatsby"

const LTSBadge = ({ data }) => {
  const latestRelease = data.allLtsYaml.nodes[0]

  return (
    <pre>
      {JSON.stringify({
        schemaVersion: 1,
        label: "Jenkins LTS",
        message: latestRelease.version,
        color: "blue",
        cacheSeconds: 300,
      })}
    </pre>
  )
}

export const query = graphql`
  query {
    allLtsYaml(sort: { version: DESC }, limit: 1) {
      nodes {
        version
      }
    }
  }
`

export default LTSBadge
