import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles(theme => ({
  root: {
    background: "#fff",
    borderRadius: 8,
    padding: 0,
  },
  media: {
    height: 240,
    [theme.breakpoints.down("sm")]: {
      height: 200,
    },
    borderRadius: 8,
  },
  text: {
    fontStyle: "normal",
  },
}))

export default function GameCard({ image, label, onClick }) {
  const classes = useStyles()

  return (
    <Grid item xs={12} sm={4}>
      <Card className={classes.root}>
        <CardActionArea onClick={onClick}>
          <CardMedia
            className={classes.media}
            image={image}
            title="Alien Worlds Teleport"
          />
        </CardActionArea>
      </Card>
      <Typography className={classes.text} color="primary" variant="caption">
        {label}
      </Typography>
    </Grid>
  )
}
