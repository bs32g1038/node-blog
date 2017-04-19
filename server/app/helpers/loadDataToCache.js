"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cache = require("./cache");
const config_1 = require("../config");
const SettingService_1 = require("../service/SettingService");
let settingService = new SettingService_1.default();
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        let setting = yield cache.get(config_1.default.site_setting._id);
        console.log("配置信息：", setting);
    });
}
init();
