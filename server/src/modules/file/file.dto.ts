export class CreateFileDto {
    _id: string;
    originalName: string;
    name: string;
    mimetype: string;
    size: number;
    suffix: string;
    fileName: string;
    filePath: string;
    isdir: string;
    category: number;
    parentId: string;
    fileCount: number;
}

export class UpdateFileDto {
    _id: string;
    originalName: string;
    name: string;
    mimetype: string;
    size: number;
    suffix: string;
    fileName: string;
    filePath: string;
    isdir: string;
    category: number;
    parentId: string;
    fileCount: number;
}
