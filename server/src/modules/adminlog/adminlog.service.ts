import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AdminLog } from '../../models/adminlog.model';

@Injectable()
export class AdminLogService {
    constructor(@InjectModel('adminlog') private readonly adminLogModel: Model<AdminLog>) {}

    async getAdminLogs(query: {} = {}, option: { skip?: number; limit?: number; sort?: object }): Promise<AdminLog[]> {
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
