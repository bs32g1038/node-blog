import styled from '@emotion/styled';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import siteInfo from '../../config/site-info';
import { State } from '../../redux/reducers/links';
import { fetchLinks } from '../../redux/reducers/links';
import { rem } from '../../utils/helper';
import ContentLoader from '../content-loader';
import LinkItem from './item';

const FriendlyLinksWrap = styled.div`
    background-color: #fff;
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    padding: ${rem('28px')} 0;
`;

const Header = styled.header((_) => ({
    textAlign: 'center'
}));

const HeaderTitle = styled.h2((_) => ({
    fontSize: '24px',
    margin: '5px'
}));

const BodyUl = styled.ul((_) => ({
    display: 'flex',
    flexWrap: 'wrap',
    padding: 0,
    margin: 0
}));

const TIP = styled.h3((_) => ({
    color: '#333',
    fontSize: '14px',
    padding: '5px 5px 5px 20px',
    '>i': {
        marginRight: '5px',
    }
}));

const HR = styled.hr((_) => ({
    margin: '20px 0',
    height: '3px',
    border: 'none',
    backgroundColor: '#ccc',
    backgroundImage: 'repeating-linear-gradient(-45deg, #fff, #fff 4px, transparent 4px, transparent 8px)'
}));

const LI = styled.li((_) => ({
    fontSize: '14px',
    listStyle: 'circle',
    padding: '5px'
}));

const Jump = styled(Link)((_) => ({
    fontSize: '14px',
    color: '#f51c1c',
    textDecoration: 'none'
}));

class FriendlyLinks extends Component<any, any> {
    public state = {
        isLoading: false
    };

    public static asyncData(store: any) {
        return store.dispatch(fetchLinks());
    }

    public componentDidMount() {
        const { links } = this.props._DB;
        if (links.length > 0) {
            return;
        }
        this.setState({
            isLoading: true
        });
        FriendlyLinks.asyncData({ dispatch: this.props.dispatch }).then(() => {
            this.setState({
                isLoading: false
            });
        });
    }

    public render() {
        const { links } = this.props._DB;
        return (
            <FriendlyLinksWrap>
                {
                    this.state.isLoading ?
                        <>
                            <Helmet title={siteInfo.name + '-友情链接'}></Helmet>
                            <Header>
                                <ContentLoader width={720} height={40}>
                                    <rect x="260" y="0" width="200" height="40"></rect>
                                </ContentLoader>
                                <ContentLoader width={720} height={20}>
                                    <rect x="260" y="0" width="200" height="20"></rect>
                                </ContentLoader>
                            </Header>
                            <div style={{ display: 'flex' }}>
                                <ContentLoader style={{ width: '33%' }} width={720} height={240}>
                                    <circle cx="50" cy="50" r="40"></circle>
                                    <rect x="100" y="30" width="100" height="40"></rect>
                                    <rect x="300" y="30" width="200" height="40"></rect>
                                    <rect x="520" y="30" width="180" height="40"></rect>
                                    <rect x="20" y="120" width="690" height="50"></rect>
                                    <rect x="20" y="200" width="690" height="40"></rect>
                                </ContentLoader>
                                <ContentLoader style={{ width: '33%' }} width={720} height={240}>
                                    <circle cx="50" cy="50" r="40"></circle>
                                    <rect x="100" y="30" width="100" height="40"></rect>
                                    <rect x="300" y="30" width="200" height="40"></rect>
                                    <rect x="520" y="30" width="180" height="40"></rect>
                                    <rect x="20" y="120" width="690" height="50"></rect>
                                    <rect x="20" y="200" width="690" height="40"></rect>
                                </ContentLoader>
                                <ContentLoader style={{ width: '33%' }} width={720} height={240}>
                                    <circle cx="50" cy="50" r="40"></circle>
                                    <rect x="100" y="30" width="100" height="40"></rect>
                                    <rect x="300" y="30" width="200" height="40"></rect>
                                    <rect x="520" y="30" width="180" height="40"></rect>
                                    <rect x="20" y="120" width="690" height="50"></rect>
                                    <rect x="20" y="200" width="690" height="40"></rect>
                                </ContentLoader>
                            </div>
                            <footer className="FriendlyLinks-footer">
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
                            </footer>
                        </>
                        :
                        <>
                            <Helmet title={siteInfo.name + '-友情链接'}></Helmet>
                            <Header>
                                <HeaderTitle>--友情链接--</HeaderTitle>
                                <p>Web海洋的小船，不一样的友谊🐎</p>
                            </Header>
                            <BodyUl>
                                {
                                    links.map((item: any) => (
                                        <LinkItem item={item} key={item._id}></LinkItem>
                                    ))
                                }
                            </BodyUl>
                            <footer className="FriendlyLinks-footer">
                                <HR />
                                <TIP><i className="fa fa-info-circle fa-fw"></i>友情链接添加须知</TIP>
                                <ol>
                                    <LI >请确定贵站可以稳定运营</LI>
                                    <LI >原创博客优先，技术类博客优先，设计、视觉类博客优先</LI>
                                    <LI >经常过来访问和评论，眼熟的</LI>
                                    <LI >请避免广告链接</LI>
                                </ol>
                                <HR />
                                <TIP className="FriendlyLinks-tip"><i className="fa fa-map fa-fw"></i>友链申请规范</TIP>
                                <ol>
                                    <LI><strong>名称：</strong>站点名称</LI>
                                    <LI><strong>域名：</strong>站点网址或GitHub地址</LI>
                                    <LI><strong>描述：</strong>80字以内站点描述</LI>
                                    <LI><strong>图标：</strong>请自行提供logo（格式为.png，.jpg）图片地址</LI>
                                </ol>
                                <HR />
                                <TIP className="FriendlyLinks-tip"><i className="fa fa-hand-o-right fa-fw"></i>友链申请操作</TIP>
                                <ol>
                                    <LI>
                                        要申请友链的小伙伴们，请到博客
                            <Jump to="/blog/guestbook" className="FriendlyLinks-jump">
                                            <strong>留言版</strong>
                                        </Jump>
                                        进行留言，我将会在收到的第一时间进行添加，谢谢！
                        </LI>
                                </ol>
                            </footer>
                        </>
                }
            </FriendlyLinksWrap>
        );
    }
}

export default connect(
    (state: State) => ({
        _DB: state.links
    })
)(FriendlyLinks as any);