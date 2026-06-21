import { userModel } from "../../Database/models/user.model.js";
import { AppError } from "../utils/appError.js";
import jwt from 'jsonwebtoken'

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return next(new AppError("Authorization error", 401))
    }

    const token = authHeader?.split(' ')[1]
    const jwtSecret = process.env.JWT_SECRET

    if (!token) {
        return next(new AppError("Token was not provided", 401))
    }

    let decoded = await jwt.verify(token, jwtSecret)
    let user = await userModel.findById(decoded.id)
    if (!user) {
        return next(new AppError("Invalid user"), 404)
    }

    if (user.passwordChangedAt) {
        let passwordChangedAt = parseInt(user.passwordChangedAt.getTime() / 1000)
        if (passwordChangedAt > decoded.iat)
            return next(new AppError("Invalid token"), 401)
    }

    req.user = user
    next()
}