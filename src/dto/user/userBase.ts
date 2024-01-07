import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { BaseDTO } from "../base.dto";

export default class UserBase extends BaseDTO {
    @IsEmail()  
    @IsNotEmpty()
    email!:string;
    @IsNotEmpty()
    name!:string;
    @IsNotEmpty()
    lastname!:string;
    @IsNotEmpty()
    phone!:string;
    @IsOptional()
    image!:string;
  }