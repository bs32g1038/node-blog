import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../utils/axios';
import DocumentTitle from '../document-title';

export default class FriendlyLinks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            links: (this.props.$store && this.props.$store.links) || []
        };
    }
    static getDerivedStateFromProps(nextProps) {
        return {
            links: nextProps.$store.links
        };
    }
    static asyncData({ store }) {
        return axios.get('/links').then((_) => {
            return store.setLinks(_.data);
        });
    }
    render() {
        return (
            <DocumentTitle title="友情链接">
                <div className="FriendlyLinks">
                    <header className="FriendlyLinks-header">
                        <h2 className="FriendlyLinks-headerTitle">--友情链接--</h2>
                        <p>Web海洋的小船，不一样的友谊🐎</p>
                    </header>
                    {/* <h3 className="FriendlyLinks-tip" style={{ textAlign: 'center', backgroundColor: '#efefef' }}><i className="fa fa-hand-o-down fa-fw"></i>区域</h3> */}
                    <ul className="FriendlyLinks-body">
                        {
                            this.state.links.map((item) => (
                                <li key={item._id} className="FriendlyLinks-item">
                                    <div className="FriendlyLinks-itemContent">
                                        <a href={item.url} target="_blank" rel="noopener noreferrer" title={item.name}>
                                            <div className="FriendlyLinks-itemMeta">
                                                <img className="FriendlyLinks-itemImg" src={item.logo} />{item.name}
                                            </div>
                                            <p className="FriendlyLinks-itemDescription">{item.description}</p>
                                            <i className="fa fa-link FriendlyLinks-itemDecoration"></i>
                                        </a>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    <footer className="FriendlyLinks-footer">
                        <hr className="FriendlyLinks-hr"/>
                        <h3 className="FriendlyLinks-tip"><i className="fa fa-info-circle fa-fw"></i>友情链接添加须知</h3>
                        <ol>
                            <li className="FriendlyLinks-li">请确定贵站可以稳定运营</li>
                            <li className="FriendlyLinks-li">原创博客优先，技术类博客优先，设计、视觉类博客优先</li>
                            <li className="FriendlyLinks-li">经常过来访问和评论，眼熟的</li>
                            <li className="FriendlyLinks-li">请避免广告链接</li>
                        </ol>
                        <hr className="FriendlyLinks-hr"/>
                        <h3 className="FriendlyLinks-tip"><i className="fa fa-map fa-fw"></i>友链申请规范</h3>
                        <ol>
                            <li className="FriendlyLinks-li"><strong>名称：</strong>站点名称</li>
                            <li className="FriendlyLinks-li"><strong>域名：</strong>站点网址或GitHub地址</li>
                            <li className="FriendlyLinks-li"><strong>描述：</strong>80字以内站点描述</li>
                            <li className="FriendlyLinks-li"><strong>图标：</strong>请自行提供logo（格式为.png，.jpg）图片地址</li>
                        </ol>
                        <hr className="FriendlyLinks-hr"/>
                        <h3 className="FriendlyLinks-tip"><i className="fa fa-hand-o-right fa-fw"></i>友链申请操作</h3>
                        <ol>
                            <li className="FriendlyLinks-li">要申请友链的小伙伴们，请到博客<Link to="/blog/guestbook" className="FriendlyLinks-jump"><strong>留言版</strong></Link>进行留言，我将会在收到的第一时间进行添加，谢谢！</li>
                        </ol>
                    </footer>
                </div>
            </DocumentTitle>
        );
    }
}