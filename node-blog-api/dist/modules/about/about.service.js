"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var AboutService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const github_report_util_1 = require("../../utils/github-report.util");
const axios_1 = require("axios");
const index_config_1 = require("../../configs/index.config");
const LRU = require("lru-cache");
const cache = new LRU();
const getUsercommits = (username) => {
    return axios_1.default.get(`https://github.com/users/${username}/contributions`)
        .then(data => github_report_util_1.handleUserCommits(data.data));
};
const getUserRepos = (username, createdAt) => __awaiter(this, void 0, void 0, function* () {
    const res = yield github_report_util_1.gqlSender(username, 'userRepos', { createdAt });
    return res.user.repositories;
});
const promiseQueue = [
    getUserRepos,
    getUsercommits
];
let AboutService = AboutService_1 = class AboutService {
    static getUserInfo(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const userInfo = yield github_report_util_1.gqlSender(username, 'userInfo');
            return userInfo;
        });
    }
    getUserData(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const info = cache.get(index_config_1.default.github_secret_key);
            if (!info) {
                const result = yield AboutService_1.getUserInfo(username);
                const obj = {};
                obj.userInfo = result.user;
                const [userRepos, userCommits] = yield Promise.all(promiseQueue.map(item => item(username, obj.userInfo.createdAt)));
                obj.userRepos = userRepos;
                obj.userCommits = userCommits;
                cache.set(index_config_1.default.github_secret_key, JSON.stringify(obj), 1000 * 60 * 60 * 12);
                return obj;
            }
            return JSON.parse(info);
        });
    }
};
AboutService = AboutService_1 = __decorate([
    common_1.Injectable()
], AboutService);
exports.AboutService = AboutService;
//# sourceMappingURL=about.service.js.map