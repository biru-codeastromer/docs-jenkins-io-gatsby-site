import React from "react"
import { ThemeProvider } from "@mui/material/styles"
import { theme } from "./src/theme"
import Layout from "./src/components/layout"
import "./src/styles/global.css"
import "./src/styles/changelog.css"

export const wrapPageElement = ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>{element}</Layout>
    </ThemeProvider>
  )
}
