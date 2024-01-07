import UserDTO from "../../dto/user/user";
import { UserEntity } from "../../entities/user.entity";
import ResponseGeneric from "../../models/response.generic";
import { IGenericService } from "../generic/generic.interface.service";

export interface IUserService<T extends UserEntity, X extends UserDTO> extends IGenericService<T,X,string>{
    getByEmail(id: string): Promise<T | null>;
    getRepeatEmailById(id: string, email:string): Promise<T | null>;
}