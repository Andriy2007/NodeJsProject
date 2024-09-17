import joi from "joi";

import {CurrencyEnum} from "../enums/currency.enum";


export class PostValidator {
    private static model = joi.string().min(2).max(30).trim().lowercase();
    private static year = joi.number().min(1999).max(new Date().getFullYear());
    private static manufacture = joi.string().min(2).max(30).trim().lowercase();
    private static price = joi.number().min(1000).max(1000000000);
    private static currency = joi.valid(...Object.values(CurrencyEnum));
    private static city = joi.string().min(2).max(30).trim().lowercase();

    public static create = joi.object({
        model: this.model.required(),
        year: this.year.required(),
        manufacture: this.manufacture.required(),
        price: this.price.required(),
        currency: this.currency.required(),
        city: this.city.required(),
    });

    public static update = joi.object({
        model: this.model,
        year: this.year,
        manufacture: this.manufacture,
        price: this.price,
        currency: this.currency,
        city: this.city,
    });
}