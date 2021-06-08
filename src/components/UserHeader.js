import React from "react"
import { Typography, Grid } from "@material-ui/core"

export const UserHeader = ({ userAccount }) => {
  if (!userAccount) {
    return false
  }

  return (
    <Grid container justify="flex-end">
      <Typography color="secondary" gutterBottom>
        Welcome: {userAccount}
      </Typography>
    </Grid>
  )
}

export default UserHeader
