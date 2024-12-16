import joi, { CustomValidator } from 'joi'
import {LoginCardentials} from '../../shared/types'
import { isUserExists } from '../services/authService'
import bcrypt from 'bcrypt';

const isUserExistValidator: CustomValidator = (value, helpers) => {
    if(!isUserExists(value)){
       return helpers.error('any.emailNotExist') 
    }   
    return value
}

const passwordMatchValidator: CustomValidator<LoginCardentials> = (value, helpers) => {
    const hashedPassword = isUserExists(value.email)?.password;
    const isValidPassword = bcrypt.compareSync(value.password, hashedPassword as string);
    if(!isValidPassword){
        return helpers.error('any.passwordNotMatch') 
     }   
     return value

}

const loginSchema = joi.object<LoginCardentials, true>({
        email: joi.string().email().custom(isUserExistValidator).required(),
        password: joi.string().min(5).required()
}).custom(passwordMatchValidator)

export default loginSchema