import UserDTO from "../../dto/user/user.dto";
import ResponseGeneric from "../../models/response.generic";

export interface IUserHandle<T extends UserDTO> {
    createUser(entity: T): Promise<ResponseGeneric>;
    updateUser(id: string, entity: T): Promise<ResponseGeneric>;
    getUser(id: string): Promise<ResponseGeneric>;
    getUsers(): Promise<ResponseGeneric>;
    deleteUser(id: string): Promise<ResponseGeneric>;
}