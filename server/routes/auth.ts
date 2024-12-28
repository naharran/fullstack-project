
import express, {Router, Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { isUserExists, saveNewUser } from '../services/authService';
import jwt from 'jsonwebtoken';
import {LoginCardentials, User, UserFormData} from '../../shared/types';
import { AuthTokenData } from '../types/types';
import AWS from 'aws-sdk';
import validator, { SchemasEnum } from '../middleware/validator'
import { validateLogin } from '../middleware/registerValidator';
const router = Router();


router.post('/register', validator(SchemasEnum.register) , async(req: Request<{}, {}, UserFormData>, res: Response) : Promise<any>=>{
    const {email, password, firstName, lastName} = req.body;

    try{
        const hashedPaswword = await bcrypt.hash(password, 10);
        const newUserDetails: UserFormData = {
            email, password: hashedPaswword, firstName, lastName
        }
        const user = saveNewUser(newUserDetails);
        return res.status(201).json({ message: 'User registered successfully' });

    }
  catch (error) {
    console.error('Error saving user:', error);
    return res.status(500).json(error);
  }

})

router.post('/login', validateLogin , async(req: Request<{}, {}, LoginCardentials>, res: Response) : Promise<any> => {
    const {email} = req.body;

    const validUser = isUserExists(email); //from the db

    const authTokenData: AuthTokenData = {userEmail: validUser?.email || '', userId: validUser?.id || ''}
    const newJwt = jwt.sign(authTokenData, process.env.SECRET_KEY as string);
    
    res.cookie('myauthcookie', newJwt, {maxAge: 3600000, secure: false})
    res.status(200).end('Login Succesfully');

})

router.use('/',(req, res)=>{
    res.status(200).end('im in the /auth route')
})

export default router;