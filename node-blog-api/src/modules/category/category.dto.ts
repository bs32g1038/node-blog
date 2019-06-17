export class CreateCategoryDto {
    name: string;
    order: number;
    articleCount: number;
}

export class UpdateCategoryDto {
    _id: string;
    name: string;
    order: number;
    articleCount: number;
}
