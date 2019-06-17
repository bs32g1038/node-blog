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
const Joi = require("joi");
const index_config_1 = require("../../configs/index.config");
const jwt = require("jsonwebtoken");
const crypto = require("../../utils/crypto.util");
const schema = Joi.object().keys({
    account: Joi.string().min(3).max(30).required().error(new Error('账号长度在3-30之间！')),
    password: Joi.string().min(3).max(30).required().error(new Error('密码长度在3-30之间！'))
});
let LoginService = class LoginService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    getFirstLoginInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.userModel.count({});
            if (count <= 0) {
                return {
                    msg: '你是首次登陆，该账号将为你的管理员账号，请务必记住！直接登陆即可生成账号！'
                };
            }
            return '';
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = data.account;
            const password = data.password;
            const count = yield this.userModel.count({});
            const result = Joi.validate(data, schema);
            if (count <= 0) {
                if (result.error) {
                    return {
                        msg: '你是首次登陆，该账号将为你的管理员账号，请务必记住！' + result.error.message
                    };
                }
                else {
                    yield this.userModel.create({
                        account,
                        password: crypto.sha1(password)
                    });
                    return {
                        token: jwt.sign({ account }, index_config_1.default.token_secret_key, {
                            expiresIn: 60 * 60
                        })
                    };
                }
            }
            else {
                const user = yield this.userModel.findOne({
                    account,
                    password: crypto.sha1(password)
                });
                if (user) {
                    return {
                        token: jwt.sign({
                            account,
                            roles: ['admin']
                        }, index_config_1.default.token_secret_key, {
                            expiresIn: 60 * 60
                        })
                    };
                }
                else {
                    return {
                        msg: '用户名或者密码输入有误，请重新检查后再登陆！'
                    };
                }
            }
        });
    }
};
LoginService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('user')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map