import { Injectable } from '@nestjs/common';
import { AdminLogModel, AdminLog, IAdminLogModel } from '../../models/adminlog.model';
import { InjectModel } from '../../utils/model.util';

@Injectable()
export class AdminLogService {
    constructor(@InjectModel(AdminLogModel) private readonly adminLogModel: IAdminLogModel) {}

    async getAdminLogs(options: {
        page?: number;
        limit?: number;
        sort?: object;
    }): Promise<{ items: AdminLog[]; totalCount: number }> {
        const { page = 1, limit = 100, sort = { createdAt: -1 } } = options;
        return await this.adminLogModel.paginate({}, '', {
            page,
            limit,
            sort,
        });
    }

    async create(adminLog: AdminLog): Promise<AdminLog> {
        return await this.adminLogModel.create(adminLog);
    }

    async getRecentAdminLogs() {
        return this.adminLogModel.find({}, '', { limit: 10, sort: { createdAt: -1 } });
    }
}
