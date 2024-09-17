import { Request, Response, NextFunction } from 'express';
import {UploadedFile} from "express-fileupload";

import {ApiError} from "../errors/api-error";
import {statusCodes} from "../constants/status-codes.constant";
import {photoConfig} from "../constants/file.constant";


class FileMiddleware {
    public isAvatarValid(req: Request, res: Response, next: NextFunction) {
        try {
            const avatar = req.files?.avatar as UploadedFile;
            if (!avatar) {
                throw new ApiError("Empty file", statusCodes.BAD_REQUEST);
            }
            if (Array.isArray(avatar)) {
                throw new ApiError("Must be not array", statusCodes.BAD_REQUEST);
            }
            if (!photoConfig.MIMETYPE.includes(avatar.mimetype)) {
                throw new ApiError("Invalid file format", statusCodes.BAD_REQUEST);
            }
            if (avatar.size > photoConfig.SIZE) {
                throw new ApiError("File is too large", statusCodes.BAD_REQUEST);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const fileMiddleware = new FileMiddleware();