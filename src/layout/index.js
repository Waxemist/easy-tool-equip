import React from "react"
import { ThemeProvider, Layout } from "waxemist-ui"
import { Grid } from "@material-ui/core"
import { Navbar } from "src/components/Navbar"
import { useHistory } from "react-router-dom"
import { Footer } from "src/components/Footer"

export const MainLayout = ({ children }) => {
  const history = useHistory()
  return (
    <ThemeProvider lightMode>
      <div style={{ position: "relative" }}>
        <Layout
          topbarChildren={
            <Grid onClick={() => history.push("/")} container>
              <Navbar />
            </Grid>
          }
        >
          {children}
        </Layout>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
