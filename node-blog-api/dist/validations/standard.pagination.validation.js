"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
exports.StandardPaginationSchema = Joi.object().keys({
    page: Joi.number().default(1).min(1).max(100),
    limit: Joi.number().default(10).min(10).max(1000)
});
//# sourceMappingURL=standard.pagination.validation.js.map