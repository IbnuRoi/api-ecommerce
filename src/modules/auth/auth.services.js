import { userModel } from "../../../Database/models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

const signUpService = async (req) => {
    delete req.body.role
    const data = req.body
    let isUserExist = await userModel.findOne({ email: data.email })
    if (isUserExist) {
        throw new Error("Account is already exist")
    }
    const user = new userModel(data)
    await user.save()

    let token = jwt.sign(
        { email: user.email, name: user.name, id: user.id, role: user.role},
        process.env.JWT_SECRET,
    )

    const result = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
    }

    return result
}

const signInService = async (req) => {
    const { email, password } = req.body
    let user = await userModel.findOne({ email })
    const isMatch = await bcrypt.compare(password, user.password)
    if (!user || !isMatch) {
        throw new Error("Invalid email or password")
    }

    let token = jwt.sign(
        { email: user.email, name: user.name, id: user.id, role: user.role},
        process.env.JWT_SECRET
    )

    const result = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        token: token
    }

    return result
}

export {signUpService, signInService}