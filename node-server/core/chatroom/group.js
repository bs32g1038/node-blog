const models = require('../../models/chatroom');

class GroupApi {

    static async list(req, res, next) {
        return res.json(await models.Group.find());
    }

    static async one(req, res, next) {
        const { _id } = req.params;
        return res.json(await models.Group.findById(_id));
    }

    static async create(req, res, next) {
        return models.Group.create(req.body).then((group) => {
            res.status(201).json({ _id: group._id });
        }).catch((err) => next(err));
    }

    static async update(req, res, next) {
        const { _id } = req.params;
        return models.Group.updateOne({ _id }, req.body, { runValidators: true }).then(() => {
            return res.json({ _id });
        }).catch((err) => next(err));
    }

    static async delete(req, res, next) {
        const { _id } = req.params;
        await models.Group.deleteOne({ _id });
        return res.json({ _id });
    }

}
module.exports = GroupApi;