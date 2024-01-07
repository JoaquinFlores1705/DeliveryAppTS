import { Request, Response } from "express"
import { ErrorResponseREST } from "../shared/types/response.types";
import ResponseGeneric from "../models/response.generic";
import UserHandle from "../handle/user/user.handle";
import httpResponse from "../shared/response/http.response";
class UserController{

    async createUser({body}: Request, res: Response){
        try{
            const response: ResponseGeneric =  await UserHandle.createUser(body);
            return httpResponse.Process(res, response);
        }catch (e){
            httpResponse.Error(res, `${ErrorResponseREST.POST}USER`, "Ocurrio un error al crear el usuario" ,e);
        }
    }

    async getUser({params}: Request, res: Response){
        try{
            const {id} = params;
            const response: ResponseGeneric =  await UserHandle.getUser(id);
            return httpResponse.Process(res, response);
        }catch (e){
            httpResponse.Error(res, `${ErrorResponseREST.POST}USER`, "Ocurrio un error al crear el usuario" ,e);
        }
    }

    async getUsers(req: Request, res: Response){
        try{
            const response: ResponseGeneric =  await UserHandle.getUsers();
            return httpResponse.Process(res, response);
        }catch (e){
            httpResponse.Error(res, `${ErrorResponseREST.POST}USER`, "Ocurrio un error al crear el usuario" ,e);
        }
    }

    async updateUser({params, body}: Request, res: Response){
        try{
            const {id} = params;
            const response: ResponseGeneric =  await UserHandle.updateUser(id, body);
            return httpResponse.Process(res, response);
        }catch (e){
            httpResponse.Error(res, `${ErrorResponseREST.POST}USER`, "Ocurrio un error al crear el usuario" ,e);
        }
    }

    async deleteUser({params}: Request, res: Response){
        try{
            const {id} = params;
            const response: ResponseGeneric =  await UserHandle.deleteUser(id);
            return httpResponse.Process(res, response);
        }catch (e){
            httpResponse.Error(res, `${ErrorResponseREST.POST}USER`, "Ocurrio un error al crear el usuario" ,e);
        }
    }

    async login({body}: Request, res: Response){
        try{
            const response: ResponseGeneric =  await UserHandle.login(body);
            return httpResponse.Process(res, response);
        }catch (e){
            httpResponse.Error(res, `${ErrorResponseREST.POST}USER`, "Ocurrio un error al crear el usuario" ,e);
        }
    }
}

export default UserController;