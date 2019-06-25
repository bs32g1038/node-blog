export class CreateCategoryDto {
    _id: string;
    name: string;
    order: number;
    articleCount: number;
    createdAt: string;
    updatedAt: string;
}

export class UpdateCategoryDto {
    _id: string;
    name: string;
    order: number;
    articleCount: number;
    createdAt: string;
    updatedAt: string;
}
