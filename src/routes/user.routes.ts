import {Router} from "express";
import UserController from "../controllers/users.controller";


class UserRoutes {
    router = Router();
    controller = new UserController();
  
    constructor() {
      this.intializeRoutes();
    }
  
    intializeRoutes() {
        this.router.get('/', this.controller.getUsers);
        this.router.get('/login', this.controller.login);
        this.router.get('/:id', this.controller.getUser);
        this.router.post('/', this.controller.createUser);
        this.router.put('/:id', this.controller.updateUser);
        this.router.delete('/:id', this.controller.deleteUser);
    }
  }
  
  export default new UserRoutes().router;