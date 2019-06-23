export class CreateDemoDto {
    title: string;
    content: string;
    visitCount: number;
}

export class UpdateDemoDto {
    _id: string;
    title: string;
    content: string;
    visitCount: number;
}
