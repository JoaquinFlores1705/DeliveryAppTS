import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import UserBase from "./userBase";

export default class UserSession extends UserBase {
  @IsOptional()
  session_token!:string;
}