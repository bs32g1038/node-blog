import { Injectable } from '@nestjs/common';
import { gqlSender, handleUserCommits } from '../../utils/github-report.util';
import axios from 'axios';
import config from '../../configs/index.config';
import * as LRU from 'lru-cache';

const cache = new LRU();

/**
 *
 * @param {String} username
 */
const getUsercommits = (username: string) => {
    return axios.get(`https://github.com/users/${username}/contributions`)
        .then(data => handleUserCommits(data.data));
};

/**
 *
 * @param {String} username
 * @param {Date} createdAt
 */
const getUserRepos = async (username: string, createdAt) => {
    const res = await gqlSender(username, 'userRepos', { createdAt });
    return res.user.repositories;
};

const promiseQueue = [
    getUserRepos,
    getUsercommits
];

@Injectable()
export class AboutService {

    static async getUserInfo(username: string) {
        const userInfo = await gqlSender(username, 'userInfo');
        return userInfo;
    }

    async getUserData(username: string) {
        const info: any = cache.get(config.github_secret_key);
        if (!info) {
            const result = await AboutService.getUserInfo(username);
            const obj: {
                userInfo?: any,
                userRepos?: any,
                userCommits?: any
            } = {};
            obj.userInfo = result.user;
            const [userRepos, userCommits] = await Promise.all(promiseQueue.map(item => item(username, obj.userInfo.createdAt)));
            obj.userRepos = userRepos;
            obj.userCommits = userCommits;
            cache.set(config.github_secret_key, JSON.stringify(obj), 1000 * 60 * 60 * 12);
            return obj;
        }
        return JSON.parse(info);
    }

}
