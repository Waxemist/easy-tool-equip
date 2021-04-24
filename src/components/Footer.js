import React from "react"
import { Grid, Container, makeStyles } from "@material-ui/core"
import { Logo } from "src/components/Logo"
import { FaDiscord, FaTwitter, FaGithub } from "react-icons/fa"

const useStyles = makeStyles(theme => ({
  container: {
    position: "absolute",
    bottom: "0%",
    background: "#18153d",
    height: "200px",
    width: "100vw",
    paddingTop: "36px",
  },
  icon: {
    color: "#fff",
    marginTop: "12px",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
}))

export const Footer = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      <Container>
        <Grid container justify="space-between">
          <Grid item xs={12} md={6} container></Grid>
          <Grid item xs={12} md={6} container justify="flex-end" spacing={2}>
            <Grid container justify="flex-end">
              <Grid item>
                <Logo simple />
              </Grid>
            </Grid>
            <Grid item>
              <a href="https://discord.gg/UfHCfgnBHt">
                <FaDiscord className={classes.icon} size={30} />
              </a>
            </Grid>
            <Grid item>
              <a href="https://twitter.com/waxemist">
                <FaTwitter className={classes.icon} size={30} />
              </a>
            </Grid>
            <Grid item>
              <a href="https://github.com/Waxemist">
                <FaGithub className={classes.icon} size={30} />
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}
