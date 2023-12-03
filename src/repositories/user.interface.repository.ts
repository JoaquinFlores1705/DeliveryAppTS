import { RowDataPacket } from "mysql2";
import { IGenericRepository } from "./crud.interface";

export interface IUserRepository<T extends RowDataPacket> extends IGenericRepository<T> {

}