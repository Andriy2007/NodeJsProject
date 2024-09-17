import {FilterQuery} from "mongoose";
import {UploadedFile} from "express-fileupload";

import {IUser, IUserListQuery} from "../interfaces/user.interface";
import {userRepository} from "../repositories/user.repository";
import {s3Service} from "./s3.service";
import {FileItemTypeEnum} from "../enums/file-type.enum";
import {ApiError} from "../errors/api-error";
import {UserPresenter} from "../presenters/user.presenter";


class UserService {
    public async getList(query: IUserListQuery): Promise<any> {
        const [users, total] = await userRepository.getList(query);
        return UserPresenter.toResponseList(users, total, query);
    }

    public async create(dto: Partial<IUser>): Promise<IUser> {
        return await userRepository.create(dto);
    }

    public async getById(userId: string): Promise<IUser> {
        return await this.findUserOrThrow(userId);
    }

    public async getOneByParams(params: FilterQuery<IUser>): Promise<IUser> {
        return await userRepository.getOneByParams(params);
    }

    public async getMe(userId: string): Promise<IUser> {
        return await this.findUserOrThrow(userId);
    }

    public async updateById(userId: string, dto: Partial<IUser>): Promise<IUser> {
        await this.findUserOrThrow(userId);
        return await userRepository.updateById(userId, dto);
    }

    public async deleteById(userId: string): Promise<void> {
        await this.findUserOrThrow(userId);
        return await userRepository.deleteById(userId);
    }

    public async uploadAvatar(userId: string, avatar: UploadedFile,): Promise<IUser> {
        const user = await this.findUserOrThrow(userId);
        console.log(user)
        const filePath = await s3Service.uploadFile(
            avatar,
            FileItemTypeEnum.USER,
            user._id,
        );
        if (user.avatar) {
            // TODO: delete old avatar
        }
        return await userRepository.updateById(userId, { avatar: filePath });
    }

    private async findUserOrThrow(userId: string): Promise<IUser> {
        const user = await userRepository.getById(userId);
        if (!user) {
            throw new ApiError("user not found", 404);
        }
        return user;
    }
}

export const userService = new UserService();