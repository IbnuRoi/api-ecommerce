import { model, Schema } from "mongoose";
import bcrypt from "bcrypt"


const SALT_ROUNDS = 12

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
        },
        password: {
            type: String,
            required: true,
            minlength: [8, "Minimum password 8 character"]
        },
        passwordChangedAt: Date,
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user"
        },
        isActive: {
            type: Boolean,
            default: true
        },
        verified: {
            type: Boolean,
            default: false
        },
        blocked: {
            type: Boolean,
            default: false
        },
        addresses: [{
            city: String,
            street: String,
            phone: String
        }],
    },
    { timestamps: true}
)

userSchema.pre("save", async function () {
    if(!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
})

userSchema.pre("findOneAndUpdate", async function () {
    if(this._update.password) {
        this._update.password = await bcrypt.hash(this._update.password, SALT_ROUNDS)
    }
})

export const userModel = model("user", userSchema)