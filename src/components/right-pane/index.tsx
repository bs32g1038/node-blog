import styled from '@emotion/styled';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import siteInfo from '../../config/site-info';
import { State } from '../../redux/reducers/articles';
import media from '../../utils/media';
import AppFooter from '../app-footer';

const RightPaneDiv = styled.div`
    display: block;
    z-index: 900;
    max-width: none;
    height: 100%;
    width: 240px;
    background-color: #f4f5f7;
    position: fixed;
    right: 0;
    top: 0;
    ${media.phone`
        position: static;
        width: 100%;
        background-color: #fff;
    `};
`;

const MainWrap = styled.div`
    position: relative;
    bottom: 0;
    color: #333;
    >p {
        font-size: 12px
    }
`;

const Item = styled.div`
    ${media.phone`display:none;`};
    >h3{
        margin-left: 10px;
        font-weight: 600;
        font-size: 12px;
    }
`;

const SearchWrap = styled.div`
    display: flex;
    padding: 0 10px;
    align-items: center;
    input {
        width: 160px;
        color: #333;
        text-decoration: none;
        line-height: 26px;
        outline: none;
        padding-left: 5px;
    }
    button {
        width: 50px;
        height: 32px;
        background: #3aa5d0;
        color: #fff;
        border-radius: 0 4px 4px 0;
        border: none;
        cursor: pointer;
    }
`;

const UL = styled.ul`
    display: inline-block;
    position: relative;
    margin: 0;
    list-style-type: decimal;
    padding: 0 5px 0 0;
    ${media.phone`display:none;`};
    >h3 {
        margin-left: 10px;
        font-weight: 600;
        font-size: 12px;
    }
`;

const LI = styled.li`
    margin: 10px 1px 0 35px;
    line-height: 1em;
`;

const ATag = styled(Link)`
    display: block;
    position: relative;
    color: #333;
    text-decoration: none;
    font-size: 12px;
    border-radius: 30px;
    line-height: 1.5;
`;

const Footer = styled.footer`
    margin-top: 20px;
    box-sizing: border-box;
    color: #8590a6;
    flex: 0 0 auto;
    font-size: 12px;
    font-weight: normal;
    position: relative;
    text-align: center;
    padding: 8px 10px 10px 10px;
`;

class RightPane extends React.Component<any, any> {
    public render() {
        const { recentArticles } = this.props._DB;
        return (
            <RightPaneDiv>
                <MainWrap>
                    <Item>
                        <h3>搜索</h3>
                        <SearchWrap>
                            <div>
                                <input type="text" />
                            </div>
                            <div>
                                <button>搜索</button>
                            </div>
                        </SearchWrap>
                    </Item>
                    <UL>
                        <h3>最新文章</h3>
                        {
                            recentArticles.map((item: any) => (
                                <LI key={item._id}>
                                    <ATag to={'/blog/articles/' + item._id}>{item.title}</ATag>
                                </LI>
                            ))
                        }
                    </UL>
                    <AppFooter
                        siteInfo={{
                            icp: siteInfo.icp,
                            name: siteInfo.name
                        }}
                    >
                    </AppFooter>
                </MainWrap>
            </RightPaneDiv>
        );
    }
}

export default connect(
    (state: any) => ({
        _DB: state.articles
    })
)(RightPane as any);