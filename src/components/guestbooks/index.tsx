import styled from '@emotion/styled';
import queryString from 'query-string';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import siteInfo from '../../config/site-info';
import { State } from '../../redux/reducers/guestbooks';
import { fetchGuestbooks } from '../../redux/reducers/guestbooks';
import { media, rem } from '../../utils/helper';
import CommentForm from '../comment-form';
import ContentLoader from '../content-loader';
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

    public static asyncData(store: any, route: any) {
        const page = route.query.page;
        const limit = route.query.limit || 20;
        return store.dispatch(fetchGuestbooks(page, limit));
    }

    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: false
        };
    }

    public componentDidMount() {
        const q = queryString.parse(location.search);
        this.setState({
            isLoading: true
        });
        Guestbooks.asyncData({ dispatch: this.props.dispatch }, {
            query: q,
            params: this.props.match.params
        }).then(() => {
            this.setState({
                isLoading: false
            });
        });
    }

    public render() {
        const { guestbooks } = this.props._DB;
        const lefts: any[] = [];
        const rigths: any[] = [];
        guestbooks.map((guestbook: any, index: number) => {
            const item = <GuestbookItem item={guestbook} key={guestbook._id}></GuestbookItem>;
            return index % 2 === 0 ? lefts.push(item) : rigths.push(item);
        });
        const loaders = [];
        for (let i = 0; i < 9; i++) {
            loaders.push(
                <ContentLoader width={720} height={240} key={`leftLoaders-${i}`}>
                    <circle cx="50" cy="50" r="40"></circle>
                    <rect x="100" y="30" width="100" height="40"></rect>
                    <rect x="300" y="30" width="200" height="40"></rect>
                    <rect x="520" y="30" width="180" height="40"></rect>
                    <rect x="20" y="120" width="690" height="50"></rect>
                    <rect x="20" y="200" width="690" height="40"></rect>
                </ContentLoader>
            );
        }
        return (
            <GuestbooksWrap>
                {
                    this.state.isLoading ?
                        <>
                            <Helmet title={siteInfo.name + '-留言板'}></Helmet>
                            <Title>
                                <ContentLoader width={720} height={40}>
                                    <rect x="260" y="0" width="200" height="40"></rect>
                                </ContentLoader>
                            </Title>
                            <Main>
                                <div>{loaders}</div>
                                <div style={{ marginRight: '-5px' }}>{loaders}</div>
                            </Main>
                            <GuestbooksFormWrap>
                                <ContentLoader width={720} height={200}>
                                    <rect x="0" y="0" width="720" height="200"></rect>
                                </ContentLoader>
                            </GuestbooksFormWrap>
                        </>
                        :
                        <>
                            <Helmet title={siteInfo.name + '-留言板'}></Helmet>
                            <Title>--留言板--</Title>
                            <Main>
                                {
                                    guestbooks.length <= 0
                                    &&
                                    (
                                        <div
                                            style={{ width: '100%', textAlign: 'center' }}
                                        >
                                            暂无数据
                                        </div>
                                    )
                                }
                                <div>{lefts}</div>
                                <div style={{ marginRight: '-5px' }}>{rigths}</div>
                            </Main>
                            <GuestbooksFormWrap>
                                <CommentForm url="/guestbooks"></CommentForm>
                            </GuestbooksFormWrap>
                        </>
                }
            </GuestbooksWrap>

        );
    }
}

export default connect(
    (state: State) => ({
        _DB: state.guestbooks
    })
)(Guestbooks as any);