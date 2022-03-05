import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Explore, ExploreDocument } from '@blog/server/models/explore.model';
import { IPaginate } from '@blog/server/mongoose/paginate';

@Injectable()
export class ExploreService {
    constructor(@InjectModel(Explore.name) private readonly exploreModel: Model<ExploreDocument> & IPaginate) {}

    async create(explore: Explore): Promise<Explore> {
        return await this.exploreModel.create(explore);
    }

    async update(id: string, data: Explore): Promise<Explore | null> {
        await this.exploreModel.updateOne({ _id: id }, data, { runValidators: true });
        return await this.exploreModel.findById(id);
    }

    async getExploreList(options: { page?: number; limit?: number }) {
        const { page = 1, limit = 100 } = options;
        return await this.exploreModel.paginate({}, '', {
            page,
            limit: limit,
            sort: { createdAt: -1 },
        });
    }

    async getExplore(id: string) {
        return await this.exploreModel.findById(id);
    }

    async deleteExplore(id: string) {
        const explore = await this.exploreModel.findById(id);
        await this.exploreModel.deleteOne({ _id: id });
        return explore;
    }
}
