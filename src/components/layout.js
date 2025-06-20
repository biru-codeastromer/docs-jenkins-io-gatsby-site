import * as React from "react"
import { Helmet } from "react-helmet"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Header from "./header"
import Footer from "./footer"

const Layout = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Helmet>
        <html lang="en" />
        <title>Jenkins Documentation</title>
        <meta name="description" content="Jenkins Documentation Site" />
      </Helmet>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "background.default",
        }}
      >
        <Header />
        <Box component="main" sx={{ flexGrow: 1 }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </>
  )
}

export default Layout
