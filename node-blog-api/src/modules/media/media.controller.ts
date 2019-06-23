import { Controller, Get, Post, Body, Query, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CreateMediaDto, UpdateMediaDto } from './media.dto';
import { StandardPaginationSchema } from '../../validations/standard.pagination.validation';
import { MediaService } from './media.service';
import { Media } from '../../models/media.model';
import { JoiValidationPipe } from '../../pipes/joi.validation.pipe';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import * as Joi from '@hapi/joi';

@Controller('/api')
@UseGuards(RolesGuard)
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }

    static idSchema = {
        id: Joi.string().default('').max(50)
    };

    @Post('/medias')
    @Roles('admin')
    async create(@Body() createMediaDto: CreateMediaDto) {
        return await this.mediaService.create(createMediaDto);
    }

    @Put('/medias/:id')
    @Roles('admin')
    async update(@Param() params: { id: string }, @Body() fileDto: UpdateMediaDto) {
        return await this.mediaService.update(params.id, fileDto);
    }

    @Get('/medias')
    @Roles('admin')
    @JoiValidationPipe(StandardPaginationSchema)
    async getMedias(@Query() query: { page: number, limit: number }) {
        const items = await this.mediaService.getMedias({}, {
            skip: Number(query.page),
            limit: Number(query.limit)
        });
        const totalCount = await this.mediaService.count({});
        return {
            items,
            totalCount
        };
    }

    @Get('/medias/:id')
    @JoiValidationPipe(MediaController.idSchema)
    async getMedia(@Param() params: { id: string }): Promise<Media> {
        return await this.mediaService.getMedia(params.id);
    }

    @Delete('/medias/:id')
    @JoiValidationPipe(MediaController.idSchema)
    @Roles('admin')
    async deleteMedia(@Param() params: { id: string })  {
        return await this.mediaService.deleteMedia(params.id);
    }
}
