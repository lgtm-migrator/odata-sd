import { Server } from "http";
import { createServiceRegistryApp } from "./entry";


const ready = (server: Server): Promise<number> => {
  return new Promise(resolve => {
    server.on('listening', () => {
      resolve(server.address()['port']);
    });
  });
};

const shutdown = (server: Server) => {
  return new Promise(resolve => {
    server.close(resolve);
  });
};


describe('Entry Test Suite', () => {

  it('should support join/remove from service provider', async () => {

    const s1 = await createServiceRegistryApp({ name: "entry_test_conn_1" });
    const server = s1.listen(0);
    const p1 = await ready(server);

    await shutdown(server);
  });

});


