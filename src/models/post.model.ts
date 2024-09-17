import mongoose, {Schema} from "mongoose";

import {User} from "./user.model";
import {PostDocument} from "../interfaces/post.interface";


const postSchema = new mongoose.Schema(
    {
        name: { type: String },
        brand: { type: String },
        model: { type: String },
        year: { type: Number },
        price: {type: Number },
        currency: {type: String },
        city: {type: String },
        _userId: { type: Schema.Types.ObjectId, required: true, ref: User, },
        isDeleted: { type: Boolean, default: false },
        isVerified: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Post = mongoose.model<PostDocument>("posts", postSchema);