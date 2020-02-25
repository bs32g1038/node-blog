import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '../../utils/model.util';
import { Demo, DemoModel, IDemoModel, DemoJoiSchema } from '../../models/demo.model';
import { checkEntityIsValid } from '../../utils/helper';

@Injectable()
export class DemoService {
    constructor(@InjectModel(DemoModel) private readonly demoModel: IDemoModel) {}

    async create(newDemo: Demo): Promise<Demo> {
        checkEntityIsValid(newDemo, DemoJoiSchema);
        const demo: Demo = await this.demoModel.create(newDemo);
        return demo;
    }

    async update(id: string, data: Demo) {
        return await this.demoModel.findByIdAndUpdate({ _id: id }, data, { runValidators: true });
    }

    async getDemoList(options: {
        page?: number;
        limit?: number;
        sort?: object;
    }): Promise<{ items: Demo[]; totalCount: number }> {
        const { page = 1, limit = 10, sort = {} } = options;
        return await this.demoModel.paginate({}, '', {
            page,
            limit,
            sort,
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

    public async batchDelete(demoIds: string[]) {
        return this.demoModel.find({ _id: { $in: demoIds } }).then(async demos => {
            if (demos.length <= 0) {
                throw new BadRequestException();
            }
            return this.demoModel.deleteMany({ _id: { $in: demoIds } });
        });
    }
}
