/* eslint-disable prettier/prettier */
// ES6 import
import { ExplorerApi, RpcApi } from "atomicassets"
import * as waxjs from "@waxio/waxjs/dist"

const api = new ExplorerApi("https://wax.api.atomicassets.io", "atomicassets", {
  fetch,
})

const wax = new waxjs.WaxJS("https://wax.greymass.com", null, null, false)

const getAssets = async (owner, collection_name = "alien.worlds", schema) => {
  const assets = await api.getAssets({owner: owner, collection_name: collection_name, schema_name: schema})
  return assets
}

const setBag = async items => {
  
  try {
    const result = await wax.api.transact({
      actions: [{
        account: 'm.federation',
        name: 'setbag',
        authorization: [{
          actor: wax.userAccount,
          permission: "active",
        }],
        data: {
          account: wax.userAccount,
          items: items
        },
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 1200,
    });
    return result
  } catch(err) {
    console.log(err)
  }

}

const setLand = async landId => {
  try {
    const result = await wax.api.transact({
      actions: [{
        account: 'm.federation',
        name: 'setland',
        authorization: [{
          actor: wax.userAccount,
          permission: "active",
        }],
        data: {
          account: wax.userAccount,
          land_id: landId
        },
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 1200,
    });
    return result
  } catch(err) {
    throw err
  }

}

const getAsset = async (id) => {
  try {
    const asset = await api.getAsset(id)
    return asset
  }
  catch(err) {
    throw err
  }
}



export { getAssets, getAsset, wax, setBag, setLand }
