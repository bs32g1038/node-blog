import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Demo } from '../../models/demo.model';
import { CreateDemoDto, UpdateDemoDto } from './demo.dto';

@Injectable()
export class DemoService {
    constructor(
        @InjectModel('demo') private readonly demoModel: Model<Demo>
    ) { }

    async create(createDemoDto: CreateDemoDto): Promise<Demo> {
        const demo: Demo = await this.demoModel.create(createDemoDto);
        return demo;
    }

    async update(id: string, data: UpdateDemoDto) {
        const demo: Demo = await this.demoModel.findByIdAndUpdate({ _id: id }, data);
        return demo;
    }

    async getDemos(
        query: {},
        option: { skip?: number, limit?: number, sort?: object }
    ): Promise<Demo[]> {
        const { skip = 1, limit = 10, sort = {} } = option;
        const filter = { ...query };
        return await this.demoModel.find(filter, {}, {
            skip: (skip - 1) * limit,
            limit,
            sort
        });
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
}/* istanbul ignore next */
