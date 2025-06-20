import React from "react"
import { graphql } from "gatsby"
import { Box, Typography, Link, Button } from "@mui/material"
import ChangelogLayout from "../../components/changelog/ChangelogLayout"
import ReleaseHeader from "../../components/changelog/ReleaseHeader"
import ChangelogChanges from "../../components/changelog/ChangelogChanges"

const LTSChangelogPage = ({ data }) => {
  const releases = data.allLtsYaml.nodes
    .filter(release => release.version <= data.site.siteMetadata.jenkins.stable)
    .slice(0, 25)

  const actions = (
    <Button
      href="/doc/upgrade-guide"
      variant="contained"
      sx={{ textTransform: "none" }}
    >
      Upgrade Guide
    </Button>
  )

  return (
    <ChangelogLayout
      title="LTS Changelog"
      showRatings={true}
      hasRss={true}
      actions={actions}
    >
      <Box>
        {releases.map(release => (
          <Box key={release.version} sx={{ mb: 4 }}>
            <ReleaseHeader release={release} url="changelog-stable" />

            {release.changes && release.lts_changes && release.lts_baseline && (
              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                Changes since {release.lts_baseline}
              </Typography>
            )}

            {release.changes && (
              <Box>
                <ChangelogChanges changes={release.changes} />
              </Box>
            )}

            {release.changes && release.lts_changes && (
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
          The changelog of historical releases can be found{" "}
          <Link href="/changelog-stable-old/">
            in the LTS changelog archive
          </Link>
          .
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

export default LTSChangelogPage
