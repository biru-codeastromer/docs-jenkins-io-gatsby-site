import React from "react"
import { graphql } from "gatsby"
import { Box, Typography, Link } from "@mui/material"
import ChangelogLayout from "../../components/changelog/ChangelogLayout"
import ReleaseHeader from "../../components/changelog/ReleaseHeader"
import ChangelogChanges from "../../components/changelog/ChangelogChanges"

const WeeklyChangelogPage = ({ data }) => {
  const releases = data.allWeeklyYaml.nodes
    .filter(
      release =>
        release.version &&
        release.version <= data.site.siteMetadata.jenkins.latest
    )
    .slice(0, 30)

  if (releases.length === 0) {
    return (
      <ChangelogLayout
        title="Weekly Changelog"
        showRatings={true}
        hasRss={true}
      >
        <Typography color="error">No weekly releases found</Typography>
        <Typography>
          Please check that weekly.yml exists in src/data/changelogs/ and
          contains valid YAML content
        </Typography>
      </ChangelogLayout>
    )
  }

  return (
    <ChangelogLayout title="Weekly Changelog" showRatings={true} hasRss={true}>
      <Box>
        {releases.map(release => (
          <Box key={release.version} sx={{ mb: 4 }}>
            <ReleaseHeader
              release={{
                ...release,
                date: release.date || "Date not available",
              }}
              url="changelog"
            />
            <Box>
              <ChangelogChanges changes={release.changes} />
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          backgroundColor: "background.paper",
          p: 3,
          borderRadius: 1,
          mt: 4,
        }}
      >
        <Typography>
          Changelogs of historical releases can be found{" "}
          <Link href="/changelog-old/">in the changelog archive</Link>.
        </Typography>
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

export default WeeklyChangelogPage
