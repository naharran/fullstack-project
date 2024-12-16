
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthTokenData } from '../types/types';


export const authenticateToken = async(req: Request,res: Response, next : NextFunction): Promise<any> =>{

    const token = req.cookies.myauthcookie;
    const secretKey = process.env.SECRET_KEY as string;
    if(!token){
        return res.status(401).end('Missing authentication token');
    }
    try {
        const user = jwt.verify(token, secretKey) as AuthTokenData;
        req.user = user
        next();
    }
    catch(err){
        return res.status(401).end('Invalid cardentials');
    }
}


