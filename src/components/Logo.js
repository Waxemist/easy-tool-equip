import React from "react"
import logo from "src/logo.png"
import { Typography, Grid, makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  img: {
    [theme.breakpoints.up("md")]: {
      width: "55px",
      height: "55px",
      objectFit: "cover",
    },
    [theme.breakpoints.up("xs")]: {
      width: "55px",
      height: "55px",
      objectFit: "cover",
    },
  },
  text: { marginTop: "12px", color: "#fff", userSelect: "none" },
}))

export const Logo = () => {
  const classes = useStyles()
  return (
    <Grid item container style={{ cursor: "pointer" }}>
      <img className={classes.img} src={logo} />
      <Typography color="primary" variant="h4" className={classes.text}>
        Waxemist
      </Typography>
    </Grid>
  )
}
