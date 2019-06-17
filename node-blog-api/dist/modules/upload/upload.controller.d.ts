import { UploadService } from './upload.service';
import { Request, Response, NextFunction } from 'express';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadSingalImage(req: Request, res: Response, next: NextFunction): Promise<any>;
    uploadStaticFile(req: Request, res: Response, next: NextFunction): Promise<any>;
}
