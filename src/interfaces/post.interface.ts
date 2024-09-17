import {Types} from "mongoose";

import {CurrencyEnum} from "../enums/currency.enum";
import {IUser} from "./user.interface";


export interface IPost {
    _id: string;
    _userId?: Types.ObjectId | string | IUser;
    name: string;
    brand: string;
    model: string;
    year: number;
    currency: string;
    price: number;
    views: number;
    city: string;
    isDeleted: boolean;
    isVerified: boolean;
}

export interface IPublicPost {
    _id: string;
    _userId?: Types.ObjectId | string | IUser;
    name: string;
    brand: string;
    model: string;
    year: number;
    currency: CurrencyEnum;
    price: number;
    views: number;
    city: string;
    isDeleted: boolean;
    isVerified: boolean;
}

export interface IPrivatePost {
    _id: string;
    _userId?: Types.ObjectId | string | IUser;
    name: string;
    brand: string;
    model: string;
    year: number;
    currency: CurrencyEnum;
    price: number;
    views: number;
    city: string;
    isDeleted: boolean;
    isVerified: boolean;
}

export interface PostDocument extends IPost, Document {}