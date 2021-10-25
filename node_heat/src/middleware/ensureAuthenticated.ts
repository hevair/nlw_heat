import { Request, Response, NextFunction } from "express";
import { verify,decode } from "jsonwebtoken";

interface IPayload {
    sub: string
}

export function ensureAuthenticated(req: Request, res:Response, next:NextFunction){
    
    const auth = req.headers.authorization


    if(!auth){
        return res.status(401).json({
            error: "token.invalid"
        })
    }

    const [,token] = auth.split(" ")


    try{
        const {sub} = verify(token, process.env.JWT_SECRETE) as IPayload

        req.user_id = sub
        return next()
        
    }catch(error){
        return res.status(401).json({error: "Token.expired"})
    }

}