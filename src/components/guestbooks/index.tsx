import styled from '@emotion/styled';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { State } from '../../redux/reducers/guestbooks';
import { media, rem } from '../../utils/helper';
import CommentForm from '../comment-form';
import GuestbookItem from './item';

const GuestbooksWrap = styled.div`
    background-color: #fff;
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    padding: ${rem('28px')} 0 ;
`;

const Main = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: ${rem('20px')};
    >div{
        width: 50%;
    }
    ${media.phone`
        >div {
            width: 100%;
        }
    `}
`;

const Title = styled.h2`
    font-size: 24px;
    text-align: center;
    margin: 5px 0;
`;

const GuestbooksFormWrap = styled.div`
    padding: ${rem('20px')};
`;

class Guestbooks extends React.Component<any, any> {
    public render() {
        const { guestbooks } = this.props._DB;
        const lefts: any[] = [];
        const rigths: any[] = [];
        guestbooks.map((guestbook: any, index: number) => {
            const item = <GuestbookItem item={guestbook} key={guestbook._id}></GuestbookItem>;
            return index % 2 === 0 ? lefts.push(item) : rigths.push(item);
        });
        return (
            <GuestbooksWrap>
                <Helmet title="lizc-留言板"></Helmet>
                <Title>--留言板--</Title>
                <Main>
                    {
                        guestbooks.length <= 0 && (
                            <div style={{ width: '100%', textAlign: 'center'}}>
                                暂无数据
                        </div>)}
                    <div>{lefts}</div>
                    <div style={{marginRight: '-5px'}}>{rigths}</div>
                </Main>
                <GuestbooksFormWrap>
                    <CommentForm url="/guestbooks"></CommentForm>
                </GuestbooksFormWrap>
            </GuestbooksWrap>
        );
    }
}

export default connect(
    (state: State) => ({
        _DB: state.guestbooks
    })
)(Guestbooks as any);