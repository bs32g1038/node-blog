const utils = require('../utils/github-report');
const axios = require('axios');
const config = require('../config');
const LRU = require("lru-cache");
const cache = new LRU();

const getLists = [
    'userRepos',
    'userCommits'
];

/**
 *
 * @param {String} username
 */
const getUsercommits = (username) => {
    return axios.get(`https://github.com/users/${username}/contributions`)
        .then(data => utils.handleUserCommits(data.data));
};

/**
 *
 * @param {String} username
 * @param {Date} createdAt
 */
const getUserRepos = async (username, createdAt) => {
    const res = await utils.gqlSender(username, 'userRepos', { createdAt });
    return res.user.repositories;
};


const promiseQueue = [
    getUserRepos,
    getUsercommits
];

class AboutApi {

    static async getUserInfo(req, res, next) {
        const username = req.params.username;
        const userInfo = await utils.gqlSender(username, 'userInfo');
        return userInfo;
    }

    static async getUserData(req, res, next) {
        let info = cache.get(config.github_secret_key);
        if (!info) {
            const result = await AboutApi.getUserInfo(req, res, next);
            const username = req.params.username;
            let obj = {};
            obj.userInfo = result.user;
            let results = await Promise.all(promiseQueue.map(item => item(username, obj.userInfo.createdAt)));
            for (let i in results) {
                obj[getLists[i]] = results[i];
            }
            cache.set(config.github_secret_key, JSON.stringify(obj), 1000 * 60 * 60);
            console.log(obj);
            return res.json({
                success: true,
                ...obj
            });
        }
        info = JSON.parse(info);
        res.json({
            success: true,
            ...info
        });
    }
}

module.exports = AboutApi;