import React from "react"
import { graphql } from "gatsby"
import { Box, Typography, Link, Button } from "@mui/material"
import ChangelogLayout from "../../components/changelog/ChangelogLayout"
import ReleaseHeader from "../../components/changelog/ReleaseHeader"
import ChangelogChanges from "../../components/changelog/ChangelogChanges"

const WeeklyArchivePage = ({ data }) => {
  const releases = data.allWeeklyYaml.nodes
    .filter(release => release.version <= data.site.siteMetadata.jenkins.latest)
    .slice(30)

  return (
    <ChangelogLayout
      title="Weekly Changelog Archive"
      showRatings={false}
      hasRss={false}
      actions={
        <Button
          href="/changelog"
          variant="contained"
          sx={{ textTransform: "none" }}
        >
          Back to Recent Changelog
        </Button>
      }
    >
      <Box sx={{ mb: 4 }}>
        <Typography paragraph>
          This is the changelog archive. Recent changelogs can be found{" "}
          <Link href="/changelog/">here</Link>.
        </Typography>
      </Box>

      <Box>
        {releases.map(release => (
          <Box key={release.version} sx={{ mb: 4 }}>
            <ReleaseHeader release={release} />
            <Box>
              <ChangelogChanges changes={release.changes} />
            </Box>
          </Box>
        ))}
      </Box>
    </ChangelogLayout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        jenkins {
          latest
        }
      }
    }
    allWeeklyYaml(sort: { version: DESC }) {
      nodes {
        version
        date
        banner
        changes {
          type
          message
          issue
          pull
          url
          title
          references {
            issue
            pull
            url
            title
          }
        }
      }
    }
  }
`

export default WeeklyArchivePage
