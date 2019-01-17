import styled from '@emotion/styled';
import React from 'react';
import marked from '../../utils/marked';
import { parseTime, timeAgo } from '../../utils/time';
import CommentForm from '../comment-form';

const CommentsItem = styled.li`
    border-bottom: 1px solid #f5f5f5;
    padding: 10px;
`;

const Info = styled.div`
    display:flex;
`;

const AvatarWrap = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 4px;
    margin-right: 10px;
    margin-top: 5px;
    img {
        width: 40px;
        height: auto;
        vertical-align: middle;
        border-radius: 4px;
    }
`;

const Content = styled.div``;

const Meta = styled.div`
    color: #999;
    font-size: 12px;
    >a {
        text-decoration: none;
        color: #999;
    }
`;

const User = styled.div`
   
`;

const NickName = styled.span`
    font-weight: 700;
    word-wrap: break-word;
    color: #6d757a;
`;

const UserSign = styled.span`
    margin-left: 5px;
    color: #fff;
    background-color: rgba(58, 165, 208, 0.8);
    padding: 0 4px;
    border-radius: 2px;
    font-size: 12px;
    display: inline-block;
    ${(props: any) => props.isAdmin && 'background-color: rgba(250, 90, 60, .95)'};
`;

const InfoTime = styled.span((_) => ({
    color: '#9e9e9e',
    fontSize: '0.875',
    marginLeft: '8px'
}));

const ItemContent = styled.div`
    font-size: 14px;
    line-height: 1.5;
    p {
        margin: 5px 0;
        img {
            width: 20px;
            vertical-align: bottom;
        }
    }
`;

const Quote = styled.div`
    background-color: #f5f5f5;
    font-size: 14px;
    margin-bottom: 10px;
    padding: 5px 20px 5px 20px;
    margin-top: 10px;
    border-radius: 5px;
    display: flex;
`;

const ReplyBox = styled.div`
    margin-top: 10px;
`;

const calcAvatarId = (name: any) => {
    let sum = 0;
    for (const c of name) {
        const num = c.charCodeAt();
        sum = sum + (num % 4) * 3;
    }
    return sum % 10;
};

const replyFn = (item: any) => (
    <Quote>
        <AvatarWrap>
            <img src={item.identity === 0 ? `/public/images/comment-avatars/avatar-${calcAvatarId(item.nickName)}.jpg` : '/public/images/avatar.jpg'} />
        </AvatarWrap>
        <Content>
            <User>
                <NickName>
                    {item.nickName}
                </NickName>
                <UserSign isAdmin={item.identity !== 0}>
                    {item.identity !== 0 ? '博主' : '游客'}
                </UserSign>
            </User>
            <ItemContent dangerouslySetInnerHTML={{ __html: marked(item.content) }}></ItemContent>
            <Meta>发表于：{timeAgo(item.createdAt)}前</Meta>
        </Content>
    </Quote>
);

class Item extends React.Component<{ item: any }, any> {
    public state = {
        showCommentForm: ''
    };
    public render() {
        const item = this.props.item;
        return (
            <CommentsItem>
                <Info>
                    <AvatarWrap>
                        <img src={item.identity === 0 ? `/public/images/comment-avatars/avatar-${calcAvatarId(item.nickName)}.jpg` : '/public/images/avatar.jpg'} />
                    </AvatarWrap>
                    <Content>
                        <User>
                            <NickName>{item.nickName}</NickName>
                            <UserSign isAdmin={item.identity !== 0}>
                                {item.identity !== 0 ? '博主' : '游客'}
                            </UserSign>
                        </User>
                        <ItemContent dangerouslySetInnerHTML={{ __html: marked(item.content) }}></ItemContent>
                        <Meta>
                            <span className="ArticleComments-infoTime">
                                发表于：{parseTime(item.createdAt)}
                            </span>
                            <span> | </span>
                            <a
                                href="javascript:;"
                                comment-id={item._id}
                                onClick={() => (this.setState({
                                    showCommentForm: this.state.showCommentForm ? '' : item._id
                                }))}
                            >
                                回复
                            </a>
                        </Meta>
                        {item.reply && replyFn(item.reply)}
                        <ReplyBox>
                            {
                                this.state.showCommentForm === item._id
                                && <CommentForm
                                    url="/comments"
                                    articleId={item.article}
                                    replyId={item._id}
                                />
                            }
                        </ReplyBox>
                    </Content>
                </Info>
            </CommentsItem>
        );
    }
}
export default Item;