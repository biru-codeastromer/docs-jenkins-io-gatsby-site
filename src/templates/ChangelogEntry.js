import React from "react"
import { graphql } from "gatsby"
import { Box, Typography, Button } from "@mui/material"
import ChangelogLayout from "../components/changelog/ChangelogLayout"
import ReleaseHeader from "../components/changelog/ReleaseHeader"
import ChangelogChanges from "../components/changelog/ChangelogChanges"

const ChangelogEntryTemplate = ({ data, pageContext }) => {
  const release = pageContext.type === "stable" ? data.ltsYaml : data.weeklyYaml
  const isStable = pageContext.type === "stable"

  if (!release) {
    return <div>Release data not found</div>
  }

  return (
    <ChangelogLayout
      title={`Changelog for ${release.version}`}
      showRatings={true}
      hasRss={false}
    >
      <Box>
        <ReleaseHeader
          release={release}
          url={isStable ? "changelog-stable" : "changelog"}
          entry
        />

        {isStable && (
          <Button
            href={`/doc/upgrade-guide/${release.version
              .split(".")
              .slice(0, 2)
              .join(".")}#upgrading-to-jenkins-lts-${release.version.replace(
              /\./g,
              "-"
            )}`}
            variant="contained"
            sx={{ mb: 3, textTransform: "none" }}
          >
            Looking to upgrade?
          </Button>
        )}

        {release.changes && release.lts_changes && release.lts_baseline && (
          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
            Changes since {release.lts_baseline}
          </Typography>
        )}

        <Box sx={{ mb: 3 }}>
          <ChangelogChanges changes={release.changes} />
        </Box>

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
    </ChangelogLayout>
  )
}

export const query = graphql`
  query ($version: String!) {
    weeklyYaml: weeklyYaml(version: { eq: $version }) {
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
    ltsYaml: ltsYaml(version: { eq: $version }) {
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
`

export default ChangelogEntryTemplate
