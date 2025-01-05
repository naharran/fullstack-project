
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../shared/types';
import AWS from 'aws-sdk';
import bcrypt from 'bcrypt';
import { AttributeMap } from 'aws-sdk/clients/dynamodb';


export const authenticate = async(req: Request<any>,res: Response, next : NextFunction): Promise<any> =>{
        const {email, password} = req.body;
        const dynamoDB = new AWS.DynamoDB.DocumentClient();
        try{
            const { Item} = await dynamoDB.get({
                TableName:'Users',
                Key:{ email }
            }).promise()
            
            if(!Item){
                throw('Email does not exist')
            }
            const hashedPaswword = Item?.password;
            const isValidPassword =  await bcrypt.compare(password, hashedPaswword);
            if(!isValidPassword){
                throw('Invalid password');
            }
            const {password: userPassword, ...rest} = Item as User;
            if(rest){
                //@ts-ignore
                 req?.user = rest;
            }
            next();
        }
        catch(error){
            if(error === 'Invalid password'){
                return res.status(401).end('Invalid password')
            }
            return res.status(500).end(error)
        }
       
}

export const authenticateToken = async(req: Request<any>,res: Response, next : NextFunction): Promise<any> =>{

    const token = req.cookies.myauthcookie;
    const secretKey = process.env.SECRET_KEY as string;
    if(!token){
        return res.status(401).end('Missing authentication token');
    }
    try {
        const user = jwt.verify(token, secretKey) as User;
        if(user){
            //@ts-ignore
            req.user = user;
        }
        next();
    }
    catch(err){
        return res.status(401).end('Invalid cardentials');
    }
}


