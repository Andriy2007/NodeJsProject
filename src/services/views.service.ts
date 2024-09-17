import {IViews} from "../interfaces/views.interface";
import {viewsRepository} from "../repositories/views.repository";
import {ApiError} from "../errors/api-error";
import {dayjsService} from "./dayjs.service";


class ViewsService {
    public async create(postId: string): Promise<IViews> {
        return await viewsRepository.create(postId);
    }

    public async countViews(day: number, postId: string): Promise<number> {
        if (isNaN(day)) {
            throw new ApiError("'day' повинен бути числом", 400);
        }
        const previousTime = dayjsService.previousDay(day);
        return await viewsRepository.viewCount(previousTime, postId);
    }
}

export const viewsService = new ViewsService();