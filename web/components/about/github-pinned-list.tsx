import styled from '@emotion/styled';
import React from 'react';

const PinnedItemsList = styled.ol`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
    margin-bottom: 0;
    margin-top: 0;
    padding-left: 0;
    .pinned-item-list-item {
        margin-bottom: 16px;
        width: calc(50% - 8px);
        background-color: #f6f7fa;
        border-radius: 3px;
        padding: 16px;
        box-sizing: border-box;
    }
    .pinned-item-list-item-content {
        display: flex;
        flex-direction: column;
        width: 100%;
        >.header {
            display: flex;
            width: 100%;
            position: relative;
            align-items: center;
            > a {
                color: #0366d6;
            }
        }
        .header-icon {
            margin-right: 8px
        }
        a {
            text-decoration: none;
            flex: 1 0 auto;
        }
    }
    .pinned-item-desc {
        flex: 1 0 auto;
        font-size: 12px;
        margin-bottom: 16px;
        color: #586069;
    }
    .meta{
        font-size: 12px;
        color: #586069;
        margin-bottom: 0;
    }
    .meta-item {
        margin-right: 16px;
    }
    .pinned-item-meta {
        display: inline-block;
        color: #586069;
        text-decoration: none;
    }
    .pinned-item-meta+.pinned-item-meta {
        margin-left: 16px;
    }
    .octicon {
        vertical-align: text-bottom;
        display: inline-block;
        fill: currentColor;
    }
    .repo-language-color {
        border-radius: 50%;
        display: inline-block;
        height: 12px;
        position: relative;
        top: 1px;
        width: 12px;
        margin-right: 3px;
    }
`;

interface UserRepoItem {
    name: string;
    language: string;
    forkCount: number;
    description: string;
    stargazersCount: number;
}

interface UserReposProps {
    userRepos: UserRepoItem[];
}

const PinnedListItem = (props: { item: UserRepoItem }) => {
    const { item } = props;
    return (
        <li key={item.name} className="pinned-item-list-item">
            <div className="pinned-item-list-item-content">
                <div className="header">
                    <svg className="octicon header-icon" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path fillRule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path></svg>
                    <a href={'https://github.com/bs32g1038/' + item.name} rel="noopener noreferrer" target="_blank">{item.name}</a>
                    <span className="pinned-item-handle js-pinned-item-reorder pl-2" title="Drag to reorder">
                        <svg className="octicon octicon-grabber" viewBox="0 0 8 16" version="1.1" width="8" height="16" aria-hidden="true"><path fillRule="evenodd" d="M8 4v1H0V4h8zM0 8h8V7H0v1zm0 3h8v-1H0v1z"></path></svg>
                    </span>
                </div>
                <p className="pinned-item-desc">{item.description}</p>
                <p className="meta">
                    <span className="meta-item">
                        <span className="repo-language-color" style={{ backgroundColor: '#2b7489' }}></span>
                        <span>{item.language}</span>
                    </span>
                    <a className="pinned-item-meta" href={'https://github.com/bs32g1038/' + item.name + '/stargazers'} rel="noopener noreferrer" target="_blank">
                        <svg aria-label="stars" className="octicon" viewBox="0 0 14 16" version="1.1" width="14" height="16"><path fillRule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>
                        &nbsp;{item.stargazersCount}
                    </a>
                    <a className="pinned-item-meta" href={'https://github.com/bs32g1038/' + item.name + '/network/members'} rel="noopener noreferrer" target="_blank">
                        <svg aria-label="forks" className="octicon" viewBox="0 0 10 16" version="1.1" width="10" height="16"><path fillRule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>
                        &nbsp;{item.forkCount}
                    </a>
                </p>
            </div>
        </li>
    );
};

export default (props: UserReposProps) => {
    const { userRepos } = props;
    return (
        <>
            <p>github开源项目</p>
            <PinnedItemsList>
                {
                    userRepos.map((item: UserRepoItem) => (
                        <PinnedListItem item={item} key={item.name}></PinnedListItem>
                    ))
                }
            </PinnedItemsList>
        </>
    );
};