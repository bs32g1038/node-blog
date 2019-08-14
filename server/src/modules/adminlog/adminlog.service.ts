import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { AdminLogModel, AdminLogDocument, AdminLog } from '../../models/adminlog.model';
import { InjectModel } from '../../utils/model.util';

@Injectable()
export class AdminLogService {
    constructor(@InjectModel(AdminLogModel) private readonly adminLogModel: Model<AdminLogDocument>) {}

    async getAdminLogs(query = {}, option: { skip?: number; limit?: number; sort?: object }): Promise<AdminLog[]> {
        const { skip = 1, limit = 100, sort = { createdAt: -1 } } = option;
        return await this.adminLogModel.find(query, '', {
            skip: (skip - 1) * limit,
            limit,
            sort,
        });
    }

    async create(adminLog: AdminLog): Promise<AdminLog> {
        return await this.adminLogModel.create(adminLog);
    }

    async count(query) {
        const filter = { ...query };
        return await this.adminLogModel.countDocuments(filter);
    }

    async getRecentAdminLogs() {
        return this.getAdminLogs({}, { limit: 10 });
    }
} /* istanbul ignore next */
