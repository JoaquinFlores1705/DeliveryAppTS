import passport, { Strategy } from "passport";

type TypeStategy<T,U,X> = {
    new (params: U, callback: X): T
};

export function PassportUse<T extends Strategy, U, X>(
    name: string, 
    Strategy: TypeStategy<T, U, X>, 
    params: U, 
    callback: X
){
    passport.use(name, new Strategy(params, callback));
}