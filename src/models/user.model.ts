import mongoose from "mongoose";

import {UserDocument} from "../interfaces/user.interface";


const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: false },
        password: { type: String, required: true },
        role: { type: String, enum: ['Buyer', 'Seller', 'ADMIN'], required: true  },
        subscription: { type: String, sub: ['Base', 'Vip', ], default: 'Base' },
        avatar: { type: String, required: false },
        isDeleted: { type: Boolean, default: false },
        isVerified: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const User = mongoose.model<UserDocument>("users", userSchema);