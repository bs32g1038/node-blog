import { Model } from 'mongoose';
import { Demo } from '../../models/demo.model';
import { CreateDemoDto, UpdateDemoDto } from './demo.dto';
export declare class DemoService {
    private readonly demoModel;
    constructor(demoModel: Model<Demo>);
    create(createDemoDto: CreateDemoDto): Promise<Demo>;
    update(id: string, data: UpdateDemoDto): Promise<Demo>;
    getDemos(query: {}, option: {
        skip?: number;
        limit?: number;
        sort?: object;
    }): Promise<Demo[]>;
    getDemo(id: string): Promise<any>;
    deleteDemo(id: string): Promise<any>;
    count(query: any): Promise<any>;
}
