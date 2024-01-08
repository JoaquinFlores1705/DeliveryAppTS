import { UserEntity } from "../../entities/user.entity";
import { IUserService } from "./user.interface.service";
import UserDTO from "../../dto/user/user.dto";
import { BaseService } from "../base.service";
import { DeleteResult, UpdateResult } from "typeorm";

class UserService extends BaseService<UserEntity> implements IUserService<UserEntity,UserDTO> { 

    constructor() {
        super(UserEntity);
      }

      async getById(id: string): Promise<UserEntity | null>{
        return (await this.execRepository).findOneBy({ id });
      }

      async getAll(): Promise<UserEntity[]>{
        return (await this.execRepository).find();
      }

      async post(body: UserDTO): Promise<UserEntity>{
        const newUser = (await this.execRepository).create(body);
        return (await this.execRepository).save(newUser);
      }

      async put(id: string, infoUpdate: UserDTO): Promise<UpdateResult> {
        const updateUser = (await this.execRepository).create(infoUpdate);
        return (await this.execRepository).update(id, updateUser);
      }

      async delete(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });
      }

      async getByEmail(email: string): Promise<UserEntity | null>{
        return (await this.execRepository).findOneBy({ email });
      }

      async getRepeatEmailById(id:string, email: string): Promise<UserEntity | null>{
        return (await this.execRepository)
        .createQueryBuilder("user")
        .where("user.email = :email", {
            email
        })
        .andWhere("user.id != :id", {
            id
        })
        .getOne();
      }
}

export default UserService;