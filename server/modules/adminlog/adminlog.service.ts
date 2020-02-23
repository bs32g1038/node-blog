import { Injectable } from '@nestjs/common';
import { AdminLogModel, AdminLog, IAdminLogModel, AdminLogJoiSchema } from '../../models/adminlog.model';
import { InjectModel } from '../../utils/model.util';
import { checkEntityIsValid } from '../../utils/helper';

@Injectable()
export class AdminLogService {
    constructor(@InjectModel(AdminLogModel) private readonly adminLogModel: IAdminLogModel) {}

    async getAdminLogs(options: {
        skip?: number;
        limit?: number;
        sort?: object;
    }): Promise<{ items: AdminLog[]; totalCount: number }> {
        const { skip = 1, limit = 100, sort = { createdAt: -1 } } = options;
        return await this.adminLogModel.paginate({}, '', {
            skip,
            limit,
            sort,
        });
    }

    async create(adminLog: AdminLog): Promise<AdminLog> {
        checkEntityIsValid(adminLog, AdminLogJoiSchema);
        return await this.adminLogModel.create(adminLog);
    }

    async getRecentAdminLogs() {
        return this.adminLogModel.find({}, { limit: 10 });
    }
}
