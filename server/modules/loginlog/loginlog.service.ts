import { Injectable } from '@nestjs/common';
import { LoginLog, ILoginLogModel } from '../../models/loginlog.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LoginLogService {
    constructor(@InjectModel(LoginLog.name) private readonly loginLogModel: ILoginLogModel) {}

    async getAdminLogs(options: {
        page?: number;
        limit?: number;
        sort?: object;
    }): Promise<{ items: LoginLog[]; totalCount: number }> {
        const { page = 1, limit = 100, sort = { createdAt: -1 } } = options;
        const res = await this.loginLogModel.paginate(
            {},
            {
                page,
                limit,
                sort,
                populate: [{ path: 'user', select: ['username', 'avatar'] }],
            }
        );
        return {
            items: res.docs,
            totalCount: res.totalDocs,
        };
    }

    async create(loginLog: LoginLog): Promise<LoginLog> {
        return await this.loginLogModel.create(loginLog);
    }

    async getRecentAdminLogs() {
        return this.loginLogModel.find({}, '', { limit: 10, sort: { createdAt: -1 } });
    }
}
