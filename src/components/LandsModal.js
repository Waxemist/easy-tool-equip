import React from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import { makeStyles, Grid, CircularProgress } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import { Asset } from "src/components/Asset"

const LoadingModal = () => {
  return (
    <Grid container justify="center">
      <CircularProgress />
    </Grid>
  )
}

const useStyles = makeStyles(theme => ({
  dialogContainer: { paddingTop: "24px", paddingBottom: "48px" },
  asset: { marginBottom: "24px" },
}))

export default function AlertDialog({
  open,
  handleCloseLands,
  lands,
  handleSelectLand,
  loading,
}) {
  const classes = useStyles()

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
          {loading ? (
            <LoadingModal />
          ) : (
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
          )}
        </DialogContent>
      </React.Fragment>
    </Dialog>
  )
}
