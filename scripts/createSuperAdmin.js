import { userModel } from "../Database/models/user.model";


const createSuperAdmin = async () => {
    const exist = await userModel.findOne({ role: "admin" })
    if (exist)
        return console.log("Admin exist")

    await userModel.create({
        name: "Super Admin",
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: "admin"
    })
    
    console.log("Super admin created successfully")
    process.exit()
}

createSuperAdmin()