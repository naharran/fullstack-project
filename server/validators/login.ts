import joi, { CustomValidator } from 'joi'
import {LoginCardentials} from '../../shared/types'
import { isUserExists } from '../services/authService'
import bcrypt from 'bcrypt';


const loginSchema = joi.object<LoginCardentials, true>({
        email: joi.string().email().required(),
        password: joi.string().min(5).required()
})

export default loginSchema