import { Controller, Get, Post, Delete, Put, UseGuards } from '@nestjs/common';
import { MediaService } from './media.service';
import { Media, MediaJoiSchema } from '../../models/media.model';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { JoiParam, JoiQuery, JoiBody } from '../../decorators/joi.decorator';
import { ObjectIdSchema, StandardPaginationSchema } from '../../joi';

@Controller('/api')
@UseGuards(RolesGuard)
export class MediaController {
    constructor(private readonly mediaService: MediaService) {}

    @Post('/medias')
    @Roles('admin')
    async create(@JoiBody(MediaJoiSchema) media: Media) {
        return await this.mediaService.create(media);
    }

    @Put('/medias/:id')
    @Roles('admin')
    async update(@JoiParam(ObjectIdSchema) params: { id: string }, @JoiBody(MediaJoiSchema) media: Media) {
        return await this.mediaService.update(params.id, media);
    }

    @Get('/medias')
    @Roles('admin')
    async getMedias(@JoiQuery(StandardPaginationSchema) query: { page: number; limit: number }) {
        return await this.mediaService.getMediaList(query);
    }

    @Get('/medias/:id')
    @Roles('admin')
    async getMedia(@JoiParam(ObjectIdSchema) params: { id: string }): Promise<Media | null> {
        return await this.mediaService.getMedia(params.id);
    }

    @Delete('/medias/:id')
    @Roles('admin')
    async deleteMedia(@JoiParam(ObjectIdSchema) params: { id: string }) {
        return await this.mediaService.deleteMedia(params.id);
    }
}
