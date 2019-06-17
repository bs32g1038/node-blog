import { Injectable } from '@nestjs/common';
import cheerio = require('cheerio');
import axios from 'axios';
import config from '../../configs/index.config';
import * as LRU from 'lru-cache';

const cache = new LRU();

const handleUserCommits = (commits) => {
    const $ = cheerio.load(commits);
    const contribution = [];
    const parseSvg = $('.day');
    let total = 0;
    const obj = {
        year: '',
        month: '',
        count: 0
    };
    let lastMonth = '';
    parseSvg.each((_, svg) => {
        const dataCount = +$(svg).attr('data-count');
        const dataDate = $(svg).attr('data-date'); // ex. 2017-01-23
        const dataYear = dataDate.slice(0, 4); // ex. 2017
        const dataMonth = dataDate.slice(5, 7); // ex. 01
        if (obj.month !== '' && obj.month !== dataMonth) {
            lastMonth = obj.month;
            contribution.push(Object.assign({}, obj));
            obj.year = dataYear;
            obj.month = dataMonth;
            obj.count = dataCount;
        } else {
            obj.count += dataCount;
            obj.year = dataYear;
            obj.month = dataMonth;
        }
        total += dataCount;
    });
    if (obj.month !== lastMonth) {
        contribution.push(Object.assign({}, obj));
    }
    return {
        contribution,
        total
    };
};

const getUserInfo = async (username: string) => {
    return axios.get(`https://api.github.com/users/${username}`)
        .then((res: any) => {
            const data = res.data;
            return {
                location: data.location,
                name: data.name,
                url: data.url,
                avatarUrl: data.avatar_url,
                bio: data.bio
            };
        });
};

/**
 *
 * @param {String} username
 */
const getUsercommits = (username: string) => {
    return axios.get(`https://github.com/users/${username}/contributions`)
        .then(res => handleUserCommits(res.data));
};

/**
 *
 * @param {String} username
 * @param {Date} createdAt
 */
const getUserRepos = async (username: string) => {
    return axios.get(`https://api.github.com/users/${username}/repos`)
        .then(res => {
            return res.data.map((item: any) => {
                if (item.fork) {
                    return null;
                }
                return {
                    name: item.name,
                    forkCount: item.forks_count,
                    stargazersCount: item.stargazers_count,
                    language: item.language
                };
            }).filter(item => item);
        });
};

@Injectable()
export class AboutService {

    async getUserData(username: string) {
        const info: any = cache.get(config.github_secret_key);
        if (!info) {
            const obj: {
                userInfo?: any,
                userRepos?: any,
                userCommits?: any
            } = {};
            const [userInfo, userRepos, userCommits] = await Promise.all([
                getUserInfo(username),
                getUserRepos(username),
                getUsercommits(username)
            ]);
            obj.userInfo = userInfo;
            obj.userRepos = userRepos;
            obj.userCommits = userCommits;
            cache.set(config.github_secret_key, JSON.stringify(obj), 1000 * 60 * 60 * 12);
            return obj;
        }
        return JSON.parse(info);
    }

}
