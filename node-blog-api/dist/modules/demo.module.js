"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const demo_controller_1 = require("./demo/demo.controller");
const demo_service_1 = require("./demo/demo.service");
const demo_model_1 = require("../models/demo.model");
let DemoModule = class DemoModule {
};
DemoModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forFeature([
                { name: 'demo', schema: demo_model_1.DemoSchema, collection: 'demo' }
            ])],
        controllers: [demo_controller_1.DemoController],
        providers: [demo_service_1.DemoService]
    })
], DemoModule);
exports.DemoModule = DemoModule;
//# sourceMappingURL=demo.module.js.map