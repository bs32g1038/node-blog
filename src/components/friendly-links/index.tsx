import styled from '@emotion/styled';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { State } from '../../redux/reducers/links';
import { media, rem } from '../../utils/helper';
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
    public render() {
        const { links } = this.props._DB;
        return (
            <FriendlyLinksWrap>
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
            </FriendlyLinksWrap>
        );
    }
}

export default connect(
    (state: State) => ({
        _DB: state.links
    })
)(FriendlyLinks as any);