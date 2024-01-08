import { codeResponseREST } from "../shared/types/response.types";
import User from "../dto/user/user.dto";
import ResponseGeneric from "../models/response.generic";
import { PassportUse } from "./passport.use";
import { ExtractJwt, Strategy as JwtStr, StrategyOptions } from "passport-jwt";
import userHandle from "../handle/user/user.handle";

export class JwtStrategy{

    async validate(jwt_payload: any, done: any): Promise<User>{
        
        const response: ResponseGeneric =  await userHandle.getUser(jwt_payload);

        if(response.code == codeResponseREST.success){
            return done(null, response.body.data);
        }
        else{
            return done(null, false , {message: response.body.message});
        }
    }

    get use(){
        return PassportUse<
        JwtStr, 
        StrategyOptions, 
        (payload: any, done: any) => Promise<any>>(
            "jwt",
            JwtStr,
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
                secretOrKey: <string>process.env.JWT_SECRET || "token.01010101",
            },
            this.validate
        )
    }
}