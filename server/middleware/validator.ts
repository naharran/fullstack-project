import { NextFunction, Request, Response } from "express";
import registerSchema from "../validators/register";
import { ValidationError, ObjectSchema } from "joi";
import loginSchema from "../validators/login";

export enum SchemasEnum {
    register = 1,
    login,
}
const schemaDictionary : {[key in SchemasEnum]: ObjectSchema} = {
    [SchemasEnum.register]: registerSchema,
    [SchemasEnum.login]: loginSchema,
}

export default (validator: SchemasEnum) => {
    const schema = schemaDictionary[validator]; 

    return (req: Request, res: Response, next: NextFunction) =>{
        try {
            const body = req.body;
            const validation = schema.validate(body);
            if(validation.error){
                throw(validation.error);
            }
            next();
        }
        catch(error){
            console.log('print error', error)
            res.status(400).json((error as ValidationError)?.details);
        }
    }
}
