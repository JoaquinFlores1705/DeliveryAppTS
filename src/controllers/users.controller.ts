import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle";
import UserRepository from "../repositories/user.repository";
import { ErrorResponseREST } from "../types/response.types";
import ResponseGeneric from "../models/response.generic";

class UserController{
    
    constructor() {
    }

    async createUser({body}: Request, res: Response){
        try{
            const response: ResponseGeneric =  await UserRepository.createUser(body);
            console.log(response);
            res.status(response.code)
            res.send(response.body);
        }catch (e){
            handleHttp(res, `${ErrorResponseREST.POST}USER`, "Ocurrio un error al crear el usuario" ,e);
        }
    }

    async getUser({params}: Request, res: Response){
        try{
            const {id} = params;
            const response: ResponseGeneric =  await UserRepository.getUser(BigInt(id));
            res.status(response.code)
            res.send(response.body);
        }catch (e){
            handleHttp(res, `${ErrorResponseREST.GET}USER`, "Ocurrio un error al consultar el usuario",e);
        }
    }

    async getUsers(req: Request, res: Response){
        try{
            const response: ResponseGeneric =  await UserRepository.getUsers();
            res.status(response.code)
            res.send(response.body);
        }catch (e){
            handleHttp(res, `${ErrorResponseREST.GET}USERS`, "Ocurrio un error al consultar los usuarios",e);
        }
    }

    async updateUser({params, body}: Request, res: Response){
        try{
            const {id} = params;
            const response: ResponseGeneric =  await UserRepository.updateUser(BigInt(id), body);
            res.status(response.code)
            res.send(response.body);
        }catch (e){
            handleHttp(res, `${ErrorResponseREST.PUT}USER`, "Ocurrio un error al actualizar el usuario",e);
        }
    }

    async deleteUser({params}: Request, res: Response){
        try{
            const {id} = params;
            const response: ResponseGeneric =  await UserRepository.deleteUser(BigInt(id));
            res.status(response.code)
            res.send(response.body);
        }catch (e){
            handleHttp(res, `${ErrorResponseREST.DELETE}USER`, "Ocurrio un error al eliminar el usuario",e);
        }
    }
}

export default UserController;