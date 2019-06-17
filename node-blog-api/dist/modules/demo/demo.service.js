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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
let DemoService = class DemoService {
    constructor(demoModel) {
        this.demoModel = demoModel;
    }
    create(createDemoDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const demo = yield this.demoModel.create(createDemoDto);
            return demo;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const demo = yield this.demoModel.findByIdAndUpdate({ _id: id }, data);
            return demo;
        });
    }
    getDemos(query, option) {
        return __awaiter(this, void 0, void 0, function* () {
            const { skip = 1, limit = 10, sort = {} } = option;
            const filter = Object.assign({}, query);
            return yield this.demoModel.find(filter, {}, {
                skip: (skip - 1) * limit,
                limit,
                sort
            });
        });
    }
    getDemo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const demo = yield this.demoModel.findById(id);
            return demo;
        });
    }
    deleteDemo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const demo = yield this.demoModel.findById(id);
            yield this.demoModel.deleteOne({ _id: id });
            return demo;
        });
    }
    count(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = Object.assign({}, query);
            return yield this.demoModel.countDocuments(filter);
        });
    }
};
DemoService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('demo')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], DemoService);
exports.DemoService = DemoService;
//# sourceMappingURL=demo.service.js.map