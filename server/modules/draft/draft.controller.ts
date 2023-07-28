import { Controller, Get, Delete, UseGuards, Post, Put } from '@nestjs/common';
import { DraftService } from './draft.service';
import { Draft, DraftJoiSchema } from '../../models/draft.model';
import { Roles } from '../../decorators/roles.decorator';
import { JoiQuery, JoiParam, JoiBody } from '../../decorators/joi.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import Joi, { ObjectIdSchema, StandardPaginationSchema, generateObjectIdsSchema } from '../../joi';

@Controller('/api')
@UseGuards(RolesGuard)
export class DraftController {
    public constructor(private readonly draftService: DraftService) {}

    @Post('/drafts')
    @Roles('admin')
    public async create(@JoiBody(DraftJoiSchema, { method: 'post' }) draft: Draft) {
        return await this.draftService.create(draft);
    }

    @Put('/drafts/:id')
    @Roles('admin')
    public async update(@JoiParam(ObjectIdSchema) params: { id: string }, @JoiBody(DraftJoiSchema) draft: Draft) {
        return await this.draftService.update(params.id, draft);
    }

    @Get('/drafts')
    @Roles('admin')
    public async getDrafts(
        @JoiQuery({
            type: Joi.string(),
            ...StandardPaginationSchema,
        })
        query: {
            page: number;
            limit: number;
            type: string;
        }
    ) {
        return this.draftService.getList(query);
    }

    @Get('/drafts/:id')
    @Roles('admin')
    public async get(@JoiParam(ObjectIdSchema) params: { id: string }) {
        return await this.draftService.getDraft(params.id);
    }

    @Delete('/articles/:id')
    @Roles('admin')
    public async deleteDraft(@JoiParam(ObjectIdSchema) params: { id: string }): Promise<Draft | null> {
        // return await this.articleService.deleteArticle(params.id);
        return null;
    }

    @Delete('/articles')
    @Roles('admin')
    deleteDrafts(@JoiBody(generateObjectIdsSchema('articleIds')) body: { articleIds: string[] }): Promise<any> {
        return null;
    }
}
