import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import UserDTO from "../dto/user/user.dto";
import httpResponse from "../shared/response/http.response";
import { ErrorResponseREST } from "../shared/types/response.types";

class UserMiddleware{

  userValidator(req: Request, res: Response, next: NextFunction) {
    const { name, lastname, email, password, phone, image } =
      req.body;

    const valid = new UserDTO();

    valid.name = name;
    valid.lastname = lastname;
    valid.email = email;
    valid.password = password;
    valid.phone = phone;
    valid.image = image;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return httpResponse.Error(res, `${ErrorResponseREST.POST}USER`,"Error de validacion de usuario" ,err);
      } else {
        next();
      }
    });
  }
}

export default new UserMiddleware();