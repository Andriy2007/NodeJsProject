import {Types} from "mongoose";

import {IPost} from "./post.interface";


export interface IViews extends Document {
    postId: string | IPost | Types.ObjectId;
}