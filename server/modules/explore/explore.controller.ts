import { Controller, Get, Post, Delete, Put, UseGuards, Body } from '@nestjs/common';
import { ExploreService } from './explore.service';
import { Roles } from '@blog/server/decorators/roles.decorator';
import { JoiQuery, JoiParam } from '@blog/server/decorators/joi.decorator';
import { RolesGuard } from '@blog/server/guards/roles.guard';
import { ObjectIdSchema, StandardPaginationSchema } from '@blog/server/joi';
import { Explore } from '@blog/server/models/explore.model';

@Controller('/api')
@UseGuards(RolesGuard)
export class ExploreController {
    constructor(private readonly exploreService: ExploreService) {}

    @Post('/explore')
    @Roles('admin')
    async create(@Body() explore: Explore) {
        return await this.exploreService.create(explore);
    }

    @Put('/explore/:id')
    @Roles('admin')
    async update(@JoiParam(ObjectIdSchema) params: { id: string }, @Body() explore: Explore) {
        return await this.exploreService.update(params.id, explore);
    }

    @Get('/explore')
    async getExploreList(@JoiQuery(StandardPaginationSchema) query: { page: number; limit: number }) {
        return await this.exploreService.getExploreList({
            page: query.page,
            limit: query.limit,
        });
    }

    @Get('/explore/:id')
    @Roles('admin')
    async getExplore(@JoiParam(ObjectIdSchema) params: { id: string }): Promise<Explore | null> {
        return await this.exploreService.getExplore(params.id);
    }

    @Delete('/explore/:id')
    @Roles('admin')
    async deleteExplore(@JoiParam(ObjectIdSchema) params: { id: string }) {
        return await this.exploreService.deleteExplore(params.id);
    }
}
