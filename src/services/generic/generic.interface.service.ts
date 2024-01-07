import {DeleteResult,FindOptionsWhere, ObjectId, UpdateResult } from "typeorm";
import { BaseEntity } from "../../entities/base.entity";
import { BaseDTO } from "../../dto/base.dto";

export interface IGenericService<T extends BaseEntity,Y extends BaseDTO, Z extends string | number | FindOptionsWhere<T> | Date | ObjectId | string[] | number[] | Date[] | ObjectId[]> {
    getById(id: Z): Promise<T | null>; 
    getAll(): Promise<T[]>;
    post(entity: Y): Promise<T>;
    put(id: Z, entity: Y): Promise<UpdateResult>;
    delete(id: Z): Promise<DeleteResult>;
}