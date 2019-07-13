export class CreateCommentDto {
    nickName: string;
    email: string;
    website: string;
    reply: string;
    article: string;
    location: string;
    pass: boolean;
    identity: number;
}

export class UpdateCommentDto {
    _id: string;
    nickName: string;
    email: string;
    website: string;
    reply: string;
    article: string;
    location: string;
    pass: boolean;
    identity: number;
}
