import { Controller, Get, Post, Delete, UseGuards, UploadedFile, UseInterceptors, Res, Session } from '@nestjs/common';
import { FileService } from './file.service';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { ZodParam, ZodQuery, ZodBody } from '../../decorators/zod.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import {
    StandardPaginationDto,
    objectIdSchema,
    objectIdsSchema,
    standardPaginationSchema,
} from '@blog/server/zod/common.schema';
import { Response } from 'express';
import { createCanvas } from '@napi-rs/canvas';
import { FileEncodePipe } from '@blog/server/pipes/filename.encode.pipe';

// prettier-ignore
const aCode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

function getColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    if (r == 255 && g == 255 && b == 255) {
        r = 0;
        g = 0;
        b = 0;
    }
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

@Controller('/api')
@UseGuards(RolesGuard)
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Get('/files/captcha')
    async captcha(@Session() session: any, @Res() res: Response) {
        const canvas = createCanvas(120, 40);
        const ctx = canvas.getContext('2d');
        let code = '';
        for (let i = 0; i < 4; i++) {
            const x = 20 + i * 20;
            const y = 20 + Math.random() * 10;
            const index = Math.floor(Math.random() * aCode.length); //获取到一个随机的索引值
            const txt = aCode[index].toString(); //获取到数组里面的随机的内容
            code += txt;
            ctx.font = 'bold 20px 微软雅黑'; //设置文字样式
            ctx.fillStyle = getColor();
            ctx.fillText(txt, x, y);
        }
        session.captcha = code;
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * 120;
            const y = Math.random() * 40;
            ctx.strokeStyle = getColor();
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + 1, y + 1);
            ctx.stroke();
        }
        res.type('png');
        return res.send(await canvas.encode('png'));
    }

    @Post('/files/upload')
    @Roles('admin')
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile(FileEncodePipe) file: any) {
        return await this.fileService.uploadFile(file);
    }

    @Get('/files')
    @Roles('admin')
    async getFiles(@ZodQuery(standardPaginationSchema) query: StandardPaginationDto) {
        return await this.fileService.getFileList(query);
    }

    @Delete('/files/:id')
    @Roles('admin')
    async deleteFile(@ZodParam(objectIdSchema) params: { id: string }) {
        return await this.fileService.deleteFile(params.id);
    }

    @Delete('/files')
    @Roles('admin')
    deleteArticles(@ZodBody(objectIdsSchema) body: { ids: string[] }): Promise<any> {
        return this.fileService.batchDelete(body.ids);
    }
}
