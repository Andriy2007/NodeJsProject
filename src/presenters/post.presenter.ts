import {IPost} from "../interfaces/post.interface";
import {CurrencyEnum} from "../enums/currency.enum";


class PostPresenter {
    public async present(post: IPost): Promise<Partial<IPost>> {

        return {
            price: post.price,
            currency: CurrencyEnum.UAH,
            year: post.year,
            _id: post._id,
            _userId: post._userId,
            model: post.model,
            city: post.city,
        };
    }

}

export const postPresenter = new PostPresenter();