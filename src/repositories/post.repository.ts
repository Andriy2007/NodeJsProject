import {IPost} from "../interfaces/post.interface";
import {Post} from "../models/post.model";


class PostRepository {
    public async getList(): Promise<IPost[]> {
        return await Post.find({});
    }

    public async create(data: IPost, _userId: string): Promise<IPost> {
        console.log("Data in repository before saving:", data);
        return await Post.create({ ...data, _userId });
    }

    public async getByPostId(postId: string): Promise<IPost> {
        return await Post.findById(postId);
    }

    public async updateById(postId: string, dto: Partial<IPost>): Promise<IPost> {
        return await Post.findByIdAndUpdate(postId, dto, {returnDocument: "after",});
    }

    public async deleteById(userId: string): Promise<void> {
        await Post.deleteOne({ _id: userId });
    }

    public async getAveragePriceByRegion(manufacture: string, city: string,): Promise<number> {
        const cityOrAllUkraine = city === "all" ? {} : { city };
        const [averagePriceByRegion] = await Promise.all([
            Post.aggregate([
                {
                    $match: { $and: [{ ...cityOrAllUkraine }, { manufacture }] },
                },
                {
                    $group: {
                        _id: "$city",
                        averagePrice: { $avg: "$price" },
                    },
                },
            ]),
        ]);
        return averagePriceByRegion.length > 0
            ? averagePriceByRegion[0].averagePrice
            : 0;
    }
}

export const postRepository = new PostRepository();