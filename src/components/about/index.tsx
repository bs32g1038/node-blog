import styled from '@emotion/styled';
import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import siteInfo from '../../config/site-info';
import { fetchUserProfile } from '../../redux/reducers/about';
import media from '../../utils/media';
import ContentLoader from '../content-loader';
import PieChart from './PieChart';

const AboutDiv = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    background-color: #fff;
    .resume {
        text-align: center;
        font-size: 24px;
    }
    .about-header {
        flex: 1 0 auto;
        display: flex;
        flex-direction: row;
        border-bottom: 2px solid #444;
        .person-base {
            flex: 1 0 auto;
            .name {
                font-size: 20px;
            }
            .aim {
                font-size: 12px;
            }
            ${media.phone`
                display: none;
            `};
        }
        .person-info {
            flex: 1 0 auto;
            padding: 5px;
            list-style: none;
            li {
                font-size: 12px;
                padding: 5px;
            }
        }
        .person-img {
            flex: 1 0 auto;
            text-align: right;
            img {
                width: 90px;
                height: 90px;
                border-radius: 2px;
            }
            h3{
                display: none;
            }
            ${media.phone`
                flex: auto;
                text-align: left;
                img{
                    width: 70px;
                    height: 70px;
                }
                h3{
                    font-size: 12px;
                    display: block;
                }
            `};
        }
    }

    .pie-chart{
        display: flex;
        ${media.phone`
            display: block;
        `};
    }

    .skills-list {
        display: flex;
    }

    .skills-list ul {
        list-style: none;
        padding-left: 0;
        margin: 0;
        flex: 1 0 auto;
        width: 50%;
    }

    .skills-list ul li .progress {
        position: relative;
        display: block;
        width: 100%;
        height: 4px;
        background: #eee;
    }

    .skills-list ul li .progress .percentage {
        position: absolute;
        left: 0;
        top: 0;
        width: 0%;
        height: 100%;
        background: #2eca7f;
        transition: all 0.6s ease 0s;
        border-radius: 4px;
        &.html{
            background-color: #e892bb;
        }
        &.css{
            background-color: #ac97e0;
        }
        &.javascript{
            background-color: #e0b176;
        }
        &.nodejs{
            background-color: #4cf3ff;
        }
        &.mongodb{
            background-color: #709441;
        }
        &.react{
            background-color: #7fc8f8;
        }
        &.vue{
            background-color: #51b1ef;
        }
    }

    .skills-list ul li .progress {
        position: relative;
        display: block;
        width: 100%;
        height: 8px;
        background: #eee;
        border-radius: 4px;
    }

    .skills-list ul li {
        position: relative;
        padding: 15px 10px 0;
    }

    .skills-list ul li .name {
        margin: 0 0 11px 0;
        line-height: 16px;
        font-weight: 400;
    }
`;

const today = new Date();

class About extends React.Component<any, any> {

    public static asyncData(store: any) {
        return store.dispatch(fetchUserProfile('bs32g1038'));
    }

    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: false
        };
    }

    public componentDidMount() {
        const { profile } = this.props._DB;
        if (profile) {
            return;
        }
        this.setState({
            isLoading: true
        });
        About.asyncData({ dispatch: this.props.dispatch }).then(() => {
            this.setState({
                isLoading: false
            });
        });
    }

    public render() {
        const userProfile = this.props._DB.profile;
        let values = [];
        let userRepos;
        let totalContributionLastYear;
        if (userProfile) {
            userRepos = userProfile.userRepos;
            totalContributionLastYear = userProfile.userCommits && userProfile.userCommits.total || 0;
            if (userProfile && userProfile.userCommits && userProfile.userCommits.contribution) {
                values = userProfile.userCommits.contribution.map((item: any) => {
                    return {
                        year: item.year,
                        date: item.year + '-' + item.month,
                        count: item.count,
                    };
                });
            }
        }
        return (
            <AboutDiv className="about">
                {
                    this.state.isLoading ?
                        <>
                            <Helmet title={siteInfo.name + '-关于'}></Helmet>
                            <h1 className="resume">
                                <ContentLoader width={720} height={40}>
                                    <rect x="260" y="0" width="200" height="40"></rect>
                                </ContentLoader>
                            </h1>
                            <ContentLoader width={720} height={30}>
                                <rect x="0" y="0" rx="2" ry="2" width="720" height="30"></rect>
                            </ContentLoader>
                            <ContentLoader width={720} height={100}>
                                <rect x="0" y="10" rx="2" ry="2" width="160" height="100"></rect>
                                <rect x="190" y="10" rx="2" ry="2" width="160" height="100"></rect>
                                <rect x="370" y="10" rx="2" ry="2" width="160" height="100"></rect>
                                <rect x="550" y="10" rx="2" ry="2" width="160" height="100"></rect>
                            </ContentLoader>
                            <ContentLoader width={720} height={30}>
                                <rect x="0" y="20" rx="2" ry="2" width="720" height="30"></rect>
                            </ContentLoader>
                            <ContentLoader width={720} height={100}>
                                <rect x="0" y="20" rx="2" ry="2" width="720" height="100"></rect>
                            </ContentLoader>
                            <ContentLoader width={720} height={180}>
                                <rect x="0" y="20" rx="2" ry="2" width="370" height="30"></rect>
                                <rect x="0" y="70" rx="2" ry="2" width="250" height="30"></rect>
                                <rect x="0" y="120" rx="2" ry="2" width="370" height="30"></rect>
                                <circle cx="600" cy="80" r="60"></circle>
                            </ContentLoader>
                            <ContentLoader width={720} height={260}>
                                <rect x="0" y="0" width="720" height="20"></rect>
                                <rect x="40" y="40" width="460" height="30"></rect>
                                <rect x="40" y="90" width="280" height="20"></rect>
                                <rect x="40" y="130" width="280" height="20"></rect>
                                <rect x="40" y="170" width="280" height="20"></rect>
                                <rect x="40" y="210" width="280" height="20"></rect>
                            </ContentLoader>
                            <ContentLoader width={720} height={260}>
                                <rect x="0" y="0" width="720" height="20"></rect>
                                <rect x="40" y="40" width="460" height="30"></rect>
                                <rect x="40" y="90" width="280" height="20"></rect>
                                <rect x="40" y="130" width="280" height="20"></rect>
                                <rect x="40" y="170" width="280" height="20"></rect>
                                <rect x="40" y="210" width="280" height="20"></rect>
                            </ContentLoader>
                            <ContentLoader width={720} height={260}>
                                <rect x="0" y="0" width="720" height="20"></rect>
                                <rect x="40" y="40" width="460" height="30"></rect>
                                <rect x="40" y="90" width="280" height="20"></rect>
                                <rect x="40" y="130" width="280" height="20"></rect>
                                <rect x="40" y="170" width="280" height="20"></rect>
                                <rect x="40" y="210" width="280" height="20"></rect>
                            </ContentLoader>
                        </>
                        :
                        <>
                            <Helmet title={siteInfo.name + '-关于'}></Helmet>
                            <h1 className="resume">--关于--</h1>
                            <p style={{ padding: '10px 18px', backgroundColor: '#efefef', borderRadius: '4px' }}>
                                专注于web前端开发。喜欢新事物，关注前端动态，对新的技术有追求；涉猎广泛，喜欢 coding。
                            </p>
                            <p style={{ padding: '0 10px' }}>
                                本博客是一个技术性博客，平时主要发布一些关于web前端以及后端开发的文章，这其中包括第三方的文章，也包括我自己总结的一些文章。 我会一直坚持写作，把自己的一些笔记记录下来，以作备忘和分享。
                            </p>
                            <div className="about-header">
                                <div className="person-base">
                                    <h2 className="name">冷夜流星</h2>
                                    <h3 className="aim">求职目标：web前端工程师</h3>
                                </div>
                                <ul className="person-info">
                                    <li><i className="fa fa-user fa-fw"></i>2*岁</li>
                                    <li><i className="fa fa-phone fa-fw"></i>185(*^_^*)7248</li>
                                    <li><i className="fa fa-flag fa-fw"></i>计算机科学与技术</li>
                                </ul>
                                <ul className="person-info">
                                    <li><i className="fa fa-map-marker fa-fw"></i>广东省广州市</li>
                                    <li><i className="fa fa-envelope fa-fw"></i>bs32g1038@163.com</li>
                                    <li><i className="fa fa-university fa-fw"></i>大学本科</li>
                                </ul>
                                <div className="person-img">
                                    <img src="/public/images/avatar.png" alt="头像" />
                                    <h3 className="aim">web前端工程师</h3>
                                </div>
                            </div>
                            <p>Github {totalContributionLastYear} contributions in the last year</p>
                            <CalendarHeatmap
                                startDate={(values[0] && values[0].year + '-1-1') || (new Date().getFullYear()) - 1 + '-1-1'}
                                endDate={today}
                                values={values}
                                classForValue={(value: any) => {
                                    if (!value) {
                                        return 'color-empty';
                                    }
                                    return `color-github-${value.count}`;
                                }}
                                tooltipDataAttrs={(value: any) => {
                                    if (!value.date) {
                                        return {};
                                    }
                                    return {
                                        'data-tip': `${value.date} has count: ${value.count}`,
                                    };
                                }}
                                showWeekdayLabels={true}
                            />
                            <ReactTooltip></ReactTooltip>
                            <div className="pie-chart">
                                <h3 style={{ minWidth: 140 }}>Stars per Repo(top 12)</h3>
                                <PieChart userRepos={userRepos}></PieChart>
                            </div>
                            <div className="skills-list">
                                <ul>
                                    <li className="border-line-h">
                                        <div className="name">HTML5</div>
                                        <div className="progress">
                                            <div className="percentage html" style={{ width: '80%' }} title="80%"></div>
                                        </div>
                                    </li>
                                    <li className="border-line-h">
                                        <div className="name">CSS3</div>
                                        <div className="progress">
                                            <div className="percentage css" style={{ width: '85%' }} title="85%"></div>
                                        </div>
                                    </li>
                                    <li className="border-line-h">
                                        <div className="name">Mongodb</div>
                                        <div className="progress">
                                            <div className="percentage mongodb" style={{ width: '75%' }} title="75%"></div>
                                        </div>
                                    </li>
                                    <li className="border-line-h">
                                        <div className="name">Vue/Vue-router/Vuex</div>
                                        <div className="progress">
                                            <div className="percentage vue" style={{ width: '80%' }} title="80%"></div>
                                        </div>
                                    </li>
                                </ul>
                                <ul>
                                    <li className="border-line-h">
                                        <div className="name">Javascript</div>
                                        <div className="progress">
                                            <div className="percentage javascript" style={{ width: '85%' }} title="85%"></div>
                                        </div>
                                    </li>
                                    <li className="border-line-h">
                                        <div className="name">NODEJS</div>
                                        <div className="progress">
                                            <div className="percentage nodejs" style={{ width: '77%' }} title="77%"></div>
                                        </div>
                                    </li>
                                    <li className="border-line-h">
                                        <div className="name">Git</div>
                                        <div className="progress">
                                            <div className="percentage git" style={{ width: '70%' }} title="70%">
                                            </div>
                                        </div>
                                    </li>
                                    <li className="border-line-h">
                                        <div className="name">React/React-router/Redux</div>
                                        <div className="progress">
                                            <div className="percentage react" style={{ width: '82%' }} title="82%"></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </>
                }
            </AboutDiv>
        );
    }
}

export default connect(
    (state: any) => ({
        _DB: state.about
    })
)(About as any);