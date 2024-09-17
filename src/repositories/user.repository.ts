import {FilterQuery} from "mongoose";

import {IUser, IUserListQuery} from "../interfaces/user.interface";
import {User} from "../models/user.model";


class UserRepository {
    public async getList(query: IUserListQuery): Promise<[IUser[], number]> {
        const skip = (query.page - 1) * query.limit;
        return await Promise.all([
            User.find().limit(query.limit).skip(skip),
            User.countDocuments(),
            ]);
    }

    public async create(dto: Partial<IUser>): Promise<IUser> {
        return await User.create(dto);
    }

    public async getById(userId: string): Promise<IUser> {
        return await User.findById(userId);
    }

    public async getOneByParams(dto: FilterQuery<IUser>): Promise<IUser> {
        return await User.findOne(dto);
    }

    public async getByParams(params: Partial<IUser>): Promise<IUser> {
        return await User.findOne(params);
    }

    public async updateById(userId: string, dto: Partial<IUser>): Promise<IUser> {
        return await User.findByIdAndUpdate(userId, dto, {returnDocument: "after",});
    }

    public async deleteById(userId: string): Promise<void> {
        await User.deleteOne({ _id: userId });
    }
}

export const userRepository = new UserRepository();