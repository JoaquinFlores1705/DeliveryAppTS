import { JwtFromRequestFunction } from "passport-jwt";

export default interface HeaderOptions {
    jwtFromRequest: JwtFromRequestFunction;
    secretOrKey:string;
  }