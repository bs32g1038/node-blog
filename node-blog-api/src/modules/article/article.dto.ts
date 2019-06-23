export class CreateArticleDto {
    _id: string;
    title: string;
    content: string;
    summary: string;
    screenshot: string;
    category: string;
    commentCount: number;
    viewsCount: number;
    isDeleted: boolean;
    isDraft: boolean;
    createdAt: string;
    updatedAt: string;
}

export class UpdateArticleDto {
    _id: string;
    title: string;
    content: string;
    summary: string;
    screenshot: string;
    category: string;
    commentCount: number;
    viewsCount: number;
    isDeleted: boolean;
    isDraft: boolean;
    createdAt: string;
    updatedAt: string;
}
