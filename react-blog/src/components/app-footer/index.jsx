import React, { Component } from 'react';
import config from '../../config';

export default class AppFooter extends Component {
    componentDidMount() {
        let timer = null;
        document.getElementById('backTop').onclick = function () {
            cancelAnimationFrame(timer);
            timer = requestAnimationFrame(function fn() {
                let oTop = document.body.scrollTop || document.documentElement.scrollTop;
                if (oTop > 0) {
                    document.body.scrollTop = document.documentElement.scrollTop = oTop - 50;
                    timer = requestAnimationFrame(fn);
                } else {
                    cancelAnimationFrame(timer);
                }
            });
        };
    }
    render() {
        const { siteInfo } = config;
        return (
            <footer className="AppFooter">
                <div className="_back-top" title="返回顶部" id="backTop">
                    <svg title="回到顶部" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path>
                    </svg>
                </div>
                <div>
                    <p className="_p">由<strong>Nodejs</strong>强力驱动，本博客已经开源至<a href="https://github.com/bs32g1038/node-blog" rel="noopener noreferrer" target="_blank" className="app-github">
                        <strong>Github</strong></a>请大家多多关注
                    </p>
                    <p className="_p">
                        Copyright ©<a className="text-white" href="/blog">{siteInfo.name}</a><span><a href="http://www.miitbeian.gov.cn/" rel="noopener noreferrer" target="_blank">{siteInfo.icp}</a></span>
                    </p>
                </div>
            </footer>
        );
    }
}