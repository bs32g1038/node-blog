import React from 'react';
import { Card } from 'antd';
import styled from '@emotion/styled';
import marked from '@blog/client/libs/marked';
import GHAT from '@blog/client/libs/generate-avatar';
import { md5 } from '@blog/client/admin/utils/crypto-js';
import { timeAgo } from '@blog/client/libs/time';
const ghat = new GHAT();

const RecentCommentListCard = styled(Card)`
    .ant-card-head {
        padding: 0;
    }
    .ant-card-meta-description {
        height: 44px;
        overflow: hidden;
        color: #666;
        line-height: 22px;
    }
    .cardTitle {
        font-size: 0;
        a {
            display: inline-block;
            height: 24px;
            margin-left: 12px;
            color: #333;
            font-size: 14px;
            line-height: 24px;
            vertical-align: top;
            &:hover {
                color: #333;
            }
        }
    }
    .projectGrid {
        width: 33.33%;
    }
    .projectItemContent {
        display: flex;
        height: 20px;
        margin-top: 8px;
        overflow: hidden;
        font-size: 12px;
        line-height: 20px;
        a {
            display: inline-block;
            flex: 1 1 0;
            color: #666;
            &:hover {
                color: #333;
            }
        }
        .datetime {
            flex: 0 0 auto;
            float: right;
            color: #333;
        }
    }
`;

const CommentMsgDiv = styled.div`
    font-size: 14px;
    padding: 20px;
    border-bottom: 1px solid #e8e8e8;
`;

const CommentInfoDiv = styled.div`
    margin-bottom: 10px;
`;

const CommentContentTitleA = styled.a`
    color: #878d99;
    font-style: italic;
`;

const TimestampSpan = styled.span`
    color: #878d99;
    font-style: italic;
`;

const CommentLogoImg = styled.img`
    width: 40px;
    border-radius: 4px;
    display: block;
    position: absolute;
`;

const CommentTextDiv = styled.div`
    border-radius: 5px;
    position: relative;
    padding: 10px;
    margin: 5px 0 0 50px;
    color: #5a5e66;
    background-color: #edf2fc;
    font-size: 14px;
    &:before,
    &:after {
        position: absolute;
        right: 100%;
        top: 15px;
        border: solid transparent;
        border-right-color: #edf2fc;
        content: ' ';
        height: 0;
        width: 0;
        pointer-events: none;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    &:before {
        border-width: 6px;
        margin-top: -6px;
    }
    &:after {
        border-width: 5px;
        margin-top: -5px;
    }
`;

interface Props {
    recentComments: any[];
    loading: boolean;
}

export default (props: Props) => {
    const { recentComments = [], loading = false } = props;
    return (
        <RecentCommentListCard
            style={{ marginBottom: 24 }}
            title="近期评论"
            bordered={false}
            bodyStyle={{ padding: 0 }}
            loading={loading}
        >
            <div>
                {recentComments.map(item => (
                    <CommentMsgDiv key={item._id}>
                        <CommentInfoDiv>
                            <span>
                                <span>
                                    <strong>{item.nickName}</strong>
                                </span>
                                &nbsp;在&nbsp;
                                <CommentContentTitleA
                                    href={`/blog/articles/${item._id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {item.article && item.article.title}
                                </CommentContentTitleA>
                                {item.reply ? (
                                    <span>
                                        &nbsp;回复&nbsp;<strong>{item.reply.nickName}</strong>&nbsp;
                                    </span>
                                ) : (
                                    <span>&nbsp;说：&nbsp;</span>
                                )}
                            </span>
                            <TimestampSpan>
                                <i className="fa fa-clock-o fa-fw"></i>
                                <span>{timeAgo(item.createdAt)}</span>
                            </TimestampSpan>
                        </CommentInfoDiv>
                        <div className="random-logo">
                            <CommentLogoImg src={ghat.getImage(md5(item.nickName).toString()) || ''} />
                        </div>
                        <CommentTextDiv>
                            <div
                                className="markdown-body"
                                dangerouslySetInnerHTML={{
                                    __html: marked(item.content),
                                }}
                            ></div>
                        </CommentTextDiv>
                    </CommentMsgDiv>
                ))}
            </div>
        </RecentCommentListCard>
    );
};