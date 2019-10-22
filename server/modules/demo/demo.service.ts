import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '../../utils/model.util';
import { Demo, DemoDocument, DemoModel } from '../../models/demo.model';

@Injectable()
export class DemoService {
    constructor(@InjectModel(DemoModel) private readonly demoModel: Model<DemoDocument>) {}

    async create(newDemo: Demo): Promise<Demo> {
        const demo: Demo = await this.demoModel.create(newDemo);
        return demo;
    }

    async update(id: string, data: Demo) {
        return await this.demoModel.findByIdAndUpdate({ _id: id }, data);
    }

    async getDemos(query: {}, option: { skip?: number; limit?: number; sort?: object }): Promise<Demo[]> {
        const { skip = 1, limit = 10, sort = {} } = option;
        const filter = { ...query };
        return await this.demoModel.find(
            filter,
            {},
            {
                skip: (skip - 1) * limit,
                limit,
                sort,
            }
        );
    }

    async getDemo(id: string) {
        const demo = await this.demoModel.findById(id);
        return demo;
    }

    async deleteDemo(id: string) {
        await this.demoModel.deleteOne({ _id: id });
        return {};
    }

    async count(query) {
        const filter = { ...query };
        return await this.demoModel.countDocuments(filter);
    }

    public async batchDelete(demoIds: string[]) {
        return this.demoModel.deleteMany({ _id: { $in: demoIds } });
    }
}
