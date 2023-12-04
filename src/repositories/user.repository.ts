import ResponseGeneric from "../models/response.generic";
import User from "../models/user";
import { ResponseREST, codeResponseREST } from "../types/response.types";
import RepositoryGeneric from "./generic.repository";
import { IUserRepository } from "./user.interface.repository";

class UserRepository extends RepositoryGeneric<User> implements IUserRepository<User> { 

    /**
     *
     */
    constructor() {
        super("users");
    }

    async createUser(entity: User): Promise<ResponseGeneric>{

        let code: codeResponseREST = codeResponseREST.success;
        let data: User | string;
        let message: ResponseREST = ResponseREST.POST_SUCCESS;
        const {email} = entity;
        let getRepeatEmail:User[] = await this.getAll(`email = '${email}'`);

        if(getRepeatEmail.length > 0){
            code = codeResponseREST.duplicate;
            message = ResponseREST.DUPLICATE;
            data = `Email: ${email} ya existe en la base de datos`;
        }else{
            data = await this.save(entity);
        }

        return new Promise((resolve, reject) => {
            resolve ({
                code,
                body: {
                    message,
                    data
                }
            });
        });
    }

    async updateUser(entity: User): Promise<ResponseGeneric>{

        let code: codeResponseREST = codeResponseREST.success;
        let data: User | string | undefined;
        let message: ResponseREST = ResponseREST.PUT_SUCCESS;
        const {id, email} = entity;
        const userModified: User | undefined = await this.getById(id);
        let getRepeatEmail:User[] = await this.getAll(`email = '${email}' AND id != ${id}`);

        if(!userModified){
            code = codeResponseREST.notFound;
            message = ResponseREST.NOT_FOUND;
            data = `No existe un usuario con ID: ${id}`;
        }else if(getRepeatEmail.length > 0){
            code = codeResponseREST.duplicate;
            message = ResponseREST.DUPLICATE;
            data = `Email: ${email} ya existe en la base de datos`;
        }else{
            const response = await this.update(entity);
            data = await this.getById(id);
        }

        return new Promise((resolve, reject) => {
            resolve ({
                code,
                body: {
                    message,
                    data
                }
            });
        });
    }

    async getUser(id: number | string): Promise<ResponseGeneric>{
        let code: codeResponseREST = codeResponseREST.success;
        let data: User | string;
        let message: ResponseREST = ResponseREST.GET_SUCCESS;

        const response = await this.getById(id);

        if(response == undefined){
            code = codeResponseREST.notFound;
            message = ResponseREST.NOT_FOUND;
            data = `No se ha encontrado el item: ${id}`;
        }else{
            data = response;
        }
        
        return new Promise((resolve, reject) => {
            resolve ({
                code,
                body: {
                    message,
                    data
                }
            });
        });
    }

    async getUsers(where: string = "", order:string = "") : Promise<ResponseGeneric>{
        let code: codeResponseREST = codeResponseREST.success;
        let message: ResponseREST = ResponseREST.GET_SUCCESS;

        const data: User[] = await this.getAll(where,order);

        return new Promise((resolve, reject) => {
            resolve ({
                code,
                body: {
                    message,
                    data
                }
            });
        });
    }

    async deleteUser(id: number | string): Promise<ResponseGeneric>{
        let code: codeResponseREST = codeResponseREST.success;
        let message: ResponseREST = ResponseREST.DELETE_SUCCESS;
        let data: string;

        const response: number = await this.delete(id);

        if(response == 0){
            code = codeResponseREST.notFound;
            message = ResponseREST.NOT_FOUND;
            data = `No se ha encontrado el item: ${id}`;
        }else{
            data = `Eliminado el item: ${id}`;
        }

        return new Promise((resolve, reject) => {
            resolve ({
                code,
                body: {
                    message,
                    data
                }
            });
        });
    }

}

export default new UserRepository();