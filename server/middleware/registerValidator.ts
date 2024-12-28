import { NextFunction, Response } from "express";
import registerSchema from "../validators/login";

export const validateLogin = (req: Request, res: Response, next: NextFunction) =>{
    const body = req.body

    try {
        const validation = registerSchema.validate(body)
        if(validation.error){
            throw(validation.error)
        }
        next();
    }
    catch(error){
        return res.status(404).end('validation error');
    }
} 