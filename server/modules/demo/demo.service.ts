import { Injectable } from '@nestjs/common';
import { InjectModel } from '../../utils/model.util';
import { DemoModel, IDemoModel } from '../../models/demo.model';
import fs from 'fs';
import util from 'util';
import path from 'path';
import shelljs from 'shelljs';
import { getConfig } from '../../site-config/site.config.module';

@Injectable()
export class DemoService {
    constructor(@InjectModel(DemoModel) private readonly demoModel: IDemoModel) {}

    async getDemoList(): Promise<{ items: { url: string; name: string }[]; totalCount: number }> {
        const dirs = await this.readDir(path.resolve(__dirname, '../../../../public/demo'));
        const items = dirs
            .filter(name => {
                if (name === '.git') {
                    return false;
                }
                return true;
            })
            .map(name => {
                return {
                    name,
                    url: '/blog/demos?name=' + name,
                };
            });
        return { totalCount: items.length, items };
    }

    async getDemo(id: string) {
        const demo = await this.demoModel.findById(id);
        return demo;
    }

    async readDir(path: string) {
        return util.promisify(fs.readdir)(path);
    }

    async gitClone() {
        const config: any = getConfig();
        const git = config.demoGit;
        return new Promise((resolve, reject) => {
            shelljs.exec(`git clone ${git} ${path.resolve(__dirname, '../../../../public')}`, code => {
                if (code !== 0) {
                    shelljs.cd(path.resolve(__dirname, '../../../../public/demo'));
                    shelljs.exec('git pull', async code => {
                        if (code === 0) {
                            resolve({ success: true });
                        } else {
                            reject({ success: false });
                        }
                    });
                } else {
                    resolve({ success: true });
                }
            });
        });
    }
}
