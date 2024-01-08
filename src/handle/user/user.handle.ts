import { UserEntity } from "../../entities/user.entity";
import ResponseGeneric from "../../models/response.generic";
import User from "../../dto/user/user.dto";
import { ResponseREST, codeResponseREST } from "../../shared/types/response.types";
import bcrypt from "bcryptjs";
import UserDTO from "../../dto/user/user.dto";
import { IUserHandle } from "./user.handle.interface";
import UserService from "../../services/user/user.service";
import { DeleteResult, UpdateResult } from "typeorm";
import { generateToken } from "../../utils/jwt.handle";
import UserSession from "../../dto/user/userSession";

class UserHandle implements IUserHandle<User> { 

    constructor(
        private readonly _userService: UserService = new UserService()
    ) {}

    async createUser(entity: UserDTO): Promise<ResponseGeneric>{

        let code: codeResponseREST = codeResponseREST.success;
        let data: User | string;
        let message: ResponseREST = ResponseREST.POST_SUCCESS;
        const {email} = entity;
        entity.password = await bcrypt.hash(entity.password,10);

        const getRepeatEmail:UserEntity | null = await this._userService.getByEmail(email);
        console.log(email);
        console.log(getRepeatEmail);
        if(getRepeatEmail){
            code = codeResponseREST.duplicate;
            message = ResponseREST.DUPLICATE;
            data = `Email: ${email} ya existe en la base de datos`;
        }else{
            data = await this._userService.post(entity);
        }

        return new Promise((resolve, reject) => {
            resolve ({
                code,
                message,
                body: {
                    data
                }
            });
        });
    }

    async updateUser(id: string, entity: UserDTO): Promise<ResponseGeneric>{

        let code: codeResponseREST = codeResponseREST.success;
        let data: UserEntity | string | undefined;
        let message: ResponseREST = ResponseREST.PUT_SUCCESS;
        const {email} = entity;
        const userModified: UserEntity | null = await this._userService.getById(id);
        let resultUpdate: UpdateResult;
        entity.password = await bcrypt.hash(entity.password,10);
        let getRepeatEmail:UserEntity | null = await this._userService.getRepeatEmailById(id, email);

        if(!userModified){
            code = codeResponseREST.notFound;
            message = ResponseREST.NOT_FOUND;
            data = `No existe un usuario con ID: ${id}`;
        }else if(getRepeatEmail){
            code = codeResponseREST.duplicate;
            message = ResponseREST.DUPLICATE;
            data = `Email: ${email} ya existe en la base de datos`;
        }else{
            resultUpdate = await this._userService.put(id, entity);
            if(!resultUpdate.affected){
                code = codeResponseREST.error;
                message = ResponseREST.PUT_FAIL;
                data = "Ocurrio un error al actualizar el usuario";
            }else{
                data = entity
            }
        }

        

        return new Promise((resolve, reject) => {
            resolve ({
                code,
                message,
                body: {
                    data
                }
            });
        });
    }

    async getUser(id: string): Promise<ResponseGeneric>{
        let code: codeResponseREST = codeResponseREST.success;
        let data: UserEntity | string;
        let message: ResponseREST = ResponseREST.GET_SUCCESS;

        const response = await this._userService.getById(id);

        if(!response){
            code = codeResponseREST.notFound;
            message = ResponseREST.NOT_FOUND;
            data = `No se ha encontrado el item: ${id}`;
        }else{
            data = response;
        }
        
        return new Promise((resolve, reject) => {
            resolve ({
                code,
                message,
                body: {
                    data
                }
            });
        });
    }

    async getUserByEmail(email: string): Promise<ResponseGeneric>{
        let code: codeResponseREST = codeResponseREST.success;
        let data: UserEntity | string;
        let message: ResponseREST = ResponseREST.GET_SUCCESS;

        const response = await this._userService.getByEmail(email);

        if(!response){
            code = codeResponseREST.notFound;
            message = ResponseREST.NOT_FOUND;
            data = `No se ha encontrado el usuario con email: ${email}`;
        }else{
            data = response;
        }
        
        return new Promise((resolve, reject) => {
            resolve ({
                code,
                message,
                body: {
                    data
                }
            });
        });
    }

    async getUsers() : Promise<ResponseGeneric>{
        let code: codeResponseREST = codeResponseREST.success;
        let message: ResponseREST = ResponseREST.GET_SUCCESS;
        const data: User[] = await this._userService.getAll();

        return new Promise((resolve, reject) => {
            resolve ({
                code,
                message,
                body: {
                    data
                }
            });
        });
    }

    async deleteUser(id: string): Promise<ResponseGeneric>{
        let code: codeResponseREST = codeResponseREST.success;
        let message: ResponseREST = ResponseREST.DELETE_SUCCESS;
        let data: string;

        const response: DeleteResult = await this._userService.delete(id);

        if(!response.affected){
            code = codeResponseREST.notFound;
            message = ResponseREST.NOT_FOUND;
            data = `No se ha encontrado el item: ${id}`;
        }else{
            data = `Eliminado el item: ${id}`;
        }

        return new Promise((resolve, reject) => {
            resolve ({
                code,
                message,
                body: {
                    data
                }
            });
        });
    }

    async login(entity: UserDTO) : Promise<ResponseGeneric>{
        
        const {email, password} = entity;
        
        const userEmail = await this._userService.getByEmail(email);

        const isPasswordValid : boolean = await bcrypt.compare(entity.password, userEmail?.password ?? "");
        
        return new Promise((resolve, reject) => {
            resolve (this.ResponseLogin(entity, userEmail, isPasswordValid));
        }); 
    }

    private ResponseLogin(userGet: UserDTO, userEmail : UserEntity | null, isPasswordValid : boolean): ResponseGeneric{
        let code: codeResponseREST = codeResponseREST.success;
        let message: ResponseREST = ResponseREST.GET_SUCCESS;
        let data: UserSession | string;
        let response: ResponseGeneric;

        if(userEmail == null){
            code = codeResponseREST.notAuthorized;
            message = ResponseREST.NOT_AUTHORIZED;
            data = "Contrasena o usuario incorrecto";
            response = {
                code,
                message,
                body: data
            };
            return response;
        }

        if(!isPasswordValid){
            code = codeResponseREST.notAuthorized;
            message = ResponseREST.NOT_AUTHORIZED;
            data = "Contrasena o usuario incorrecto";
            response = {
                code,
                message,
                body: data
            };
            return response;
        }

        const token = generateToken(userGet.id, userGet.email);

        data = {
            ...userGet,
            session_token: `JWT ${token}`
        };

        response = {
            code,
            message,
            body: data
        };
        return response;
    }
}

export default new UserHandle();