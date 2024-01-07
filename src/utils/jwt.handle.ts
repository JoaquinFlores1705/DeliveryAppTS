import {sign, verify} from "jsonwebtoken";

const JWT_SECRET = <string>process.env.JWT_SECRET || "token.01010101";

const generateToken = (id:string, email:string) =>{
    const jwt = sign({id, email}, JWT_SECRET, {
        expiresIn: "2h"
    });
    return jwt;
}

const verifyToken = (jwt:string) => {
    const isOk = verify(jwt, JWT_SECRET);
    return isOk;
}

export {generateToken, verifyToken}