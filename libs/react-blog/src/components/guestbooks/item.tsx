import styled from '@emotion/styled';
import React, { SFC } from 'react';
import { timeAgo } from '../../utils/time';

const GuestbookItem = styled.div((_) => ({
    padding: '20px 25px',
    position: 'relative',
    width: '400px',
    boxSizing: 'border-box',
    label: 'Guestbooks-item'
}));

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

const AvatarImg = styled.img((_) => ({
    backgroundColor: '#f2f2f1',
    borderRadius: '50%',
    display: 'block',
    height: '100%',
    width: '100%'
}));

const UserContent = styled.div((_) => ({
    borderRadius: '4px',
    fontSize: '14px',
    lineHeight: '1.8',
    padding: '10px 0'
}));

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
            <UserContent>{item.content}</UserContent>
            <UserContent><strong>回复：</strong>&nbsp;&nbsp;{item.replyContent || '暂无回复...'}</UserContent>
        </GuestbookItem>
    );
};

export default Item;