import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Draft, IDraftModel } from '@blog/server/models/draft.model';
import { isEmpty } from 'lodash';
import { CreateDraftDto, UpdateDraftDto } from './draft.zod.schema';

@Injectable()
export class DraftService {
    constructor(@InjectModel(Draft.name) private readonly draftModel: IDraftModel) {}

    async create(document: CreateDraftDto) {
        return await this.draftModel.create(document);
    }

    async update(_id: string, data: UpdateDraftDto) {
        const draft = await this.draftModel.findOneAndUpdate({ _id }, data, {
            runValidators: true,
        });
        if (isEmpty(draft)) {
            return await this.create({ _id, ...data } as any);
        }
        return draft;
    }

    async getList(options: { type: string; page: number; limit: number }) {
        const { page = 1, limit = 10, type } = options;
        const query = { type };
        const res = await this.draftModel.paginate(query, {
            page,
            limit,
            sort: { createdAt: -1 },
        });
        return {
            items: res.docs,
            totalCount: res.totalDocs,
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
