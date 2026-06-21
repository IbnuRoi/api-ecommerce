import { AppError } from "../../utils/appError.js";
import { response } from "../../utils/response.js";
import { signInService, signUpService } from "./auth.services.js";

const signUp = async (req, res, next) => {
    try {
        const data = await signUpService(req)
        response(201, data, 'Success create new user', res)
    } catch (error) {
        if (error.message.includes("already exist")) {
            return next(new AppError(error.message, 409))
        } else {
            return next(new AppError(error.message, 500))
        }
    }
}

const signIn = async (req, res) => {
    try {
        const data = await signInService(req)
        response(200, data, "Sign in success", res)
    } catch (error) {
        if(error.message.includes("invalid")) {
            return next(new AppError(error.message, 401))
        } else {
            return next(new AppError(error.message, 500))
        }
    }
}

export { signIn, signUp }