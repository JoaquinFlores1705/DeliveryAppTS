import User from "../models/user";
import RepositoryGeneric from "./repositoryGeneric";
import { IUserRepository } from "./user.interface.repository";

class UserRepository extends RepositoryGeneric<User> { 

    /**
     *
     */
    constructor() {
        super("users");
    }

}

export default new UserRepository();