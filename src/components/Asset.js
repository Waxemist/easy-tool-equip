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

export const Asset = ({ value, onClick, isSelected = false, noMint, mode }) => {
  const classes = useAssetStyles()
  return (
    <Paper
      onClick={() => {
        onClick && onClick(value, isSelected)
      }}
      className={classes.paper}
      elevation={3}
    >
      <Grid container justify="flex-end" style={{ height: "50px" }}>
        {onClick && (
          <Checkbox
            checked={isSelected}
            color="secondary"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        )}
      </Grid>
      <Grid container direction="row" justify="center">
        <img
          className={classes.image}
          src={
            value
              ? `https://ipfs.io/ipfs/${value.data.img}`
              : "https://ipfs.atomichub.io/ipfs/QmaUNXHeeFvMGD4vPCC3vpGTr77tJvBHjh1ndUm4J7o4tP"
          }
        />
        {mode === "land" && value && !onClick && (
          <Grid container justify="center">
            <Grid item xs={12}>
              <Typography variant="caption">
                Comission: {parseFloat(value?.data?.commission) / 100}%
              </Typography>
            </Grid>
          </Grid>
        )}
        <Typography variant="h6" gutterBottom>
          {value?.name}
        </Typography>
        <Grid container justify="center" style={{ height: "30px" }}>
          {mode === "land" && value && (
            <Grid container justify="center">
              <Grid item>
                <Typography variant="caption">
                  {value?.data?.x}:{value?.data?.y}
                </Typography>
              </Grid>
            </Grid>
          )}
          {!noMint && (
            <Typography variant="caption">#{value?.template_mint}</Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  )
}
