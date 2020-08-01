import { ConnectionOptions } from "@odata/server";
import express from "express";
import basicAuth from "express-basic-auth";
import { Server } from "http";
import { createServiceRegistryRouter } from "./server";

export const createServiceRegistryApp = async (connection?: Partial<ConnectionOptions>): Promise<express.Express> => {
  const app = express();

  app.get('/health', req => {
    req.res.json({
      health: true,
      status: 200
    });
  });

  if (process.env.SD_USER && process.env.SD_PASSWORD) {
    console.info('basic auth configured');
    app.use(basicAuth({
      users: {
        [process.env.SD_USER]: process.env.SD_PASSWORD
      }
    }));
  }

  const defaultOpt = {
    name: "sd_registry_conn",
    type: "sqljs",
    synchronize: true
  };

  const opt = Object.assign(defaultOpt, connection);

  app.use("/sd", await createServiceRegistryRouter(opt));

  return app;
};

export const run = async (port = 30009): Promise<Server> => {

  const app = await createServiceRegistryApp();

  const server = app.listen(parseInt(process.env.PORT) || port, () => {
    console.log(`started at port: ${server.address()['port']}`);
  });

  return server;

};

if (require.main == module) {

  run().catch(console.error);

}

