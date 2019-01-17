import styled from '@emotion/styled';
import React, { SFC } from 'react';
import { media, rem } from '../../utils/helper';
import marked from '../../utils/marked';
import { timeAgo } from '../../utils/time';

const GuestbookItem = styled.div`
    padding: ${rem('20px')};
    position: relative;
    width: 334px;
    box-sizing: border-box;
    margin-right: 5px;
    margin-bottom: 5px;
    border-bottom: 1px solid #f4f5f7;
    border-right: 1px solid #f4f5f7;
    border-radius: 6px;
    box-shadow: 0 3px 8px #ececec;
    ${media.phone`
        box-shadow: none;
        border: none;
        width: 100%;
    `}
`;

const UserMata = styled.div((_) => ({
    color: '#999',
    display: 'flex',
    fontSize: '14px',
    paddingTop: '5px',
}));

const NickName = styled.span((_) => ({
    color: '#42b983',
    flex: '1 0 auto',
    paddingLeft: '5px'
}));

const AvatarWrap = styled.div((_) => ({
    height: '24px',
    width: '24px'
}));

const AvatarWrapA = styled.a((_) => ({
    height: '24px',
    width: '24px'
}));

const AvatarImg = styled.img`
    background-color: #f2f2f1;
    border-radius: 50%;
    display: block;
    height: 100%;
    width: 100%;
`;

const UserContent = styled.div`
    border-radius: 4px;
    font-size: 14px;
    line-height: 1.8;
    padding: 10px 0;
    img{
        max-width: 20px;
        vertical-align: middle;
    }
`;

const MataTime = styled.span((_) => ({
    fontSize: '12px',
    paddingLeft: '5px'
}));
const MataMap = MataTime;

const Item: SFC<{ item: any }> = (props: any) => {
    const { item } = props;
    return (
        <GuestbookItem>
            <UserMata>
                {
                    item.website ?
                        <AvatarWrapA href={item.website} rel="noopener noreferrer" target="_blank">
                            <AvatarImg src={item.avatar} alt={item.nickName} />
                        </AvatarWrapA>
                        :
                        <AvatarWrap className="Guestbooks-avatar">
                            <AvatarImg src={item.avatar} alt={item.nickName} />
                        </AvatarWrap>
                }
                <NickName>
                    <strong>{item.nickName}</strong>
                </NickName>
                <MataMap>
                    <i className="fa fa-map-marker fa-fw"></i>
                    {item.location || '远方的来客'}
                </MataMap>
                <MataTime>
                    <i className="fa fa-clock-o fa-fw"></i>
                    {timeAgo(item.createdAt)}
                </MataTime>
            </UserMata>
            <UserContent dangerouslySetInnerHTML={{ __html: marked(item.content) }}></UserContent>
            <UserContent><strong>回复：</strong>&nbsp;&nbsp;{item.replyContent || '暂无回复...'}</UserContent>
        </GuestbookItem>
    );
};

export default Item;