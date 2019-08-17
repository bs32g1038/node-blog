import React, { Fragment } from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
import { Icon, BackTop } from 'antd';

const links = [
    {
        key: '博客首页',
        title: '博客首页',
        href: 'https://www.lizc.net',
        blankTarget: true,
    },
    {
        key: 'github',
        title: <Icon type="github" />,
        href: 'https://github.com/bs32g1038/node-blog',
        blankTarget: true,
    },
    {
        key: 'react-admin-kit',
        title: 'react-admin-kit',
        href: 'https://github.com/bs32g1038/react-admin-kit',
        blankTarget: true,
    },
];

const copyright = (
    <Fragment>
        Copyright <Icon type="copyright" /> 2019 Node blog bs32g1038@163.com 体验技术部出品
    </Fragment>
);

const GlobalFooter = ({ className }) => {
    const clsString = classNames(styles.globalFooter, className);
    return (
        <footer className={clsString}>
            {links && (
                <div className={styles.links}>
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
            {copyright && <div className={styles.copyright}>{copyright}</div>}
            <BackTop style={{ right: '20px' }}></BackTop>
        </footer>
    );
};

export default GlobalFooter;
