import { RowDataPacket } from "mysql2";

export interface IGenericRepository<T extends RowDataPacket> {
    save(entity: T): Promise<T>;
    getAll(where?: string, order?:string): Promise<T[]>;
    getById(id: number | string): Promise<T | undefined>;
    update(entity: T): Promise<number>;
    delete(id: number | string): Promise<number>;
  }