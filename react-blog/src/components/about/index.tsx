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
                strong {
                    margin-right: 5px;
                }
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
    .skills-list {
        display: flex;
    }
    .skills-list ul {
        list-style: none;
        padding-left: 0;
        margin: 0;
        flex: 1 0 auto;
        width: 50%;
        margin-right: 20px;
        &:last-child {
            margin-right: -20px;
        }
    }
    .skills-list li {
        padding: 15px 0;
    }
    .react-calendar-heatmap {
        margin-bottom: -20px
    }
`;

const PinnedItemsList = styled.ol`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
    margin-bottom: 0;
    margin-top: 0;
    padding-left: 0;
    .pinned-item-list-item {
        margin-bottom: 16px;
        width: calc(50% - 8px);
        border: 1px solid #d1d5da;
        border-radius: 3px;
        padding: 16px;
        box-sizing: border-box;
    }
    .pinned-item-list-item-content {
        display: flex;
        flex-direction: column;
        width: 100%;
        >.header {
            display: flex;
            width: 100%;
            position: relative;
            align-items: center;
            > a {
                color: #0366d6;
            }
        }
        .header-icon {
            margin-right: 8px
        }
        a {
            text-decoration: none;
            flex: 1 0 auto;
        }
    }
    .pinned-item-desc {
        flex: 1 0 auto;
        font-size: 12px;
        margin-bottom: 16px;
        color: #586069;
    }
    .meta{
        font-size: 12px;
        color: #586069;
        margin-bottom: 0;
    }
    .meta-item {
        margin-right: 16px;
    }
    .pinned-item-meta {
        display: inline-block;
        color: #586069;
        text-decoration: none;
    }
    .pinned-item-meta+.pinned-item-meta {
        margin-left: 16px;
    }
    .octicon {
        vertical-align: text-bottom;
        display: inline-block;
        fill: currentColor;
    }
    .repo-language-color {
        border-radius: 50%;
        display: inline-block;
        height: 12px;
        position: relative;
        top: 1px;
        width: 12px;
        margin-right: 3px;
    }
`;

const Skillbar = styled.div`
    position: relative;
    display: block;
    background: #eee;
    height: 30px;
    border-radius: 35px;
    transition: 0.4s linear;
    transition-property: width,background-color;
    .skillbar-title {
        position: absolute;
        top: 0;
        left: 0;
        width: 110px;
        font-size: 14px;
        color: #ffffff;
        border-radius: 35px;
        &.html5 {
            background: linear-gradient(to right, #ff0066 0%, #9b6d92 100%);
            width: 80%;
        }
        &.css3 {
            background: linear-gradient(to right, #08adc2 0%, #ff00cc 100%);
            width: 85%
        }
        &.mongodb {
            background: linear-gradient(to right, #7fdf83 0%, #95c097 100%);
            width: 70%
        }
        &.javascript {
            background: linear-gradient(to right, #b2694e 0%, #c4aba2 100%);
            width: 85%
        }
        &.nodejs {
            background: linear-gradient(to right, #7a0fbe 0%, #7632a1 100%);
            width: 75%
        }
        &.git{
            background: linear-gradient(to right, #dbc92c 0%, #918734 100%); 
            width: 70%;
        }
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
                {
                    this.state.isLoading ?
                        <>
                            <Helmet title={siteInfo.name + '-关于'}></Helmet>
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
                            <p className="bio">
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
                                    <li><strong>Age:</strong>2*岁</li>
                                    <li><strong>Phone:</strong>185(*^_^*)7248</li>
                                    <li><strong>Profession:</strong>计算机科学与技术</li>
                                </ul>
                                <ul className="person-info">
                                    <li><strong>Location:</strong>{userInfo.location}</li>
                                    <li><strong>Email:</strong>bs32g1038@163.com</li>
                                    <li><strong>Education:</strong>大学本科</li>
                                </ul>
                                <div className="person-img">
                                    <img src="/public/images/avatar.png" alt="头像" />
                                    <h3 className="aim">web前端工程师</h3>
                                </div>
                            </div>
                            <p>Github {totalContributionLastYear} contributions in the last year</p>
                            <CalendarHeatmap
                                startDate={(values[0] && values[0].year + '-' + values[0].month) || (new Date().getFullYear()) - 1 + '-1-1'}
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
                                horizontal={true}
                                gutterSize={4}
                            />
                            <ReactTooltip></ReactTooltip>
                            <p>Pinned</p>
                            <PinnedItemsList>
                                {
                                    userRepos.map((item: any) => (
                                        <li key={item.name} className="pinned-item-list-item">
                                            <div className="pinned-item-list-item-content">
                                                <div className="header">
                                                    <svg className="octicon header-icon" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path fillRule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path></svg>
                                                    <a href={'https://github.com/bs32g1038/' + item.name} rel="noopener noreferrer" target="_blank">{item.name}</a>
                                                    <span className="pinned-item-handle js-pinned-item-reorder pl-2" title="Drag to reorder">
                                                        <svg className="octicon octicon-grabber" viewBox="0 0 8 16" version="1.1" width="8" height="16" aria-hidden="true"><path fillRule="evenodd" d="M8 4v1H0V4h8zM0 8h8V7H0v1zm0 3h8v-1H0v1z"></path></svg>
                                                    </span>
                                                </div>
                                                <p className="pinned-item-desc">{item.description}</p>
                                                <p className="meta">
                                                    <span className="meta-item">
                                                        <span className="repo-language-color" style={{ backgroundColor: '#2b7489' }}></span>
                                                        <span>{item.language}</span>
                                                    </span>
                                                    <a className="pinned-item-meta" href={'https://github.com/bs32g1038/' + item.name + '/stargazers'} rel="noopener noreferrer" target="_blank">
                                                        <svg aria-label="stars" className="octicon" viewBox="0 0 14 16" version="1.1" width="14" height="16"><path fillRule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>
                                                        &nbsp;{item.stargazersCount}
                                                    </a>
                                                    <a className="pinned-item-meta" href={'https://github.com/bs32g1038/' + item.name + '/network/members'} rel="noopener noreferrer" target="_blank">
                                                        <svg aria-label="forks" className="octicon" viewBox="0 0 10 16" version="1.1" width="10" height="16"><path fillRule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>
                                                        &nbsp;{item.forkCount}
                                                    </a>
                                                </p>
                                            </div>
                                        </li>
                                    ))
                                }
                            </PinnedItemsList>
                            <p>Skills</p>
                            <div className="skills-list">
                                <ul>
                                    <li className="border-line-h">
                                        <Skillbar>
                                            <div className="skillbar-title html5">
                                                <span>HTML5</span>
                                            </div>
                                            <div className="skill-bar-percent">80%</div>
                                        </Skillbar>
                                    </li>
                                    <li className="border-line-h">
                                        <Skillbar>
                                            <div className="skillbar-title css3">
                                                <span>CSS3</span>
                                            </div>
                                            <div className="skill-bar-percent">85%</div>
                                        </Skillbar>
                                    </li>
                                    <li className="border-line-h">
                                        <Skillbar>
                                            <div className="skillbar-title mongodb">
                                                <span>MONGODB</span>
                                            </div>
                                            <div className="skill-bar-percent">70%</div>
                                        </Skillbar>
                                    </li>
                                </ul>
                                <ul>
                                    <li className="border-line-h">
                                        <Skillbar>
                                            <div className="skillbar-title javascript" >
                                                <span>JAVASCRIPT</span>
                                            </div>
                                            <div className="skill-bar-percent">85%</div>
                                        </Skillbar>
                                    </li>
                                    <li className="border-line-h">
                                        <Skillbar>
                                            <div className="skillbar-title nodejs">
                                                <span>NODEJS</span>
                                            </div>
                                            <div className="skill-bar-percent">75%</div>
                                        </Skillbar>
                                    </li>
                                    <li className="border-line-h">
                                        <Skillbar>
                                            <div className="skillbar-title git" >
                                                <span>GIT</span>
                                            </div>
                                            <div className="skill-bar-percent">70%</div>
                                        </Skillbar>
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