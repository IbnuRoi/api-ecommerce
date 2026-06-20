import mongoose from "mongoose";


export const dbConnection = async () => {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log('DB Connected')
        })
        .catch(err => {
            console.log('DB Failed to Connect', err.message)
        })
}