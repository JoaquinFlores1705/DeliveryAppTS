import { RowDataPacket } from "mysql2";
import { IGenericRepository } from "./generic.interface.repository";
import ResponseGeneric from "../models/response.generic";

export interface IUserRepository<T extends RowDataPacket> extends IGenericRepository<T> {
    createUser(entity: T): Promise<ResponseGeneric>;
    updateUser(entity: T): Promise<ResponseGeneric>;
    getUser(id: number | string): Promise<ResponseGeneric>;
    getUsers(where?: string, order?:string): Promise<ResponseGeneric>;
    deleteUser(id: number | string): Promise<ResponseGeneric>;
}