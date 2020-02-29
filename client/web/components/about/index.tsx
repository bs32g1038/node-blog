import React from 'react';
import data from './data';
import GithubContribution from './github-contribution';
import GithubPinnedList from './github-pinned-list';
import AboutHeader from './header';
import { Box } from '@chakra-ui/core';

const totalContributionLastYear = (data.userCommits && data.userCommits.total) || 0;
const values = data.userCommits.contribution.map(item => {
    return {
        year: item.year,
        month: item.month,
        date: item.year + '-' + item.month + '-' + item.day,
        count: item.count,
    };
});

export const About = () => {
    return (
        <Box flex="1 0 auto" color="theme.primaryText">
            <Box className="bio" py={2}>
                专注于web前端开发。喜欢新事物，关注前端动态，对新的技术有追求；涉猎广泛，喜欢 coding。
            </Box>
            <Box lineHeight={2}>
                本博客是一个技术性博客，平时主要发布一些关于web前端以及后端开发的文章，这其中包括第三方的文章，也包括我自己总结的一些文章。
                我会一直坚持写作，把自己的一些笔记记录下来，以作备忘和分享。
            </Box>
            <AboutHeader userInfo={data.userInfo}></AboutHeader>
            <Box mt={2}>
                <GithubContribution
                    values={values}
                    totalContributionLastYear={totalContributionLastYear}
                ></GithubContribution>
            </Box>
            <GithubPinnedList userRepos={data.userRepos}></GithubPinnedList>
            <Box mt={3}>上面是我众多开源项目中的几个， 更多的开源项目在github上。希望我的项目能够帮助到你。</Box>
        </Box>
    );
};
