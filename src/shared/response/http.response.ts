import { Response } from "express";
import ResponseGeneric from "../../models/response.generic";
import { codeResponseREST } from "../types/response.types";

class HttpResponse {

  Process(res: Response, response: ResponseGeneric): Response {
    return res.status(response.code).json({
      status: response.code,
      statusMsg: response.message,
      data: response.body,
    });
  }

  Error(res: Response, errorCode: string, errorMessage: string, errorRaw?: any) {
        res.status(codeResponseREST.error);
        res.send({
            code: errorCode,
            message: errorMessage
        });
        console.log(errorRaw);
  }

}

export default new HttpResponse();