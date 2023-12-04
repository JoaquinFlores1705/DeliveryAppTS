import { RowDataPacket } from "mysql2"
import AuditFields from "./AuditFields";

export default interface User extends RowDataPacket, AuditFields {
  id: number;
  email:string;
  name:string;
  lastname:string;
  phone:string;
  image:string;
  password:string;
}