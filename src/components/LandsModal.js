import React from "react"
import {
  makeStyles,
  Grid,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core"
import Asset from "src/components/Asset"

const Loading = () => {
  return (
    <Grid container justify="center">
      <CircularProgress />
    </Grid>
  )
}

const useStyles = makeStyles(() => ({
  dialogContainer: { paddingTop: "24px", paddingBottom: "48px" },
  asset: { marginBottom: "24px" },
}))

export const Modal = ({
  open,
  handleCloseLands,
  lands,
  handleSelectLand,
  loading,
}) => {
  const classes = useStyles()

  const Lands = () => {
    if (loading) return <Loading />

    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={7}>
          {lands.map((value, index) => {
            return (
              <Grid key={index} container item className={classes.asset}>
                <Asset
                  key={index}
                  noMint
                  mode="land"
                  onClick={() => handleSelectLand(value.asset_id)}
                  value={value}
                />
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    )
  }

  return (
    <Dialog
      open={open}
      onClose={handleCloseLands}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <React.Fragment>
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h4" color="primary">
            Select Your Land
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.dialogContainer}>
          <Lands />
        </DialogContent>
      </React.Fragment>
    </Dialog>
  )
}

export default Modal
