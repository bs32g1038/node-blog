import fs from 'fs';
import util from 'util';
import path from 'path';
import shelljs from 'shelljs';
import { publicPath } from '@blog/server/utils/path.util';
import { InjectModel } from '@blog/server/utils/model.util';
import { DemoModel, IDemoModel } from '@blog/server/models/demo.model';
import { AppConfigService } from '@blog/server/modules/app-config/app.config.service';
import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';

@Injectable()
export class DemoService {
    constructor(
        @InjectModel(DemoModel) private readonly demoModel: IDemoModel,
        private readonly configService: AppConfigService
    ) {
        // 当服务器重启后，应该进行克隆demo
        this.gitClone();
    }

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
        const git = this.configService.appConfig.demoGit;
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

    async getDemo(name: string) {
        let buffer = new Buffer('');
        try {
            buffer = await fs.readFileSync(publicPath + '/demo/' + name + '/index.html');
        } catch (error) {
            throw new BadRequestException(`没有找到该名字为${name}的Demo`);
        }
        const data = buffer.toString();
        const arr = data.split('</body>');
        if (arr.length < 2) {
            throw new InternalServerErrorException('异常的html文件');
        }
        return arr[0] + '<script src="/static/js/iframeResizer.contentWindow.min.js"></script>' + arr[1];
    }
}
