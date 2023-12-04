import { Response } from "express";
import { ErrorResponseREST, codeResponseREST } from "../types/response.types";

const handleHttp = (res: Response, errorCode: string, errorMessage: string, errorRaw?: any) => {
    res.status(codeResponseREST.error);
    res.send({
        code: errorCode,
        message: errorMessage
    });
    console.log(errorRaw);
};

export {handleHttp}