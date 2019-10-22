import { Controller, Get, Post, Body, Query, Param, Delete, Put, UseGuards, Header } from '@nestjs/common';
import { StandardPaginationSchema } from '../../validations/standard.pagination.validation';
import { DemoService } from './demo.service';
import { Demo } from '../../models/demo.model';
import { JoiValidationPipe } from '../../pipes/joi.validation.pipe';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import Joi from '@hapi/joi';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js'; // https://highlightjs.org/

@Controller()
@UseGuards(RolesGuard)
export class DemoController {
    constructor(private readonly demoService: DemoService) {}

    public static idSchema = {
        id: Joi.string()
            .default('')
            .max(50),
    };

    public static deleteDemosSchema = {
        demoIds: Joi.array().items(Joi.string().required()),
    };

    @Post('/api/demos')
    @Roles('admin')
    async create(@Body() demo: Demo) {
        return await this.demoService.create(demo);
    }

    @Put('/api/demos/:id')
    @Roles('admin')
    async update(@Param() params: { id: string }, @Body() demo: Demo) {
        return await this.demoService.update(params.id, demo);
    }

    @Get('/api/demos')
    @JoiValidationPipe(StandardPaginationSchema)
    async getArticles(@Query() query: { page: number; limit: number }) {
        const items = await this.demoService.getDemos(
            {},
            {
                skip: Number(query.page),
                limit: Number(query.limit),
            }
        );
        const totalCount = await this.demoService.count({});
        return {
            items,
            totalCount,
        };
    }

    @Get('/api/demos/:id')
    @JoiValidationPipe(DemoController.idSchema)
    async getArticle(@Param() params: { id: string }): Promise<Demo | null> {
        return await this.demoService.getDemo(params.id);
    }

    @Delete('/api/demos/:id')
    @Roles('admin')
    @JoiValidationPipe(DemoController.idSchema)
    async deleteArticle(@Param() params: { id: string }) {
        return await this.demoService.deleteDemo(params.id);
    }

    @Delete('/api/demos')
    @Roles('admin')
    @JoiValidationPipe(DemoController.deleteDemosSchema)
    deleteArticles(@Body() body: { demoIds: string[] }): Promise<any> {
        return this.demoService.batchDelete(body.demoIds);
    }

    @Get('/demos/:id')
    @Header('Content-Type', 'text/html')
    async renderDemoShowPage(@Param() params: { id: string }) {
        const { id } = params;
        const demo = await this.demoService.getDemo(id);
        const code: { html: string; css: string; javascript: string } = {
            html: '',
            css: '',
            javascript: '',
        };
        const markdown: any = new MarkdownIt({
            highlight(str, lang) {
                switch (lang) {
                    case 'html':
                        code.html = str;
                        break;
                    case 'css':
                        code.css = str;
                        break;
                    case 'javascript':
                        code.javascript = str;
                        break;
                    default:
                        break;
                }
                if (lang && hljs.getLanguage(lang)) {
                    return `<pre class="hljs ${lang}"><code>` + hljs.highlight(lang, str, true).value + '</code></pre>';
                }
                return '<pre class="hljs"><code>' + markdown.utils.escapeHtml(str) + '</code></pre>';
            },
        });
        const data = {
            title: '',
            content: '',
            code,
            hljs(lang?: any, str?: any) {
                return `<pre class="hljs ${lang}"><code>` + hljs.highlight(lang, str, true).value + '</code></pre>';
            },
        };
        if (demo) {
            Object.assign(data, {
                title: demo.title,
                content: markdown.render(demo.content),
            });
        }
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
                    ${data.title}-李志成的个人网站
                </title>
                <style>
                    /* Paraíso Comment */
                    .hljs-comment,
                    .hljs-quote {
                        color: #776e71;
                    }

                    /* Paraíso Red */
                    .hljs-variable,
                    .hljs-template-variable,
                    .hljs-tag,
                    .hljs-name,
                    .hljs-selector-id,
                    .hljs-selector-class,
                    .hljs-regexp,
                    .hljs-link,
                    .hljs-meta {
                        color: #ef6155;
                    }

                    /* Paraíso Orange */
                    .hljs-number,
                    .hljs-built_in,
                    .hljs-builtin-name,
                    .hljs-literal,
                    .hljs-type,
                    .hljs-params,
                    .hljs-deletion {
                        color: #f99b15;
                    }

                    /* Paraíso Yellow */
                    .hljs-title,
                    .hljs-section,
                    .hljs-attribute {
                        color: #333;
                    }

                    /* Paraíso Green */
                    .hljs-string,
                    .hljs-symbol,
                    .hljs-bullet,
                    .hljs-addition {
                        color: #48b685;
                    }

                    /* Paraíso Purple */
                    .hljs-keyword,
                    .hljs-selector-tag {
                        color: #815ba4;
                    }

                    .hljs {
                        display: block;
                        overflow-x: auto;
                        color: #4f424c;
                        padding: 0.5em;
                    }

                    .hljs-emphasis {
                        font-style: italic;
                    }

                    .hljs-strong {
                        font-weight: bold;
                    }

                    body {
                        font-size: 14px;
                        margin: 0;
                        line-height: 1.5;
                        color: #333;
                        font-family: Arial, sans-serif;
                    }

                    h1 {
                        text-align: center;
                        line-height: 40px;
                        margin: 0;
                        text-align: center;
                        font-size: 18px;
                        font-family: 'kaiti', 'microsoft yahei';
                        border-bottom: 1px solid #ededed;
                        text-shadow: 0px 1px 0px #f2f2f2;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }

                    .main {
                        border-top: 1px solid #eaeaea;
                        overflow: hidden;
                    }

                    .part {
                        width: 50%;
                        min-height: 400px;
                        background: white;
                    }

                    #effect {
                        float: right;
                        margin-left: -1px;
                        box-sizing: border-box;
                        margin-bottom: -999em;
                        padding-bottom: 999em;
                    }

                    #code {
                        float: left;
                        box-sizing: border-box;
                        border-right: 1px solid #eaeaea;
                        margin-bottom: -999em;
                        padding-bottom: 999em;
                    }

                    #code h3,
                    #effect h3 {
                        margin: 0;
                        padding: 0;
                        line-height: 30px;
                        margin: 0;
                        font-size: 15px;
                        padding-left: 10px;
                        border-bottom: 1px solid #ededed;
                        color: #4e4e4e;
                        text-shadow: 0px 1px 0px white;
                        font-family: 'microsoft yahei';
                    }

                    #effect h3 {
                        font-size: 28px;
                        margin: 30px 15px;
                        border: none;
                    }

                    pre {
                        font: 14px/1.3 Consolas, Monaco, monospace;
                        padding: 5px 10px;
                        margin: 0;
                        white-space: pre-wrap;
                        word-wrap: break-word;
                        font-weight: 600;
                    }

                    .show h5 {
                        font-size: 13px;
                        line-height: 20px;
                        padding: 10px 0 2px 2px;
                        margin: 0 0 0 8px;
                    }

                    .show .demo {
                        padding: 20px 20px 10px 10px;
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
                </style>
                <style>
                    ${data.code && data.code.css}
                </style>
            </head>

            <body>
                <div class="main">
                    <div id="effect" class="part">
                        <h3>效果：</h3>
                        <div class="show">
                            <div class="demo">
                                ${data.code && data.code.html}
                            </div>
                        </div>
                    </div>
                    <div id="code" class="part">
                        <h1>
                            ${data.title} 实例页面
                        </h1>
                        <h3>代码：</h3>
                        <div class="show">
                            <h5>HTML代码：</h5>
                            ${data.code.html ? data.hljs('html', data.code.html) : ''}
                            <h5>CSS代码：</h5>
                            ${data.code.css ? data.hljs('css', data.code.css) : ''}
                            <h5>javascript代码：</h5>
                            ${data.code.javascript ? data.hljs('javascript', data.code.javascript) : ''}
                        </div>
                    </div>
                </div>

                <div id="footer">
                    <p class="foot_p footer-p">
                        Designed &amp; Powerd by <a href="http://www.lizc.net" target="_blank">李成</a>
                        <br>
                        Copyright © 2016-2019 Lizc博客
                        <br><a href="http://www.miibeian.gov.cn/" target="_blank" rel="nofollow">粤ICP备16021965号-2</a>
                    </p>
                </div>
                <script>
                    ${data.code && data.code.javascript}
                </script>

            </body>

            </html>
        `;
    }
}
