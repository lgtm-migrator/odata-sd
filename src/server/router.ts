// @ts-nocheck
import { createTypedODataServer } from "@odata/server";
import { Router } from "express";
import { ConnectionOptions } from "typeorm";
import { ServiceRegistryEntities } from "../models";


/**
 * create service registry router
 * 
 * @param conn connection options
 */
export const createServiceRegistryRouter = async (conn: Partial<ConnectionOptions>): Promise<Router> => {
  conn.entities = ServiceRegistryEntities
  const s = await createTypedODataServer(conn, ...ServiceRegistryEntities)
  return s.create();
};

