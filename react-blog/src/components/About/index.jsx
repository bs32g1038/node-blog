import React, { Component } from 'react';
import styles from './cssmodule.scss';
import DocumentTitle from '../DocumentTitle';

const skills = [
    '能开发符合w3c规范的前台网页、对 div+css 盒子模型布局有深刻的理解; 熟悉掌握 javascript 中 dom 编程基本原理、以及面向对象编程思想；',
    '对于JS高级里面(闭包，作用域等有一定的认识)掌握并使用前端框架 bootstrap、vue 、react 、jQuery等 ',
    '熟悉 html5 语义化标签编程和 css3 结构选择器和动画并加以使用； ',
    '掌握 nodejs + mongoose + express 的服务器搭建；熟悉nodejs与npm生态化开发, docker基本使用。',
    '具备较强的学习能力和主动性，有良好的时间和流程意识。'
];

const experiences = [
    {
        title: '个人博客开发',
        introduction: '一个类博客的应用，主要负责博客的界面ui设计，后台数据交换逻辑实现，项目文件架构，迭代开发',
        description: [
            '主要是使用react,nodejs等前端web技术进行网站的开发。',
            '使用webpack构建前后端',
            '后端采用nodejs express mongodb。利用mongoose进行模型规划。',
            '站点： https://www.lizc.me',
            '项目开源代码: https://github.com/bs32g1038/node-blog'
        ]
    },
    {
        title: '职业招聘系统前端开发',
        introduction: '为学校提供职业招聘信息，同时解决大学生就业问题。',
        description: ['主要负责该项目的前端架构以及后续的开发，在该项目中，主要使用antdesign，react，\
        webpack等技术，和鸭子模型，共同构成项目的解决方案。解决了团队的分工问题以及构建了项目良好的代码结构，\
        最终让需求变更可以更快的被消化，极速研发、快速上线、且方便项目后期维护，降低成本，最后在产品线中开始推广。']
    },
    {
        title: '康复平台前端开发',
        introduction: '一个软硬件结合的医疗平台，主要提供快捷便利的健康医疗服务。',
        description: ['在项目中，主要采用了bootstrap，jq框架进行开发，针对团队繁琐重复打包html，css，js，images的工作，采用了gulp简化了操作步骤，使得开发和工作效率大大提高。']
    },
    {
        title: '通信项目WEB开发',
        introduction: '茂名通信- 为用户提供宽带缴费，宽带报装，等服务的企业系统。',
        description: ['个人主要负责项目的前端开发，以及部分的后端java开发，构建了通用的web后台前 端框架，贴\
        合了公司的业务需要，加快了产品开发。同时在另一个项目中使用了react，nodejs，antdesign \
        等技术，对项目的数据过滤和数据回溯等功能进行开发。']
    }
];

const comments = [
    '具有良好的团队精神，很强的责任感',
    '工作踏实，认真负责，能够灵活处理工作中的突发事件',
    '爱好篮球、旅游、热爱生活，勤奋好学，自学能力强',
    '我正在找一个平台，能够充分把自己的优势发挥出来，共同努力成就一番事业'
];

export default class About extends Component {
    render() {
        return (
            <DocumentTitle title="关于">
                <div className={styles.about}>
                    <h1 className={styles.resume}>个人简历</h1>
                    <div className={styles.header}>
                        <div className={styles.personInfo}>
                            <h2 className={styles.name}>冷夜流星</h2>
                            <h4 className={styles.aim}>求职目标：web前端工程师</h4>
                        </div>
                        <ul className={styles.personInfo}>
                            <li><i className="fa fa-user fa-fw"></i>23岁</li>
                            <li><i className="fa fa-phone fa-fw"></i>185(*^_^*)7248</li>
                            <li><i className="fa fa-flag fa-fw"></i>计算机科学与技术</li>
                        </ul>
                        <ul className={styles.personInfo}>
                            <li><i className="fa fa-map-marker fa-fw"></i>广东省广州市</li>
                            <li><i className="fa fa-envelope fa-fw"></i>845177026@qq.com</li>
                            <li><i className="fa fa-university fa-fw"></i>大学本科</li>
                        </ul>
                        <div className={styles.avatar}>
                            <img className={styles.avatarImg} src="/static/images/avatar.png" alt="头像" />
                        </div>
                    </div>
                    <div className={styles.mainItem}>
                        <h4 className={styles.mainTitle}><i className="fa fa-leaf fa-fw"></i>专业技能</h4>
                        <ol className={styles.mainContent}>{
                            skills.map((str, index) => (
                                <li key={'@skils' + index}>{str}</li>
                            ))
                        }</ol>
                    </div>
                    <div className={styles.mainItem}>
                        <h4 className={styles.mainTitle}><i className="fa fa-graduation-cap fa-fw"></i>项目经验</h4>
                        <ul className={styles.mainContent}>
                            {
                                experiences.map((item, index) => (
                                    <li key={'@experiences' + index} className={styles.experience}>
                                        <h4>项目：{item.title}</h4>
                                        <p>项目简介：{item.introduction}</p>
                                        <ul>{item.description.map((_, index) => (<li key={'@experiencesdescription' + index}>{_}</li>))}</ul>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className={styles.mainItem}>
                        <h4 className={styles.mainTitle}><i className="fa fa-edit fa-fw"></i>技能评价</h4>
                        <ol className={styles.mainContent}>{comments.map((_, index) => (<li key={'@comments' + index}>{_}</li>))}</ol>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}