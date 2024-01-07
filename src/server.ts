import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./routes";
import passport from "passport";
import { JwtStrategy } from "./utils/jwt.strategy";
import morgan from "morgan";
import { DataSource } from "typeorm";
import { ConfigServer } from "./config/config";

export default class Server extends ConfigServer {
  constructor(app: Application) {
    super();
    this.config(app);
    new Routes(app);
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: "*"
    };

    console.log(`${__dirname}/../entities/**/*.entity{.ts}`);
    app.use(cors(corsOptions));
    this.passportUse();
    this.dbConnect();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan('dev'));
    app.disable('x-powered-by');
  }

  passportUse(){
    return [new JwtStrategy().use]
  };

  async dbConnect(): Promise<DataSource | void> {
    return this.initConnect
      .then(() => {
        console.log("Connect Success");
      })
      .catch((err) => {
        console.error(err);
      });
  }

}