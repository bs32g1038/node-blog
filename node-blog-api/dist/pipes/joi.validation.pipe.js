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
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const common_1 = require("@nestjs/common");
let JoiValidationPipeTransform = class JoiValidationPipeTransform {
    constructor(schema) {
        this.schema = schema;
    }
    transform(value, metadata) {
        const { error } = Joi.validate(value, this.schema, { allowUnknown: true });
        if (error) {
            throw new common_1.BadRequestException('Validation failed' + error);
        }
        return value;
    }
};
JoiValidationPipeTransform = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [Object])
], JoiValidationPipeTransform);
exports.JoiValidationPipeTransform = JoiValidationPipeTransform;
exports.JoiValidationPipe = (schema) => common_1.UsePipes(new JoiValidationPipeTransform(schema));
//# sourceMappingURL=joi.validation.pipe.js.map