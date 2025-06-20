import React from "react"
import { graphql } from "gatsby"
import { Box, Typography, Link, Button } from "@mui/material"
import ChangelogLayout from "../../components/changelog/ChangelogLayout"
import ReleaseHeader from "../../components/changelog/ReleaseHeader"
import ChangelogChanges from "../../components/changelog/ChangelogChanges"

const LTSArchivePage = ({ data }) => {
  const releases = data.allLtsYaml.nodes
    .filter(release => release.version <= data.site.siteMetadata.jenkins.stable)
    .slice(25)

  return (
    <ChangelogLayout
      title="Archived LTS Changelog"
      showRatings={false}
      hasRss={false}
      actions={
        <Button
          href="/changelog-stable"
          variant="contained"
          sx={{ textTransform: "none" }}
        >
          Back to Recent LTS Changelog
        </Button>
      }
    >
      <Box sx={{ mb: 4 }}>
        <Typography paragraph>
          This is the changelog archive. The changelog for recent releases can
          be found{" "}
          <Link href="/changelog-stable/">in the main LTS changelog page</Link>.
        </Typography>
      </Box>

      <Box>
        {releases.map(release => (
          <Box key={release.version} sx={{ mb: 4 }}>
            <ReleaseHeader release={release} url="changelog-stable-old" />

            {release.changes && (
              <>
                {release.version.endsWith(".1") && release.lts_baseline && (
                  <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                    Changes since {release.lts_baseline}
                  </Typography>
                )}
                <Box>
                  <ChangelogChanges changes={release.changes} />
                </Box>
              </>
            )}

            {release.lts_changes && (
              <>
                <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                  {release.lts_predecessor
                    ? `Notable changes since ${release.lts_predecessor}`
                    : "Notable changes"}
                </Typography>
                <Box>
                  <ChangelogChanges changes={release.lts_changes} />
                </Box>
              </>
            )}

            {!release.changes && !release.lts_changes && (
              <Typography>No notable changes for this release.</Typography>
            )}
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
          stable
        }
      }
    }
    allLtsYaml(sort: { version: DESC }) {
      nodes {
        version
        date
        banner
        lts_baseline
        lts_predecessor
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
        lts_changes {
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

export default LTSArchivePage
