import { RowDataPacket } from "mysql2"

export default interface User extends RowDataPacket {
  id: number;
  email:string;
  name:string;
  lastname:string;
  phone:string;
  image:string;
  password:string;
  created_at:Date;
  updated_at:Date
}