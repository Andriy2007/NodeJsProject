import joi from "joi";

import {regexConstant} from "../constants/regex.constant";


export class UserValidator {
    private static userName = joi.string().min(3).max(50).trim().messages({});
    private static phone = joi.string().regex(regexConstant.PHONE).trim();
    private static email = joi.string().regex(regexConstant.EMAIL).lowercase().trim();
    private static password = joi.string().regex(regexConstant.PASSWORD).trim();
    private static role = joi.string();
    private static subscription = joi.string();

    public static create = joi.object({
        name: this.userName.required(),
        email: this.email.required(),
        password: this.password.required(),
        phone: this.phone,
        role: this.role,
        subscription: this.subscription,
    });

    public static update = joi.object({
        name: this.userName,
        phone: this.phone,
        subscription: this.subscription,
    });

    public static login = joi.object({
        email: this.email.required(),
        password: this.password.required(),
    });

    public static listQuery = joi.object({
        limit: joi.number().min(1).max(100).default(10),
        page: joi.number().min(1).default(1),
    });
}