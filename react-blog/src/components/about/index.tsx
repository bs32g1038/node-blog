import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import siteInfo from '../../config/site-info';
import { fetchUserProfile } from '../../redux/reducers/about';
import GithubContribution from './github-contribution';
import GithubPinnedList from './github-pinned-list';
import AboutHeader from './header';
import Skills from './skills';

const AboutDiv = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    background-color: #fff;
    .bio {
        padding: 10px 18px;
        background-color: #f6f6f6;
        border-radius: 3px;
        border: 1px dashed #d5d3d3;
    }
    .react-calendar-heatmap {
        margin-bottom: -20px
    }
`;

export const asyncData = (store: any) => {
    return store.dispatch(fetchUserProfile('bs32g1038'));
};

const C = (props: any) => {

    useEffect(() => {
        const { profile } = props._DB;
        if (profile) {
            return;
        }
        setTimeout(() => {
            asyncData({ dispatch: props.dispatch });
        }, 50);
    }, [1]);

    const userProfile = props._DB.profile;
    let values = [];
    let userRepos;
    let userInfo;
    let totalContributionLastYear;
    if (userProfile) {
        userRepos = userProfile.userRepos;
        userInfo = userProfile.userInfo;
        totalContributionLastYear = userProfile.userCommits && userProfile.userCommits.total || 0;
        if (userProfile && userProfile.userCommits && userProfile.userCommits.contribution) {
            values = userProfile.userCommits.contribution.map((item: any) => {
                return {
                    year: item.year,
                    month: item.month,
                    date: item.year + '-' + item.month + '-' + item.day,
                    count: item.count,
                };
            });
        }
    } else {
        userInfo = {};
        userRepos = [];
    }
    return (
        <AboutDiv className="about">
            <Helmet title={siteInfo.name + '-关于'}></Helmet>
            <p className="bio">
                专注于web前端开发。喜欢新事物，关注前端动态，对新的技术有追求；涉猎广泛，喜欢 coding。
            </p>
            <p>
                本博客是一个技术性博客，平时主要发布一些关于web前端以及后端开发的文章，这其中包括第三方的文章，也包括我自己总结的一些文章。 我会一直坚持写作，把自己的一些笔记记录下来，以作备忘和分享。
            </p>
            <AboutHeader userInfo={userInfo}></AboutHeader>
            <GithubContribution values={values} totalContributionLastYear={totalContributionLastYear}></GithubContribution>
            <GithubPinnedList userRepos={userRepos}></GithubPinnedList>
            <Skills></Skills>
        </AboutDiv>
    );

};

export const About = connect(
    (state: any) => ({
        _DB: state.about
    })
)(C as any);