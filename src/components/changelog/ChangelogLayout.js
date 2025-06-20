import React from "react"
import { Box, Typography, Button, useTheme } from "@mui/material"
import { Helmet } from "react-helmet"
import { Link as GatsbyLink } from "gatsby"
import RssIcon from "@mui/icons-material/RssFeed"

const ChangelogLayout = ({ title, children, showRatings, hasRss, actions }) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        maxWidth: "85vw",
        width: "100%",
        mx: "auto",
        p: 3,
        minHeight: "80vh",
        fontFamily: theme.typography.fontFamily,
        "@media screen and (max-width: 768px)": {
          paddingTop: "2rem",
          paddingBottom: "2rem",
        },
      }}
    >
      <Helmet>
        <title>{title} - Jenkins</title>
      </Helmet>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginBottom: "2rem",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
          <Typography
            variant="h1"
            sx={{
              fontFamily: '"Georgia", serif',
              fontWeight: "bold",
              fontSize: "2rem",
              color: theme.palette.jenkins.text,
              marginBottom: 0,
            }}
          >
            {title}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {actions}
          {hasRss && (
            <Button
              component={GatsbyLink}
              to="rss.xml"
              variant="text"
              startIcon={<RssIcon />}
              sx={{
                color: theme.palette.jenkins.textSecondary,
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              RSS
            </Button>
          )}
        </Box>
      </Box>

      {children}
    </Box>
  )
}

export default ChangelogLayout
