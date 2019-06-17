"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = require("cheerio");
const axios_1 = require("axios");
axios_1.default.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer ' + '74ab1bc75c44f03ce22261a93b6b7e411262d826';
    config.baseURL = 'https://api.github.com/graphql';
    return config;
}, err => {
    return Promise.reject(err);
});
const handleUserInfo = (username) => {
    const query = `
    {
      user(login: "${username}"){
        name
        createdAt
        email
        avatarUrl
        bio
        url
        starredRepositories(first: 100 orderBy: {field: STARRED_AT, direction: DESC}) {
          nodes {
            name
            owner {
              login
            }
          }
        }
      }
    }
  `;
    return query;
};
const handleUserRepos = (username, createdAt) => {
    const query = `
    {
      rateLimit {
        cost
        limit
        remaining
        resetAt
      }
      user(login: "${username}") {
        repositories(affiliations: [OWNER, COLLABORATOR], isFork: false, first: 100, orderBy: {field: PUSHED_AT, direction: DESC}) {
          totalCount
          edges {
            node {
              name
              stargazers {
                totalCount
              }
              forkCount
              primaryLanguage {
                name
              }
              defaultBranchRef {
                target {
                  ... on Commit {
                    history(since: "${createdAt}") {
                      totalCount
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
    return query;
};
exports.handleUserCommits = (commits) => {
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
    for (let i = 0; i < parseSvg.length; i++) {
        const dataCount = +$(parseSvg[i]).attr('data-count');
        const dataDate = $(parseSvg[i]).attr('data-date');
        const dataYear = dataDate.slice(0, 4);
        const dataMonth = dataDate.slice(5, 7);
        if (obj.month !== '' && obj.month !== dataMonth) {
            lastMonth = obj.month;
            contribution.push(Object.assign({}, obj));
            obj.year = dataYear;
            obj.month = dataMonth;
            obj.count = dataCount;
        }
        else {
            obj.count += dataCount;
            obj.year = dataYear;
            obj.month = dataMonth;
        }
        total += dataCount;
    }
    if (obj.month !== lastMonth) {
        contribution.push(Object.assign({}, obj));
    }
    return {
        contribution,
        total
    };
};
const handleRateLimit = () => {
    const query = `
    rateLimit {
      remaining
      resetAt
    }
  `;
    return query;
};
const gqlQuery = (username, type, opt) => {
    switch (type) {
        case 'userInfo':
            return handleUserInfo(username);
        case 'userRepos':
            return handleUserRepos(username, opt.createdAt);
        case 'rateLimit':
            return handleRateLimit();
    }
};
exports.gqlSender = (username, type, opt = {}) => __awaiter(this, void 0, void 0, function* () {
    return axios_1.default.post('', {
        query: gqlQuery(username, type, opt)
    }).then(res => {
        return res.data.data;
    });
});
//# sourceMappingURL=github-report.util.js.map