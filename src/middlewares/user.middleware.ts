import { Request, Response, NextFunction } from 'express';

import {userService} from "../services/user.service";
import {ApiError} from "../errors/api-error";


class UserMiddleware {
    public async getByIdOrThrow(req: Request, res: Response, next: NextFunction,): Promise<void> {
        try {
            const {userId} = req.params;
            const user = await userService.getOneByParams({_id: userId});
            if (!user) {
                throw new ApiError("Invalid credentials provided", 401);
            }
            req.res.locals.user = user;
            next();
        } catch (error) {
            next(error);
        }
    }
}

export const userMiddleware = new UserMiddleware();