import {configs} from "@typescript-eslint/eslint-plugin";

import {IPrivateUser, IPublicUser, IUser, IUserListQuery, IUserResponse, IUserResponseList} from "../interfaces/user.interface";


export class UserPresenter {
    public static toPublicResponseDto(user: IUser): IUserResponse  {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar ? `${configs.AWS_S3_ENDPOINT}/${user.avatar}` : null,
            isDeleted: user.isDeleted,
            isVerified: user.isVerified,
        };
    }

    public static toPublicResponseListDto(users: IUser[]): IPublicUser[] {
        return users.map(UserPresenter.toPublicResponseDto);
    }

    public static toResponseList(
        data: IUser[],
        total: number,
        query: IUserListQuery,
    ): IUserResponseList {
        return {
            data: data.map((item) => this.toPublicResponseDto(item)),
            total,
            ...query,
        };
    }

    public static toPrivateResponseDto(user: IUser): IPrivateUser {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            avatar: user.avatar ? `${configs.AWS_S3_ENDPOINT}/${user.avatar}` : null,
            isDeleted: user.isDeleted,
            isVerified: user.isVerified,
        };
    }
}