import joi from 'joi'
import {LoginCardentials} from '../../shared/types'


const loginSchema = joi.object<LoginCardentials, true>({
        email: joi.string().email().required(),
        password: joi.string().min(5).required()
})

export default loginSchema