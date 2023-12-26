import ResponseGeneric from "../models/response.generic";

export interface IUserRepository<User> {
    createUser(entity: User): Promise<ResponseGeneric>;
    updateUser(id: bigint, entity: User): Promise<ResponseGeneric>;
    getUser(id: bigint | string): Promise<ResponseGeneric>;
    getUsers(): Promise<ResponseGeneric>;
    deleteUser(id: bigint | string): Promise<ResponseGeneric>;
}