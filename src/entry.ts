import express from "express";
import basicAuth from "express-basic-auth";
import { createServiceRegistryRouter } from "./server";

const run = async () => {

  const app = express()

  app.get('/health', req => {
    req.res.json({
      health: true,
      status: 200
    })
  })

  if (process.env.SD_USER && process.env.SD_PASSWORD) {
    console.info('basic auth configured')
    app.use(basicAuth({
      users: {
        [process.env.SD_USER]: process.env.SD_PASSWORD
      }
    }))
  }

  app.use("/sd", await createServiceRegistryRouter({
    name: "sd_registry_conn", type: "sqljs", logger: 'debug'
  }))

  const listener = app.listen(parseInt(process.env.PORT) || 30009, () => {
    console.log(`started at port: ${listener.address()['port']}`)
  })

}

if (require.main == module) {

  run().catch(console.error)

}

