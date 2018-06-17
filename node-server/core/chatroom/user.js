const models = require('../../models/chatroom');

class UserApi {

    static async list(req, res, next) {
        return res.json(await models.User.find());
    }

    static async login(req, res, next) {
        const { account, password } = req.body;
        const user = await models.User.findOne({
            account,
            password
        });
        if (user) {
            res.send({
                account: user.account,
                avatar: user.avatar,
                nickName: user.nickName
            });
        } else {
            return res.status(401).json({
                msg: 'wrong username or password!'
            });
        }
    }

    static async register(req, res, next) {
        return models.User.create(req.body).then((user) => {
            res.status(201).json({ _id: user._id });
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
        await models.User.deleteOne({ _id });
        return res.json({ _id });
    }

}
module.exports = UserApi;