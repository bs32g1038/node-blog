import styled from '@emotion/styled';
import React from 'react';
import { Helmet } from 'react-helmet';
import siteInfo from '../../config/site-info';
import media from '../../utils/media';

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
        border-bottom: 5px solid #31AEFB;
        .person-base {
            flex: 1 0 auto;
            .name {
                color: #31AEFB;
                font-size: 20px;
            }
            .aim {
                color: #31AEFB;
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
            i {
                color: #31AEFB;
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
            ${media.phone`
                flex: auto;
                text-align: left;
                img{
                    width: 70px;
                    height: 70px;
                }
                h4{
                    font-size: 12px;
                }
            `};
        }
    }
    .about-main {
        display: flex;
        flex-direction: column;
        ${media.phone`
            padding-left: 8px;
        `};
    }
    .about-main-item {
        flex: 1 0 auto;
        .about-main-title{
            flex: 0 0 auto;
            color: #31AEFB;
            i {
                vertical-align: text-bottom;
                margin-left: 5px;
            }
        }
        .about-main-content{
            font-size: 14px;
            line-height: 26px;
            padding: 10px;
            margin: 0;
            h4{
                margin:  0;
            }
            p{
                margin: 5px 0;
            }
        }
    }
`;

export default class About extends React.Component<any, any> {
    public render() {
        return (
            <AboutDiv className="about">
                <Helmet title={siteInfo.name + '-关于'}></Helmet>
                <h1 className="resume">个人简历</h1>
                <div className="about-header">
                    <div className="person-base">
                        <h2 className="name">冷夜流星</h2>
                        <h4 className="aim">求职目标：web前端工程师</h4>
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
                        <h4 className="aim">求职目标：<br />web前端工程师</h4>
                    </div>
                </div>
                <div className="about-main">
                    <div className="about-main-item">
                        <h4 className="about-main-title">专业技能<i className="fa fa-leaf"></i></h4>
                        <div className="about-main-content">
                            <li>了解 photoshop 软件以及 axurepr 原型界面软件；</li>
                            <li>能开发符合w3c规范的前台网页、对 div+css 盒子模型布局有深刻的理解; 熟悉掌握 javascript 中 dom 编程
                            基本原理、以及面向对象编程思想；</li>
                            <li>对于JS高级里面(闭包，作用域等有一定的认识)掌握并使用前端框架 bootstrap、vue 、react 、jQuery等</li>
                            <li>熟悉 html5 语义化标签编程和 css3 结构选择器和动画并加以使用；</li>
                            <li>了解git操作，熟悉nodejs与npm生态化开发, docker基本使用。</li>
                        </div>
                    </div>
                    <div className="about-main-item">
                        <h4 className="about-main-title">项目经验<i className="fa fa-graduation-cap fa-fw"></i></h4>
                        <ul className="about-main-content">
                            <li>
                                <h4>项目：个人博客开发</h4>
                                <p>项目简介： 项目简介：一个类博客的应用，主要负责博客的界面ui设计，后台数据交换逻辑实现，项目文件架构，迭代开发</p>
                                <p>
                                    <ul className="person-info">
                                        <li>主要是使用react,nodejs等前端web技术进行网站的开发</li>
                                        <li>使用webpack构建前后端</li>
                                        <li>后端采用nodejs express mongodb。利用mongoose进行模型规划</li>
                                        <li>项目开源代码: https://github.com/bs32g1038/node-blog</li>
                                    </ul>
                                </p>
                            </li>
                            <li>
                                <h4>项目：职业招聘系统前端开发</h4>
                                <p>项目简介：为学校提供职业招聘信息，同时解决大学生就业问题</p>
                                <p>主要负责该项目的前端架构以及后续的开发，在该项目中，主要使用antdesign，react，webpack等技术，和
鸭子模型，共同构成项目的解决方案。解决了团队的分工问题以及构建了项目良好的代码结构，最终让需求变更可
以更快的被消化，极速研发、快速上线、且方便项目后期维护，降低成本，最后在产品线中开始推广。</p>
                            </li>
                            <li>
                                <h4>项目：康复平台前端开发</h4>
                                <p>项目简介：一个软硬件结合的医疗平台，主要提供快捷便利的健康医疗服务</p>
                                <p>在项目中，主要采用了bootstrap，jq框架进行开发，针对团队繁琐重复打包html，css，js，images的工作，采用了gulp简化了操作步骤，使得开发和工作效率大大提高</p>
                            </li>
                            <li>
                                <h4>项目：通信项目WEB开发</h4>
                                <p>项目简介：茂名通信- 为用户提供宽带缴费，宽带报装，等服务的企业系统。</p>
                                <p>个人主要负责项目的前端开发，以及部分的后端java开发，构建了通用的web后台前
端框架，贴合了公司的业务需要，加快了产品开发。同时在另一个项目中使用了react，nodejs，antdesign
等技术，对项目的数据过滤和数据回溯等功能进行开发。</p>
                            </li>
                            <li>
                                <h4>项目：在线学习webapp</h4>
                                <p>项目简介：类腾讯课堂类型的webapp，主要是移动端开发</p>
                                <p>在项目中，主要采用了vue框架进行开发，实现在移动端的视频播放，数据展示，海报展览，活动竞赛等功能。</p>
                            </li>
                        </ul>
                    </div>
                    <div className="about-main-item">
                        <h4 className="about-main-title">技能评价<i className="fa fa-edit fa-fw"></i></h4>
                        <div className="about-main-content">
                            <li>具有良好的团队精神，很强的责任感；</li>
                            <li>工作踏实，认真负责，能够灵活处理工作中的突发事件；</li>
                            <li>我正在找一个平台，能够充分把自己的优势发挥出来，共同努力成就一番事业。</li>
                        </div>
                    </div>
                </div>
            </AboutDiv>
        );
    }
}