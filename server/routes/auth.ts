
import express, {Router, Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { saveNewUser } from '../services/authService';
import jwt from 'jsonwebtoken';
import {LoginCardentials, UserFormData} from '../../shared/types';
import validator, { SchemasEnum } from '../middleware/validator'
import { authenticate } from '../middleware/auth';
const router = Router();


router.post('/register', validator(SchemasEnum.register) ,async(req: Request<{}, {}, UserFormData>, res: Response) : Promise<any>=>{
    const {email, password, firstName, lastName} = req.body;
    try{
        const hashedPaswword = await bcrypt.hash(password, 10);
        const newUserDetails: UserFormData = {
            email, password: hashedPaswword, firstName, lastName
        }
        const user = await saveNewUser(newUserDetails);
        console.log(user)
        return res.status(201).json({ message: 'User registered successfully' });

    }
  catch (error) {
    console.error('Error saving user:', error);
    return res.status(500).json(error);
  }

})

router.post('/login', validator(SchemasEnum.login), authenticate, async(req: Request<{}, {}, LoginCardentials>, res: Response) : Promise<any> => {
    //@ts-ignore
    const authTokenData = req.user as User;
    const newJwt = jwt.sign(authTokenData, process.env.SECRET_KEY as string);
    
    res.cookie('myauthcookie', newJwt, {maxAge: 3600000, secure: false})
    res.status(200).end('Login Succesfully');

})

router.use('/',(req, res)=>{
    res.status(200).end('im in the /auth route')
})

export default router;