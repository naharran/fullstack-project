import { NextFunction, Request, Response } from "express";
import registerSchema from "../schemas/register";
import { ValidationError, ObjectSchema } from "joi";
import loginSchema from "../schemas/login";
import {artworkSchema, artworkEditSchema} from "../schemas/artwork";

export enum SchemasEnum {
    register = 1,
    login,
    artwork,
    artworkEdit
}
const schemaDictionary : {[key in SchemasEnum]: ObjectSchema} = {
    [SchemasEnum.register]: registerSchema,
    [SchemasEnum.login]: loginSchema,
    [SchemasEnum.artwork]: artworkSchema,
    [SchemasEnum.artworkEdit]: artworkEditSchema,
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
