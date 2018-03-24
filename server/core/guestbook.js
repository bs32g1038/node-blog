const Joi = require('joi');
const axios = require('axios');
const mongoose = require("mongoose");
const ReqRouter = require('./decorator-router');
const models = require('../models');
const auth = require('../utils/auth');

const pageSchema = {
    limit: Joi.number().integer().min(1).max(100).default(10),
    page: Joi.number().integer().min(1).default(1),
};

function getIpAddress(req) {
    let ipAddress;
    let headers = req.headers;
    let forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
    forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
}

@ReqRouter.ROUTER('/api/guestbooks')
class GuestbookApi {

    @ReqRouter.GET()
    static async list(req, res, next) {
        const pageInfo = Joi.validate(req.query, pageSchema);
        const fields = auth(req) ? '' : '-email';
        res.json(await models.Guestbook.find({}, fields, {
            skip: (pageInfo.value.page - 1) * pageInfo.value.limit,
            limit: pageInfo.value.limit
        }));
    }

    @ReqRouter.GET('/:_id')
    @ReqRouter.AUTH()
    static async one(req, res, next) {
        const { _id } = req.params;
        return res.json(await models.Guestbook.findById(_id));
    }

    @ReqRouter.POST()
    static async create(req, res, next) {
        const realIP = getIpAddress(req);
        const result = await axios.get('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&&ip=' + "183.48.33.250")
        if (result.data.province || result.data.city) {
            Object.assign(req.body, { location: result.data.province + " " + result.data.city })
        }
        const article = await models.Guestbook.create(req.body)
        res.json({ _id: article._id });
    }

    @ReqRouter.PUT('/:_id')
    @ReqRouter.AUTH()
    static async update(req, res, next) {
        const _id = req.params._id;
        await models.Guestbook.updateOne({ _id }, req.body);
        return res.status(201).json({ _id });
    }

    @ReqRouter.DELETE('/:_id')
    @ReqRouter.AUTH()
    static async delete(req, res, next) {
        const { _id } = req.params;
        await models.Guestbook.deleteOne({ _id })
        return res.json({ _id })
    }
}