"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const multer = require("multer");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const crypto_util_1 = require("../../utils/crypto.util");
const path = require("path");
const fs = require("fs");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadSingle = upload.single('file');
let UploadService = class UploadService {
    constructor(fileModel, mediaModel) {
        this.fileModel = fileModel;
        this.mediaModel = mediaModel;
    }
    uploadSingalImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return uploadSingle(req, res, (err) => {
                if (err) {
                    return next(err);
                }
                const originalName = req.file.originalname;
                const mimetype = req.file.mimetype;
                const size = req.file.size;
                const suffix = path.extname(req.file.originalname);
                const name = crypto_util_1.md5(req.file.buffer);
                const fileName = name + suffix;
                const filePath = '/static/upload/' + new Date().getFullYear() + '/';
                const width = req.query.w;
                const height = req.query.h;
            });
        });
    }
    uploadStaticFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return uploadSingle(req, res, (err) => __awaiter(this, void 0, void 0, function* () {
                const originalName = req.file.originalname;
                const mimetype = req.file.mimetype;
                const size = req.file.size;
                const suffix = path.extname(req.file.originalname);
                const name = crypto_util_1.md5(req.file.buffer);
                const fileName = name + suffix;
                const filePath = '/static/upload/' + new Date().getFullYear() + '/';
                let category = 6;
                if (mimetype.toLowerCase().includes('mp4')) {
                    category = 1;
                }
                else if (mimetype.toLowerCase().includes('mp3')) {
                    category = 2;
                }
                if (category === 6) {
                    const imageTypes = ['png', 'jpg', 'jpeg'];
                    imageTypes.forEach(item => {
                        if (mimetype.toLowerCase().includes(item)) {
                            category = 3;
                        }
                    });
                }
                if (category === 6) {
                    const docsTypes = ['txt', 'doc', 'docx', 'pdf'];
                    docsTypes.forEach(item => {
                        if (mimetype.toLowerCase().includes(item)) {
                            category = 4;
                        }
                    });
                }
                yield fs.writeFileSync(path.resolve(__dirname, '../../..' + filePath) + '/' + fileName, req.file.buffer);
                if (req.query.parentId) {
                    yield this.fileModel.updateOne({ _id: req.query.parentId }, {
                        $inc: { fileCount: 1 }
                    });
                }
                const file = yield this.fileModel.create({
                    originalName,
                    name,
                    mimetype,
                    size,
                    suffix,
                    fileName,
                    filePath,
                    category,
                    parentId: req.query.parentId || null
                });
                return res.json({
                    _id: file._id,
                    url: filePath + fileName
                });
            }));
        });
    }
};
UploadService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('file')),
    __param(1, mongoose_2.InjectModel('media')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _b : Object])
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map