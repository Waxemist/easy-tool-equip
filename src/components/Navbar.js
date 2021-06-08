import React from "react"
import Logo from "src/components/Logo"
import { Grid, Container } from "@material-ui/core"

export const Navbar = () => {
  return (
    <Grid container>
      <Container>
        <Grid container justify="flex-start" align="center">
          <Logo />
        </Grid>
      </Container>
    </Grid>
  )
}
