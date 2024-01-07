import { DataSource } from "typeorm";
import { db } from "./db";

export abstract class ConfigServer {
  get initConnect(): Promise<DataSource> {
    return db.initialize();
  }
}