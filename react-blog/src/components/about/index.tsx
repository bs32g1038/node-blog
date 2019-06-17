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
        margin-top: 20px;
    }

    .skillbar {
        position: relative;
        display: block;
        background: #eee;
        height: 30px;
        max-width: 400px;
        margin: 0 auto;
        border-radius: 35px;
        transition: 0.4s linear;
        transition-property: width,background-color;
    }

    .skillbar-title {
        position: absolute;
        top: 0;
        left: 0;
        width: 110px;
        font-size: 14px;
        color: #ffffff;
        border-radius: 35px;
    }

    .skillbar-title span {
        display: block;
        background: rgba(0, 0, 0, 0.15);
        padding: 0 20px;
        height: 30px;
        line-height: 30px;
        border-radius: 35px;
    }

    .skill-bar-percent {
        position: absolute;
        right: 10px;
        top: 0;
        font-size: 12px;
        height: 30px;
        line-height: 30px;
        color: #ffffff;
        color: rgba(0, 0, 0, 0.5);
    }

    .skills-list ul {
        list-style: none;
        padding-left: 0;
        margin: 0;
        flex: 1 0 auto;
        width: 50%;
    }

    .skills-list li {
        padding: 15px 0;
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
                        date: item.year + '-' + item.month,
                        count: item.count,
                    };
                });
            }
        } else {
            userInfo = {};
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
                            <p>
                                本博客是一个技术性博客，平时主要发布一些关于web前端以及后端开发的文章，这其中包括第三方的文章，也包括我自己总结的一些文章。 我会一直坚持写作，把自己的一些笔记记录下来，以作备忘和分享。
                            </p>
                            <div className="about-header">
                                <div className="person-base">
                                    <h2 className="name">{userInfo.name}</h2>
                                    <h3 className="aim">求职目标：web前端工程师</h3>
                                </div>
                                <ul className="person-info">
                                    <li><i className="fa fa-user fa-fw"></i>2*岁</li>
                                    <li><i className="fa fa-phone fa-fw"></i>185(*^_^*)7248</li>
                                    <li><i className="fa fa-flag fa-fw"></i>计算机科学与技术</li>
                                </ul>
                                <ul className="person-info">
                                    <li><i className="fa fa-map-marker fa-fw"></i>{userInfo.location}</li>
                                    <li><i className="fa fa-envelope fa-fw"></i>bs32g1038@163.com</li>
                                    <li><i className="fa fa-university fa-fw"></i>大学本科</li>
                                </ul>
                                <div className="person-img">
                                    <img src={userInfo.avatarUrl} alt="头像" />
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
                                <h3 style={{ minWidth: 140 }}>Stars per Repo(top 5)</h3>
                                <PieChart userRepos={userRepos}></PieChart>
                            </div>
                            <div className="skills-list">
                                <ul>
                                    <li className="border-line-h">
                                        <div className="skillbar">
                                            <div className="skillbar-title" style={{ background: 'linear-gradient(to right, #FF0066 0%, #FF00CC 100%); width: 80%' }}>
                                                <span>HTML5</span>
                                            </div>
                                            <div className="skill-bar-percent">80%</div>
                                        </div>
                                    </li>
                                    <li className="border-line-h">
                                        <div className="skillbar">
                                            <div className="skillbar-title" style={{ background: 'linear-gradient(to right, #08adc2 0%, #ff00cc 100%); width: 85%' }}>
                                                <span>CSS3</span>
                                            </div>
                                            <div className="skill-bar-percent">85%</div>
                                        </div>
                                    </li>
                                    <li className="border-line-h">
                                        <div className="skillbar">
                                            <div className="skillbar-title" style={{ background: 'linear-gradient(to right, #7fdf83 0%, #95c097 100%); width: 70%' }}>
                                                <span>MONGODB</span>
                                            </div>
                                            <div className="skill-bar-percent">70%</div>
                                        </div>
                                    </li>
                                </ul>
                                <ul>
                                    <li className="border-line-h">
                                        <div className="skillbar">
                                            <div className="skillbar-title" style={{ background: 'linear-gradient(to right, #b2694e 0%, #5f2712 100%); width: 85%' }}>
                                                <span>JAVASCRIPT</span>
                                            </div>
                                            <div className="skill-bar-percent">85%</div>
                                        </div>
                                    </li>
                                    <li className="border-line-h">
                                        <div className="skillbar">
                                            <div className="skillbar-title" style={{ background: 'linear-gradient(to right, #7a0fbe 0%, #7632a1 100%); width: 75%' }}>
                                                <span>NODEJS</span>
                                            </div>
                                            <div className="skill-bar-percent">75%</div>
                                        </div>
                                    </li>
                                    <li className="border-line-h">
                                        <div className="skillbar">
                                            <div className="skillbar-title" style={{ background: 'linear-gradient(to right, #dbc92c 0%, #918734 100%); width: 70%' }}>
                                                <span>GIT</span>
                                            </div>
                                            <div className="skill-bar-percent">70%</div>
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