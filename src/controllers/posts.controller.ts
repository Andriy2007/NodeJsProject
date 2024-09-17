import { NextFunction, Request, Response } from "express";

import {postService} from "../services/posts.service";
import {viewsService} from "../services/views.service";
import {IPost} from "../interfaces/post.interface";
import {IUser} from "../interfaces/user.interface";
import {postPresenter} from "../presenters/post.presenter";


class PostsController {
    public async getList(req: Request, res: Response, next: NextFunction) {
        try {
            const posts = await postService.getList();
            res.json(posts);
        } catch (e) {
            next(e);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const postId = req.params.postId;
            const post = await postService.getById(postId);
            res.json(post);
        } catch (e) {
            next(e);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction,): Promise<void> {
        try {
            const body = req.body as IPost;
            const user = req.res.locals.user as IUser;
            const post = await postService.create(body, user);
            const postsPresenter = await postPresenter.present(post);
            res.status(201).json({ data: postsPresenter });
        } catch (e) {
            next(e);
        }
    }

    public async updateById(req: Request, res: Response, next: NextFunction) {
        try {
            const postId = req.params.postId;
            const dto = req.body as Partial<IPost>;
            const post = await postService.updateById(postId, dto);
            res.status(201).json(post);
        } catch (e) {
            next(e);
        }
    }

    public async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const postId = req.params.postId;
            await postService.deleteById(postId);
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }

    public async viewCount(req: Request, res: Response, next: NextFunction,): Promise<void> {
        try {
            const { carId, day } = req.params;
            const viewCount = await viewsService.countViews(+day, carId);
            res.status(200).json({ data: { viewCount, day: +day } });
        } catch (e) {
            next(e);
        }
    }

    public async averagePrice(req: Request, res: Response, next: NextFunction,):
        Promise<Response<{ city: string; manufacture: string; avg: number }>> {
        try {
            const { manufacture, city } = req.params;
            const averagePrice = await postService.getAveragePriceByRegion(
                manufacture,
                city,
            );
            return res
                .status(200)
                .json({ data: { city, manufacture, avg: averagePrice } });
        } catch (e) {
            next(e);
        }
    }
}

export const postController = new PostsController();