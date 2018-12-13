import styled from '@emotion/styled';
import React from 'react';
import { parseTime, timeAgo } from '../../utils/time';
import CommentForm from '../comment-form';

const CommentsItem = styled.li((_) => ({
    borderBottom: '1px solid #F8F8F7',
    marginBottom: '16px',
    paddingBottom: '16px',
    '&:lash-child': {
        borderBottom: 'none'
    }
}));

const Info = styled.div((_) => ({
    fontSize: '14px',
    marginBottom: '10px',
    paddingTop: '10px',
    'a': {
        textDecoration: 'none'
    }
}));

const InfoAuthor = styled.span((_) => ({
    color: '#d95059'
}));

const InfoTime = styled.span((_) => ({
    color: '#9e9e9e',
    fontSize: '0.875',
    marginLeft: '8px'
}));

const ItemContent = styled.div((_) => ({
    fontSize: '14px',
    lineHeight: 1.5
}));

const Quote = styled.div((_) => ({
    backgroundColor: '#F8F8F7',
    fontSize: '14px',
    marginBottom: '10px',
    marginLeft: '10px',
    padding: '5px 20px 5px 20px'
}));

const ReplyBox = styled.div((_) => ({
    marginTop: '10px'
}));

const replyFn = (item: any) => (
    <Quote>
        <InfoAuthor><i className="fa fa-fw fa-user"></i>{item.nickName}</InfoAuthor>
        <InfoTime>{timeAgo(item.createdAt)}前</InfoTime>
        <ItemContent>
            {item.content}
        </ItemContent>
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
                    <InfoAuthor><i className="fa fa-fw fa-user"></i>{item.nickName} 说：</InfoAuthor>
                    <div style={{ float: 'right' }}>
                        <span className="ArticleComments-infoTime">{parseTime(item.createdAt)} | </span>
                        <a
                            href="javascript:;"
                            comment-id={item._id}
                            onClick={() => (this.setState({
                                showCommentForm: this.state.showCommentForm ? '' : item._id
                            }))}
                        >
                            回复
                        </a>
                    </div>
                </Info>
                {item.reply && replyFn(item.reply)}
                <ItemContent>{item.content}</ItemContent>
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
            </CommentsItem>
        );
    }
}
export default Item;