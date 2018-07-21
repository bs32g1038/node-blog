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

        const time = document.getElementById('blog-runing-time');
        // 显示博客运行时间
        function showRunTime() {
            let BirthDay = new Date("2016/012/11 00:00:00"),
                today = new Date,
                timeold = today.getTime() - BirthDay.getTime(),
                msPerDay = 864e5,
                e_daysold = timeold / msPerDay,
                daysold = Math.floor(e_daysold),
                e_hrsold = 24 * (e_daysold - daysold),
                hrsold = Math.floor(e_hrsold),
                e_minsold = 60 * (e_hrsold - hrsold),
                minsold = Math.floor(60 * (e_hrsold - hrsold)),
                seconds = Math.floor(60 * (e_minsold - minsold));
            time.innerHTML = daysold + "天" + hrsold + "小时" + minsold + "分" + seconds + "秒";
        }
        setInterval(showRunTime, 1000);

        // const chakhsu = function(r) {
        //     function t() {
        //         return b[Math.floor(Math.random() * b.length)]
        //     }
        //     function e() {
        //         return String.fromCharCode(94 * Math.random() + 33)
        //     }
        //     function n(r) {
        //         for (var n = document.createDocumentFragment(), i = 0; r > i; i++) {
        //             var l = document.createElement("span");
        //             l.textContent = e(),
        //             l.style.color = t(),
        //             n.appendChild(l)
        //         }
        //         return n
        //     }
        //     function i() {
        //         var t = o[c.skillI];
        //         c.step ? c.step--:(c.step = g, c.prefixP < l.length ? (c.prefixP >= 0 && (c.text += l[c.prefixP]), c.prefixP++) : "forward" === c.direction ? c.skillP < t.length ? (c.text += t[c.skillP], c.skillP++) : c.delay ? c.delay--:(c.direction = "backward", c.delay = a) : c.skillP > 0 ? (c.text = c.text.slice(0, -1), c.skillP--) : (c.skillI = (c.skillI + 1) % o.length, c.direction = "forward")),
        //         r.textContent = c.text,
        //         r.appendChild(n(c.prefixP < l.length ? Math.min(s, s + c.prefixP) : Math.min(s, t.length - c.skillP))),
        //         setTimeout(i, d)
        //     }
        //     var l = "I work with ",
        //     o = ["Front-End", "JavaScript", "HTML & CSS", "Node.js", "React", "passion & love"].map(function(r) {
        //         return r + "."
        //     }),
        //     a = 2,
        //     g = 1,
        //     s = 5,
        //     d = 75,
        //     b = ["rgb(110,64,170)", "rgb(150,61,179)", "rgb(191,60,175)", "rgb(228,65,157)", "rgb(254,75,131)", "rgb(255,94,99)", "rgb(255,120,71)", "rgb(251,150,51)", "rgb(226,183,47)", "rgb(198,214,60)", "rgb(175,240,91)", "rgb(127,246,88)", "rgb(82,246,103)", "rgb(48,239,130)", "rgb(29,223,163)", "rgb(26,199,194)", "rgb(35,171,216)", "rgb(54,140,225)", "rgb(76,110,219)", "rgb(96,84,200)"],
        //     c = {
        //         text: "",
        //         prefixP: -s,
        //         skillI: 0,
        //         skillP: 0,
        //         direction: "forward",
        //         delay: a,
        //         step: g
        //     };
        //     i()
        // };
        // var a = document.getElementById('dynamictext');;
        // chakhsu(a);
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
                    {/* <p>
                        <span>博客累计运行</span>
                        <span id="blog-runing-time"></span>
                    </p> */}
                    {/* <p id="dynamictext"></p> */}
                    <p className="_p">由<strong>Nodejs</strong>强力驱动，本博客已经开源至<a href="https://github.com/bs32g1038/node-blog" rel="noopener noreferrer" target="_blank" className="app-github">
                        <strong>Github</strong></a>请大家多多关注
                    </p>
                    <p className="_p">
                        <span>博客累计运行</span>
                        <span id="blog-runing-time"></span>
                        <span>&nbsp;&nbsp;Copyright © 2016-2018</span> <a className="text-white" href="/blog">{siteInfo.name}</a><span><a href="http://www.miitbeian.gov.cn/" rel="noopener noreferrer" target="_blank">{siteInfo.icp}</a></span>
                    </p>
                </div>
            </footer>
        );
    }
}