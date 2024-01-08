import { IsNotEmpty } from "class-validator";
import UserBase from "./userBase";

export default class UserDTO extends UserBase {
  @IsNotEmpty()
  password!:string;
}