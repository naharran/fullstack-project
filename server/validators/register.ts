import joi, { CustomValidator } from 'joi'
import { UserFormData } from '../../shared/types'
import {isUserExists} from '../services/authService';
const isUserExistValidator: CustomValidator = (value, helpers) => {
    if(isUserExists(value)){
       return helpers.error('any.emailExist') 
    }   
    return value
}

export const registerSchema = joi.object<UserFormData, true>({
    email: joi.string().email().custom(isUserExistValidator).required().messages({
        'string.email': 'My custom email error message',
        'any.required': 'Please send an email thanks, Nahar',
        'any.emailExist': 'This user allready exists in the system'
    }),
    firstName: joi.string().min(2).required(),
    lastName: joi.string().min(2).required(),
    password:joi.string().min(5).required(),
})

export default registerSchema;