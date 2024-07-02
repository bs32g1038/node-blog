import { Controller, Get, UseGuards, Post, Put } from '@nestjs/common';
import { DraftService } from './draft.service';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { ZodBody, ZodParam, ZodQuery } from '@blog/server/decorators/zod.decorator';
import { CreateDraftDto, UpdateDraftDto, createDraftZodSchema, updateDraftZodSchema } from './draft.zod.schema';
import { objectIdSchema, standardPaginationSchema } from '@blog/server/zod/common.schema';
import { z } from 'zod';

@Controller('/api')
@UseGuards(RolesGuard)
export class DraftController {
    public constructor(private readonly draftService: DraftService) {}

    @Post('/drafts')
    @Roles('admin')
    public async create(@ZodBody(createDraftZodSchema) draft: CreateDraftDto) {
        return await this.draftService.create(draft);
    }

    @Put('/drafts/:id')
    @Roles('admin')
    public async update(
        @ZodParam(objectIdSchema) params: { id: string },
        @ZodBody(updateDraftZodSchema) draft: UpdateDraftDto
    ) {
        return await this.draftService.update(params.id, draft);
    }

    @Get('/drafts')
    @Roles('admin')
    public async getDrafts(
        @ZodQuery(
            standardPaginationSchema.merge(
                z
                    .object({
                        type: z.string(),
                    })
                    .partial()
            )
        )
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
    public async get(@ZodParam(objectIdSchema) params: { id: string }) {
        return await this.draftService.getDraft(params.id);
    }
}
