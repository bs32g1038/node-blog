import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IPaginate } from '@blog/server/mongoose/paginate';
import { Draft, DraftDocument } from '@blog/server/models/draft.model';
import { isEmpty } from 'lodash';

@Injectable()
export class DraftService {
    constructor(@InjectModel(Draft.name) private readonly draftModel: Model<DraftDocument> & IPaginate) {}

    async create(document: Draft) {
        return await this.draftModel.create(document);
    }

    async update(_id: string, data: Draft) {
        const draft = await this.draftModel.findOneAndUpdate({ _id }, data, {
            runValidators: true,
        });
        if (isEmpty(draft)) {
            return await this.create({ _id, ...data });
        }
        return draft;
    }

    async getList(options: { type: string; page: number; limit: number }) {
        const { page = 1, limit = 10, type } = options;
        const query = { type };
        const { items, totalCount } = await this.draftModel.paginate(query, '', {
            page,
            limit,
        });
        return {
            items,
            totalCount,
        };
    }

    async getDraft(id: string) {
        const draft = await this.draftModel.findById(id);
        if (isEmpty(draft)) {
            throw new NotFoundException('没有该草稿！');
        }
        return draft;
    }
}
