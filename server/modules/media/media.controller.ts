import { Controller, Get, Post, Body, Query, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { StandardPaginationSchema } from '../../validations/standard.pagination.validation';
import { MediaService } from './media.service';
import { Media } from '../../models/media.model';
import { JoiValidationPipe } from '../../pipes/joi.validation.pipe';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import Joi from '@hapi/joi';

@Controller('/api')
@UseGuards(RolesGuard)
export class MediaController {
    constructor(private readonly mediaService: MediaService) {}

    static idSchema = Joi.object({
        id: Joi.string()
            .default('')
            .max(50),
    });

    @Post('/medias')
    @Roles('admin')
    async create(@Body() media: Media) {
        return await this.mediaService.create(media);
    }

    @Put('/medias/:id')
    @Roles('admin')
    async update(@Param() params: { id: string }, @Body() media: Media) {
        return await this.mediaService.update(params.id, media);
    }

    @Get('/medias')
    @Roles('admin')
    @JoiValidationPipe(StandardPaginationSchema)
    async getMedias(@Query() query: { page: number; limit: number }) {
        const items = await this.mediaService.getMedias(
            {},
            {
                skip: Number(query.page),
                limit: Number(query.limit),
            }
        );
        const totalCount = await this.mediaService.count({});
        return {
            items,
            totalCount,
        };
    }

    @Get('/medias/:id')
    @Roles('admin')
    @JoiValidationPipe(MediaController.idSchema)
    async getMedia(@Param() params: { id: string }): Promise<Media | null> {
        return await this.mediaService.getMedia(params.id);
    }

    @Delete('/medias/:id')
    @Roles('admin')
    @JoiValidationPipe(MediaController.idSchema)
    async deleteMedia(@Param() params: { id: string }) {
        return await this.mediaService.deleteMedia(params.id);
    }
}
