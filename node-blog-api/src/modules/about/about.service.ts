import { Injectable } from '@nestjs/common';
import cheerio = require('cheerio');
import axios from '../../utils/axios.utils';
import config from '../../configs/index.config';
import * as LRU from 'lru-cache';
import { GetUserDataDto, UserCommits, Contribution, UserInfo } from './about.dto';

const cache = new LRU();

const handleUserCommits = (commits): UserCommits => {
    const $ = cheerio.load(commits);
    const contribution: Contribution[] = [];
    const parseSvg = $('.day');
    let total = 0;
    parseSvg.each((_, svg) => {
        const dataCount = +$(svg).attr('data-count');
        const dataDate = $(svg).attr('data-date'); // ex. 2017-01-23
        const dataYear = dataDate.slice(0, 4); // ex. 2017
        const dataMonth = dataDate.slice(5, 7); // ex. 01
        const dataDay = dataDate.slice(8, 10); // ex. 01
        const obj: any = {};
        obj.year = dataYear;
        obj.month = dataMonth;
        obj.day = dataDay;
        obj.count = dataCount;
        contribution.push(obj);
        total += dataCount;
    });
    return {
        contribution,
        total
    };
};

const getUserInfo = async (username: string): Promise<UserInfo> => {
    return axios.get(`https://api.github.com/users/${username}`)
        .then((res: any) => {
            const data = res.data;
            const info = new UserInfo();
            info.name = data.name;
            info.url = data.url;
            info.location = data.location;
            info.avatarUrl = data.avatarUrl;
            info.bio = data.bio;
            return info;
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
                    language: item.language,
                    description: item.description
                };
            }).filter(item => item);
        });
};

@Injectable()
export class AboutService {

    async getUserData(username: string): Promise<GetUserDataDto> {
        const info: any = cache.get(config.github_secret_key);
        if (!info) {
            const obj: GetUserDataDto = {};
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
