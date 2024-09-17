import { Request, Response, NextFunction } from 'express';

import {ApiError} from "../errors/api-error";
import {tokenService} from "../services/token.service";
import {tokenRepository} from "../repositories/token.repository";
import {userService} from "../services/user.service";


class AuthMiddleware {
    public async checkAccessToken(req: Request, res: Response, next: NextFunction,) {
        try {
            const accessToken = req.get("Authorization");
            if (!accessToken) {
                throw new ApiError("No token provided", 401);
            }
            const payload = tokenService.checkToken(accessToken);
            const tokenPair = await tokenRepository.findByParams({ accessToken });

            if (!tokenPair) {
                throw new ApiError("Invalid token", 401);
            }

            const user = await userService.getById(String(payload.userId));
            if (!user || !user._id) {
                throw new ApiError("User not authenticated or missing _id", 401);
            }

            req.res.locals.jwtPayload = payload;
            res.locals.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();