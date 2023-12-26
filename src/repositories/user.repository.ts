import ResponseGeneric from "../models/response.generic";
import User from "../models/user";
import { ResponseREST, codeResponseREST } from "../types/response.types";
import { IUserRepository } from "./user.interface.repository";
import { prisma } from "../config/db";

class UserRepository implements IUserRepository<User> { 

    async createUser(entity: User): Promise<ResponseGeneric>{

        let code: codeResponseREST = codeResponseREST.success;
        let data: User | string;
        let message: ResponseREST = ResponseREST.POST_SUCCESS;
        const {email} = entity;

        const getRepeatEmail:User | null = await prisma.user.findUnique({
            where: {
                email,
            }
        });

        if(getRepeatEmail){
            code = codeResponseREST.duplicate;
            message = ResponseREST.DUPLICATE;
            data = `Email: ${email} ya existe en la base de datos`;
        }else{
            data = await prisma.user.create({
                data: entity
            });
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

    async updateUser(id: bigint, entity: User): Promise<ResponseGeneric>{

        let code: codeResponseREST = codeResponseREST.success;
        let data: User | string | undefined;
        let message: ResponseREST = ResponseREST.PUT_SUCCESS;
        const {email} = entity;
        const userModified: User | null = await prisma.user.findUnique({
            where: {
                id,
            }
        });
        let getRepeatEmail:User | null = await prisma.user.findUnique({
            where: {
                email,
                NOT:{
                    id
                }
            }
        });

        if(!userModified){
            code = codeResponseREST.notFound;
            message = ResponseREST.NOT_FOUND;
            data = `No existe un usuario con ID: ${id}`;
        }else if(getRepeatEmail){
            code = codeResponseREST.duplicate;
            message = ResponseREST.DUPLICATE;
            data = `Email: ${email} ya existe en la base de datos`;
        }else{
            data = await prisma.user.update({
                where: {
                    id
                },
                data: entity
            });
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

    async getUser(id: bigint): Promise<ResponseGeneric>{
        let code: codeResponseREST = codeResponseREST.success;
        let data: User | string;
        let message: ResponseREST = ResponseREST.GET_SUCCESS;

        const response = await prisma.user.findUnique({
            where: {
                id,
            }
        });

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
                body: {
                    message,
                    data
                }
            });
        });
    }

    async getUsers() : Promise<ResponseGeneric>{
        let code: codeResponseREST = codeResponseREST.success;
        let message: ResponseREST = ResponseREST.GET_SUCCESS;

        const data: User[] = await prisma.user.findMany();

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

    async deleteUser(id: bigint): Promise<ResponseGeneric>{
        let code: codeResponseREST = codeResponseREST.success;
        let message: ResponseREST = ResponseREST.DELETE_SUCCESS;
        let data: string;

        const response: User | null = await prisma.user.delete({
            where: {
                id,
            }
        });

        if(!response){
            code = codeResponseREST.notFound;
            message = ResponseREST.NOT_FOUND;
            data = `No se ha encontrado el item: ${id}`;
        }else{
            data = `Eliminado el item: ${response.id}`;
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