import {RoleEnum} from "../enums/role.enum";


export interface IUser {
    _id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    role: RoleEnum;
    subscription: string;
    avatar: string;
    isDeleted: boolean;
    isVerified: boolean;
}

export interface IUserListQuery {
    limit?: number;
    page?: number;
}

export interface IPublicUser {
    _id: string;
    name: string;
    email: string;
    role: RoleEnum;
    avatar: string;
    isDeleted: boolean;
    isVerified: boolean;
}

export interface IUsers {
    _id: string;
    name: string;
    email: string;
    role: RoleEnum;
    avatar: string;
    isDeleted: boolean;
    isVerified: boolean;
}

export interface IUserResponse
    extends Pick<
        IUser,
        | "_id"
        | "name"
        | "email"
        | "role"
        | "avatar"
        | "isDeleted"
        | "isVerified"
>{}

export interface IPrivateUser {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: RoleEnum;
    avatar: string;
    isDeleted: boolean;
    isVerified: boolean;
}

export interface IUserResponseList extends IUserListQuery {
    data: IUsers[];
    total: number;
}

export interface UserDocument extends IUser, Document {}