import React, { useEffect, useState } from 'react';
import * as api from '@blog/client/web/api/article';
import PersonCommit from './person-commit';
import style from './style.module.scss';
import vultrPng from '@blog/client/assets/banners/vultr_banner_728x90.png';

const AboutPage = () => {
    const [userCommits, setUserCommits] = useState([]);
    useEffect(() => {
        api.fetchArticlesAggregationMapDate().then((res) => {
            setUserCommits(res);
        });
    }, [1]);
    let totalCountInYear = 0;
    const values = userCommits.map((item) => {
        totalCountInYear = totalCountInYear + item.articles.length;
        return {
            date: item._id,
            count: item.articles.length,
        };
    });
    return (
        <div className={style.about}>
            <PersonCommit values={values} totalCountInYear={totalCountInYear}></PersonCommit>
            <div className={style.invite}>
                <h3 className={style.inviteTitle}>
                    当前博客由vultr提供云服务器支持，点击下方链接购买服务器有优惠，博主也会从中受益，谢谢支持。
                </h3>
                <a href="https://www.vultr.com/?ref=7007600">
                    <img src={vultrPng.src} width="100%" height="auto" />
                </a>
            </div>
        </div>
    );
};

export { AboutPage };
