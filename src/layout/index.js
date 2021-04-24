import React from "react"
import { ThemeProvider, Layout } from "waxemist-ui"
import { Grid } from "@material-ui/core"
import { Navbar } from "src/components/Navbar"
import { Footer } from "src/components/Footer"

export const MainLayout = ({ children }) => {
  return (
    <ThemeProvider lightMode>
      <div style={{ position: "relative" }}>
        <Layout topbarChildren={<Navbar />}>{children}</Layout>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
