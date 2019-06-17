export class CreateDemoDto {
    title: string;
    content: string;
    summary: string;
    screenshot: string;
    category: string;
    commentCount: number;
    viewsCount: number;
    isDeleted: boolean;
}

export class UpdateDemoDto {
    _id: string;
    title: string;
    content: string;
    summary: string;
    screenshot: string;
    category: string;
    commentCount: number;
    viewsCount: number;
    isDeleted: boolean;
}
