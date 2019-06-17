"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const index_config_1 = require("../configs/index.config");
exports.auth = (req) => {
    if (req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization')) {
        try {
            return jwt.verify(req.headers.authorization, index_config_1.default.token_secret_key);
        }
        catch (err) {
            return null;
        }
    }
    return null;
};
//# sourceMappingURL=auth.util.js.map