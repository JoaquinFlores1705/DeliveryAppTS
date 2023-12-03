import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle";
import UserRepository from "../repositories/user.repository";

class UserController{
    
    constructor() {
    }

    async createUser({body}: Request, res: Response){
        try{
            const response =  await UserRepository.save(body);
            res.send(response);
        }catch (e){
            handleHttp(res, 'ERROR_POSTITEM',e);
        }
    }

    async getUser({params}: Request, res: Response){
        try{
            const {id} = params;
            const response = await UserRepository.getById(id);
            const data = response !== undefined ? response : 'NOT_FOUND';
            res.send(data);
        }catch (e){
            handleHttp(res, 'ERROR_GETITEM',e);
        }
    }

    async getUsers(req: Request, res: Response){
        try{
            const response = await UserRepository.getAll();
            res.send(response);
        }catch (e){
            handleHttp(res, 'ERROR_GETITEMs',e);
        }
    }

    async updateUser({body}: Request, res: Response){
        try{
            const response = await UserRepository.update(body);
            const message = response > 0 ? "UPDATE_OK" : "UPDATE_NOT_OK"
            res.send({message});
        }catch (e){
            handleHttp(res, 'ERROR_UPDATEITEM',e);
        }
    }

    async deleteUser({params}: Request, res: Response){
        try{
            const {id} = params;
            const response = await UserRepository.delete(id);
            const message = response > 0 ? "DELETE_OK" : "DELETE_NOT_OK"
            res.send({message});
        }catch (e){
            handleHttp(res, 'ERROR_DELETEITEM',e);
        }
    }
}

export default UserController;