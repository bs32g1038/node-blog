import styled from '@emotion/styled';
import React from 'react';
import { connect } from 'react-redux';
import { State } from '../../redux/reducers/guestbooks';
import CommentForm from '../comment-form';
import GuestbookItem from './item';

const GuestbooksWrap = styled.div((_) => ({
    backgroundColor: '#fff',
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'column'
}));

const FormInline = styled.div((_) => ({
    display: 'flex'
}));
const Main = FormInline;

const Title = styled.h2((_) => ({
    fontSize: '24px',
    textAlign: 'center'
}));

const GuestbooksFormWrap = styled.div((_) => ({
    padding: '20px'
}));

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
                <Title>--留言板--</Title>
                <Main>
                    <div>{lefts}</div>
                    <div>{rigths}</div>
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
)(Guestbooks);