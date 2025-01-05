import joi from 'joi'
import { UserFormData } from '../../shared/types'

export const registerSchema = joi.object<UserFormData, true>({
    email: joi.string().email().required().messages({
        'any.required': 'Please send an email thanks, Nahar',
        'any.emailExist': 'This user allready exists in the system'
    }),
    firstName: joi.string().min(2).required(),
    lastName: joi.string().min(2).required(),
    password:joi.string().min(5).required(),
})

export default registerSchema;