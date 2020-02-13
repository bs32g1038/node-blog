import React, { Fragment } from 'react';
import { CopyrightOutlined, GithubOutlined } from '@ant-design/icons';
import { BackTop } from 'antd';
import styled from '@emotion/styled';

const Footer = styled.footer`
    margin: 30px 0 24px 0;
    padding: 0 16px;
    text-align: center;
    .links {
        margin-bottom: 8px;
        a {
            transition: all 0.3s;
            &:not(:last-child) {
                margin-right: 40px;
            }
        }
    }
`;

const links = [
    {
        key: '博客首页',
        title: '博客首页',
        href: 'https://www.lizc.net',
        blankTarget: true,
    },
    {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/bs32g1038/node-blog',
        blankTarget: true,
    },
];

const copyright = (
    <Fragment>
        Copyright <CopyrightOutlined style={{ fontSize: '12px' }} /> {new Date().getFullYear()}
        &nbsp;JsonLi&nbsp;
        <strong>bs32g1038@163.com</strong> 体验技术部出品
    </Fragment>
);

export default () => {
    return (
        <Footer>
            {links && (
                <div className="links">
                    {links.map(link => (
                        <a
                            key={link.key}
                            title={link.key}
                            target={link.blankTarget ? '_blank' : '_self'}
                            href={link.href}
                        >
                            {link.title}
                        </a>
                    ))}
                </div>
            )}
            {copyright && <div>{copyright}</div>}
            <BackTop style={{ right: '20px' }}></BackTop>
        </Footer>
    );
};
