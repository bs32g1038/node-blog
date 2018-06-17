import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../utils/axios';
import styles from "./cssmodule.scss";
import DocumentTitle from '../DocumentTitle';

export default class FriendlyLinks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            links: this.props.links || []
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            links: nextProps.links
        });
    }
    static asyncData(match, location) {
        return axios.get('/links').then((_) => ({ links: _.data }));
    }
    render() {
        return (
            <DocumentTitle title="友情链接">
                <div className={styles.wrapLinks}>
                    <header className={styles.header}>
                        <h2 className={styles.title}>--友情链接--</h2>
                        <p>Web海洋的小船，不一样的友谊🐎</p>
                    </header>
                    <h3 className={styles.tip} style={{ textAlign: 'center', backgroundColor: '#efefef' }}><i className="fa fa-hand-o-down fa-fw"></i>区域</h3>
                    <ul className={styles.body}>
                        {
                            this.state.links.map((item) => (
                                <li key={item._id} className={styles.item}>
                                    <div className={styles.itemContent}>
                                        <a href={item.url} target="_blank" title={item.name}>
                                            <div className={styles.itemMeta}><img className={styles.itemImg} src={item.logo} />{item.name}</div>
                                            <p className={styles.itemDescription}>{item.description}</p>
                                        </a>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    <footer className={styles.footer}>
                        <h3 className={styles.tip}><i className="fa fa-info-circle fa-fw"></i>链接须知</h3>
                        <ol>
                            <li className={styles.li}>请确定贵站可以稳定运营</li>
                            <li className={styles.li}>原创博客优先，技术类博客优先，设计、视觉类博客优先</li>
                            <li className={styles.li}>经常过来访问和评论，眼熟的</li>
                            <li className={styles.li}>请避免广告链接</li>
                        </ol>
                        <h3 className={styles.tip}><i className="fa fa-map fa-fw"></i>友链申请规范</h3>
                        <ol>
                            <li className={styles.li}><strong>名称：</strong>站点名称</li>
                            <li className={styles.li}><strong>域名：</strong>站点网址或GitHub地址</li>
                            <li className={styles.li}><strong>描述：</strong>80字以内站点描述</li>
                            <li className={styles.li}><strong>图标：</strong>请自行提供logo（格式为.png，.jpg）图片地址</li>
                        </ol>
                        <h3 className={styles.tip}><i className="fa fa-hand-o-right fa-fw"></i>友链申请操作</h3>
                        <p>要申请友链的小伙伴们，请到博客<Link to="/blog/guestbook" className={styles.jump}>留言版</Link>进行留言，我将会在收到的第一时间进行添加，谢谢！</p>
                    </footer>
                </div>
            </DocumentTitle>
        );
    }
}