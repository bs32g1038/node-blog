import styled from '@emotion/styled';
import React from 'react';
import media from '../../utils/media';
import data from './data';
import GithubContribution from './github-contribution';
import GithubPinnedList from './github-pinned-list';
import AboutHeader from './header';

const AboutDiv = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    background-color: #fff;
    ${media.phone`
        padding: 10px;
    `};
    .bio {
        padding: 10px 18px;
        background-color: #f6f6f6;
        border-radius: 3px;
        border: 1px dashed #d5d3d3;
    }
    .react-calendar-heatmap {
        margin-bottom: -20px;
    }
`;

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
        <AboutDiv className="about">
            <p className="bio">
                专注于web前端开发。喜欢新事物，关注前端动态，对新的技术有追求；涉猎广泛，喜欢 coding。
            </p>
            <p>
                本博客是一个技术性博客，平时主要发布一些关于web前端以及后端开发的文章，这其中包括第三方的文章，也包括我自己总结的一些文章。
                我会一直坚持写作，把自己的一些笔记记录下来，以作备忘和分享。
            </p>
            <AboutHeader userInfo={data.userInfo}></AboutHeader>
            <GithubContribution
                values={values}
                totalContributionLastYear={totalContributionLastYear}
            ></GithubContribution>
            <GithubPinnedList userRepos={data.userRepos}></GithubPinnedList>
            <p>上面是我众多开源项目中的几个， 更多的开源项目在github上。希望我的项目能够帮助到你。</p>
        </AboutDiv>
    );
};
