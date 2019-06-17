const Joi = require('joi');
const axios = require('axios');
const mongoose = require("mongoose");
const ReqRouter = require('./decorator-router');
const models = require('../models');
const pageSchema = {
    limit: Joi.number().integer().min(1).max(100).default(10),
    page: Joi.number().integer().min(1).default(1),
};

@ReqRouter.ROUTER('/api/categories')
class CategoryApi {

    @ReqRouter.GET()
    static async list(req, res, next) {
        return res.json(await models.Category.find())
    }

    @ReqRouter.GET('/:_id')
    static async one(req, res, next) {
        const { _id } = req.params;
        return res.json(await models.Category.findById(_id))
    }

    @ReqRouter.POST()
    static async create(req, res, next) {
        const category = await models.Category.create(req.body);
        return res.json({ _id: category._id })
    }

    @ReqRouter.PUT('/:_id')
    static async update(req, res, next) {
        const { _id } = req.params;
        await models.Category.updateOne({ _id }, req.body);
        return res.json({ _id })
    }

    @ReqRouter.DELETE('/:_id')
    static async delete(req, res, next) {
        const { _id } = req.params;
        await models.Category.deleteOne({ _id });
        return res.json({ _id })
    }

}