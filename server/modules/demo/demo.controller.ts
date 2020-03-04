import { Controller, Get, Post, Delete, Put, UseGuards, Header, Query } from '@nestjs/common';
import { DemoService } from './demo.service';
import { Demo, DemoJoiSchema } from '../../models/demo.model';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js'; // https://highlightjs.org/
import { ObjectIdSchema, generateObjectIdsSchema, StandardPaginationSchema } from '../../joi';
import { JoiParam, JoiQuery, JoiBody } from '../../decorators/joi.decorator';
import Joi from '@hapi/joi';

@Controller()
@UseGuards(RolesGuard)
export class DemoController {
    constructor(private readonly demoService: DemoService) {}

    @Post('/api/demo/git')
    async gitClone() {
        return await this.demoService.gitClone();
    }

    @Get('/api/demos')
    async getDemos() {
        return await this.demoService.getDemoList();
    }

    @Get('/demos/:id')
    @Header('Content-Type', 'text/html')
    async renderDemoShowPage(@JoiParam({ id: Joi.string() }) params: { id: string }) {
        return `
        <!DOCTYPE html>
            <html lang="zh">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <meta content="李志成的个人网站，个人博客，代码展示，demo展示，代码分享" name="Keywords">
                <meta content="李志成的博客小站，专注于web开发，尤其是前端开发。喜欢和同道中人一起搞开发！" name="description">
                <title>
                    李志成的个人网站
                </title>
                <style>
                    body {
                        font-size: 14px;
                        margin: 0;
                        line-height: 1.5;
                        color: #333;
                        font-family: Arial, sans-serif;
                    }
                    #footer {
                        border-top: 1px solid #eaeaea;
                        line-height: 1.5;
                        color: #333;
                        font-size: 12px;
                        padding: 15px 0;
                        font-family: 'Lucida Grande', Verdana, Sans-Serif;
                        text-align: center;
                        text-shadow: 0 1px hsla(0, 0%, 100%, .3);
                    }
                    iframe{
                        width: 500px;
                        height: 400px;
                        margin: 0 auto;
                    }
                </style>
            </head>

            <body>
                <div class="main">
                   <iframe src="/demo/${params.id}/index.html" frameborder="0" scrolling="no"></iframe>
                </div>
                <div id="footer">
                    <p class="foot_p footer-p">
                        Designed &amp; Powerd by <a href="http://www.lizc.net" target="_blank">李成</a>
                        <br>
                        Copyright © 2016-2020 Lizc博客
                        <br><a href="http://www.miibeian.gov.cn/" target="_blank" rel="nofollow">粤ICP备16021965号-2</a>
                    </p>
                </div>
            </body>
            </html>
        `;
    }
}
