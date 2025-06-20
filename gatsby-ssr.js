import React from "react"
import { ThemeProvider } from "@mui/material/styles"
import { theme } from "./src/theme"
import Layout from "./src/components/layout"

export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: "en" })
}

export const wrapPageElement = ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>{element}</Layout>
    </ThemeProvider>
  )
}
