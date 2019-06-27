import styled from '@emotion/styled';
import React from 'react';
import media from '../../utils/media';
import { ContentLoader } from '../content-loader';

const AboutHeader = styled.div`
    flex: 1 0 auto;
    display: flex;
    flex-direction: row;
    border-bottom: 2px solid #444;
    ${media.phone`
        flex-wrap: wrap;
    `};
    .person-base {
        flex: 1 0 auto;
        .name {
            font-size: 20px;
        }
        .aim {
            font-size: 12px;
        }
    }
    .person-info {
        flex: 1 0 auto;
        padding: 5px;
        list-style: none;
        li {
            font-size: 12px;
            padding: 5px;
            strong {
                margin-right: 5px;
            }
        }
    }
    .person-img {
        flex: 1 0 auto;
        text-align: right;
        img {
            width: 90px;
            height: 90px;
            border-radius: 2px;
        }
        h3{
            display: none;
        }
    }
`;

interface UserInfo {
    name: string;
    location: string;
}

const Header = (props: { userInfo: UserInfo }) => {
    const { userInfo } = props;
    return (
        <AboutHeader className="about-header">
            <div className="person-base">
                <h2 className="name">{userInfo.name}</h2>
                <h3 className="aim">求职目标：web前端工程师</h3>
            </div>
            <ul className="person-info">
                <li><strong>Age:</strong>2*岁</li>
                <li><strong>Phone:</strong>185(*^_^*)7248</li>
                <li><strong>Profession:</strong>计算机科学与技术</li>
            </ul>
            <ul className="person-info">
                <li><strong>Location:</strong>{userInfo.location}</li>
                <li><strong>Email:</strong>bs32g1038@163.com</li>
                <li><strong>Education:</strong>大学本科</li>
            </ul>
            <div className="person-img">
                <img src="/public/images/avatar.png" alt="头像" />
                <h3 className="aim">web前端工程师</h3>
            </div>
        </AboutHeader>
    );
};

const loading = (
    <ContentLoader width={720} height={100}>
        <rect x="0" y="10" rx="2" ry="2" width="160" height="100"></rect>
        <rect x="190" y="10" rx="2" ry="2" width="160" height="100"></rect>
        <rect x="370" y="10" rx="2" ry="2" width="160" height="100"></rect>
        <rect x="550" y="10" rx="2" ry="2" width="160" height="100"></rect>
    </ContentLoader>
);

export default (props: { userInfo: UserInfo }) => {
    return props.userInfo ? <Header userInfo={props.userInfo}></Header> : loading;
};