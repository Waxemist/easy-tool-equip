import React from "react"
import "src/App.css"
import { Button } from "waxemist-ui"
import { Typography, Grid } from "@material-ui/core"
import { wax, getAssets } from "src/utils/wax"
import { UserHeader } from "src/components/UserHeader"
import { MainLayout } from "src/layout"
import { AssetActionList } from "src/components/AssetActionList"

const App = () => {
  const [userAccount, setUserAccount] = React.useState()
  const [userAssets, setUserAssets] = React.useState([])

  const handleLogin = async () => {
    const acc = await wax.login()
    const assets = await getAssets(acc, "alien.worlds", "tool.worlds")
    setUserAssets(assets)
    setUserAccount(acc)
  }

  React.useState(() => {
    if (!wax.userAccount) {
      setUserAccount()
      setUserAssets([])
    }
  }, [wax.userAccount])

  const Login = () => {
    if (userAccount) {
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
        style={{ minHeight: "60vh", paddingBottom: "246px" }}
        direction="column"
        justify="center"
        align="center"
      >
        <Grid container justify="center">
          <Typography variant="h2" style={{ color: "#fff" }} gutterBottom>
            Easy AW Tool Equip
          </Typography>
        </Grid>
        <UserHeader userAccount={userAccount} />
        <Login />
        {userAccount && (
          <Grid style={{ marginTop: "36px" }} container spacing={4}>
            <Grid container justify="center">
              <Typography variant="h5" color="secondary" gutterBottom>
                Choose up to 3 tools{" "}
              </Typography>
            </Grid>
            <AssetActionList
              fabActionLabel={"Change Tools"}
              mode="setbag"
              userAccount={userAccount}
              userAssets={userAssets}
              selectLimit={3}
            />
          </Grid>
        )}
      </Grid>
    </MainLayout>
  )
}

export default App