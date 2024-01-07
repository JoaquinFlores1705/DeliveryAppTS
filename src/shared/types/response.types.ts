enum ErrorResponseREST {
    GET = "ERROR_GET_",
    POST = "ERROR_POST_",
    PUT = "ERROR_PUT_",
    DELETE = "ERROR_DELETE_"
  };

enum ResponseREST{
    POST_SUCCESS = "POST OK",
    GET_SUCCESS = "GET OK",
    PUT_SUCCESS = "UPDATE OK",
    PUT_FAIL = "UPDATE FAIL",
    DELETE_SUCCESS = "DELETE OK",
    NOT_FOUND = "NOT FOUND",
    DUPLICATE = "DUPLICATE",
    NOT_AUTHORIZED = "UNAUTHORIZED",
  }

enum codeResponseREST{
    success= 200,
    duplicate=403,
    notFound=404,
    notAuthorized=401,
    error=500
}

export {ErrorResponseREST, ResponseREST, codeResponseREST}