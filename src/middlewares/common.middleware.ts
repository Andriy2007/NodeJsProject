import { Request, Response, NextFunction } from 'express';
import {isObjectIdOrHexString} from "mongoose";
import {ObjectSchema} from "joi";

import {ApiError} from "../errors/api-error";


class CommonMiddleware {
    public isIdValid(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.userId;
            if (!isObjectIdOrHexString(id)) {
                throw new ApiError("Invalid id", 400);
            }
            next();
        } catch (e) {
            next(e);
        }
    }

    public isBodyValid(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = await validator.validateAsync(req.body);
                next();
            } catch (e) {
                next(e);
            }
        };
    }

    public isQueryValid(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                req.query = await validator.validateAsync(req.query);
                next();
            } catch (e) {
                next(new ApiError(e.details[0].message, 400));
            }
        };
    }

}

export const commonMiddleware = new CommonMiddleware();