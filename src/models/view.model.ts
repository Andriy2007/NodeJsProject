import {model, Schema, Types} from "mongoose";

import {User} from "./user.model";
import {IViews} from "../interfaces/views.interface";


const schema = new Schema(
    {
        postId: {
            type: Types.ObjectId,
            required: true,
            ref: User,
        },
    },
    { versionKey: false, timestamps: true },
);

export const Views = model<IViews>("views", schema);