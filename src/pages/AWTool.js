import React from "react"
import { Button } from "waxemist-ui"
import { Typography, Grid } from "@material-ui/core"
import { wax, getAssets } from "src/utils/wax"
import { UserHeader } from "src/components/UserHeader"
import { MainLayout } from "src/layout"
import { AssetActionList } from "src/components/AssetActionList"

const AWTool = () => {
  const [userAssets, setUserAssets] = React.useState([])

  const handleLogin = async () => {
    await wax.login()
    await fetchTools()
  }

  const fetchTools = async () => {
    try {
      const assets = await getAssets(
        wax.userAccount,
        "alien.worlds",
        "tool.worlds"
      )
      setUserAssets(assets)
    } catch (err) {
      console.log(err)
    }
  }

  React.useState(() => {
    if (!wax.userAccount) {
      setUserAssets([])
    } else {
      fetchTools()
    }
  }, [wax.userAccount])

  const Login = () => {
    if (wax.userAccount) {
      return false
    }

    return (
      <Grid container justify="center" align="center" spacing={4}>
        <Grid item xs={12} container justify="center">
          <Button action={handleLogin}>Login Wax Cloud</Button>
        </Grid>
      </Grid>
    )
  }

  return (
    <MainLayout>
      <Grid
        container
        style={{
          minHeight: "90vh",
          paddingBottom: "246px",
          paddingTop: "80px",
        }}
        direction="column"
        justify="center"
        align="center"
      >
        <Grid container justify="center">
          <Typography variant="h2" style={{ color: "#fff" }} gutterBottom>
            Easy AW Tool Equip
          </Typography>
        </Grid>
        <UserHeader userAccount={wax.userAccount} />
        <Login />
        {wax.userAccount && (
          <Grid
            style={{ marginTop: "24px", paddingBottom: "128px" }}
            container
            spacing={4}
          >
            <Grid container justify="center">
              <Typography
                style={{ marginBottom: "44px" }}
                variant="h5"
                color="secondary"
                gutterBottom
              >
                Choose up to 3 tools
              </Typography>
            </Grid>
            <AssetActionList
              fabActionLabel={"Change Tools"}
              mode="setbag"
              userAccount={wax.userAccount}
              userAssets={userAssets}
              selectLimit={3}
            />
          </Grid>
        )}
      </Grid>
    </MainLayout>
  )
}

export default AWTool
