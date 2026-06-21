import { Router } from 'express'
import * as auth from './auth.controllers.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { signInValidation, signUpValidation } from './auth.validations.js';

const authRouter = Router()

authRouter.post('/signUp', validate(signUpValidation), auth.signUp)
authRouter.post('/signIn', validate(signInValidation), auth.signIn)

export default authRouter