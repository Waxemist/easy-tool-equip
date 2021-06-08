import React from "react"
import {
  makeStyles,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Grid,
} from "@material-ui/core"

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

export const GameCard = ({ image, label, onClick }) => {
  const classes = useStyles()

  const Image = () => {
    return (
      <Card className={classes.root}>
        <CardActionArea onClick={onClick}>
          <CardMedia
            className={classes.media}
            image={image}
            title="Alien Worlds Teleport"
          />
        </CardActionArea>
      </Card>
    )
  }

  return (
    <Grid item xs={12} sm={4}>
      <Image />
      <Typography className={classes.text} color="primary" variant="caption">
        {label}
      </Typography>
    </Grid>
  )
}

export default GameCard
