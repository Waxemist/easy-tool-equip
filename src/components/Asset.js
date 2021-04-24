import React from "react"

import {
  Typography,
  Grid,
  Paper,
  makeStyles,
  Checkbox,
} from "@material-ui/core"

const useAssetStyles = makeStyles(theme => ({
  paper: {
    cursor: "pointer",
    border: `1px solid ${theme.palette.primary.main}`,
    "&:hover": {
      border: "1px solid",
      borderColor: theme.palette.secondary.main,
    },
  },
  image: {
    objectFit: "contain",
    maxHeight: "250px",
    marginBottom: "24px",
    width: "100%",
  },
  assetName: {
    textAlign: "center",
  },
}))

export const Asset = ({ value, onClick, isSelected = false }) => {
  const classes = useAssetStyles()

  return (
    <Paper
      onClick={() => {
        onClick(value, isSelected)
      }}
      className={classes.paper}
      elevation={3}
    >
      <Grid container justify="flex-end">
        <Checkbox
          checked={isSelected}
          color="secondary"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
      </Grid>
      <Grid container direction="row" justify="center">
        <img
          className={classes.image}
          src={`https://ipfs.io/ipfs/${value.data.img}`}
        />
        <Typography variant="h6" gutterBottom>
          {value.name}
        </Typography>
        <Grid container justify="center">
          <Typography variant="caption">#{value.template_mint}</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}
