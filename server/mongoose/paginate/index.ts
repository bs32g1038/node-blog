import { isArray } from 'util';
import mongoose from 'mongoose';

type Paginate<T> = {
    paginate?: (
        query: any,
        field: any,
        options: {
            page?: number;
            limit?: number;
            sort?: object;
            populate?: { path: string | any; select?: string | any }[];
        }
    ) => { items: T[]; totalCount: number };
};

export type ModelPaginate<T extends mongoose.Document> = {
    [k in keyof mongoose.Model<T>]: mongoose.Model<T>[k];
} &
    Paginate<T>;

export default (schema: mongoose.Schema) => {
    async function paginate(
        query: any,
        field: any,
        options: {
            page: number;
            limit: number;
            sort: object;
            populate: { path: string | any; select?: string | any }[];
        }
    ) {
        const { page, limit, sort } = options;
        let $FD = this.find(query, field, {
            skip: (page - 1) * limit,
            limit: limit,
            sort: sort,
        });
        if (isArray(options.populate)) {
            options.populate.map((item) => {
                $FD = $FD.populate(item.path, item.select);
            });
        }
        const [items, totalCount] = await Promise.all([$FD, this.countDocuments(query)]);
        return { items, totalCount } as { items: any[]; totalCount: number };
    }
    schema.statics.paginate = paginate;
};
