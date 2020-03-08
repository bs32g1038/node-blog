import { Injectable } from '@nestjs/common';
import { InjectModel } from '../../utils/model.util';
import { DemoModel, IDemoModel } from '../../models/demo.model';
import fs from 'fs';
import util from 'util';
import path from 'path';
import shelljs from 'shelljs';
import { getConfig } from '@blog/server/configs/site.config.module';
import { publicPath } from '../../utils/path.util';

@Injectable()
export class DemoService {
    constructor(@InjectModel(DemoModel) private readonly demoModel: IDemoModel) {}

    async getDemoList(): Promise<{ items: { url: string; name: string }[]; totalCount: number }> {
        const p = path.join(publicPath, 'demo');
        const dirs = await this.readDir(p);
        const items = [];

        for (const name of dirs) {
            if (name.includes('.git')) {
                continue;
            }
            if (await this.isDir(p + '/' + name)) {
                items.push({
                    name,
                    url: '/blog/demos?name=' + name,
                });
            }
        }

        return { totalCount: items.length, items };
    }

    async readDir(path: string) {
        if (!fs.existsSync(path)) {
            return [];
        }
        return util.promisify(fs.readdir)(path);
    }

    async isDir(path: string) {
        const stats = await util.promisify(fs.stat)(path);
        if (stats.isDirectory()) {
            return true;
        }
        return false;
    }

    async gitClone() {
        const config: any = getConfig();
        const git = config.demoGit;
        return new Promise((resolve, reject) => {
            shelljs.exec(`git clone ${git} ${publicPath + '/demo'} -o demo`, code => {
                if (code !== 0) {
                    shelljs.cd(path.join(publicPath, 'demo'));
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
