import styled from '@emotion/styled';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import siteInfo from '../../config/site-info';
import { State } from '../../redux/reducers/articles';
import AppFooter from '../app-footer';

const HomeWrap = styled.div((_) => ({
    position: 'fixed',
    right: '0',
    display: 'block',
    zIndex: 900,
    maxWidth: 'none',
    height: '100%',
    top: 0,
    width: '260px',
    backgroundColor: '#f9f9f9'
}));

const MainWrap = styled.div((_) => ({
    position: 'relative',
    bottom: 0,
    color: '#333',
    '> p': {
        fontSize: '12px'
    }
}));

const Item = styled.div((_) => ({
    '> h3': {
        marginLeft: '10px',
        fontWeight: 600,
        fontSize: '12px'
    }
}));

const AvatarWrap = styled.a((_) => ({
    'img': {
        width: '80px',
        borderRadius: '50%',
        border: '3px solid #FFF',
        backgroundColor: 'transparent'
    }
}));

const SearchWrap = styled.div((_) => ({
    display: 'flex',
    padding: '0 10px',
    alignItems: 'center',
    'input': {
        width: '180px',
        color: '#333',
        textDecoration: 'none',
        lineHeight: '26px',
        outline: 'none',
        paddingLeft: '5px'
    },
    'button': {
        width: '50px',
        height: '32px',
        background: '#3aa5d0',
        color: '#fff',
        borderRadius: '0 4px 4px 0',
        border: 'none',
        cursor: 'pointer'
    }
}));

const Hr = styled.hr((_) => ({
    maxWidth: '160px',
    height: '1px',
    marginTop: '30px',
    marginBottom: '30px',
    border: 'none',
    backgroundImage: 'linear-gradient(0deg, transparent, #fff, transparent)'
}));

const Description = styled.p((_) => ({
    color: '#fff',
    '>a': {
        color: '#fff',
        textDecoration: 'none'
    }
}));

const UL = styled.ul((_) => ({
    display: 'inline-block',
    position: 'relative',
    margin: '0',
    listStyleType: 'decimal',
    padding: 0,
    '>h3': {
        marginLeft: '10px',
        fontWeight: 600,
        fontSize: '12px'
    }
}));

const LI = styled.li((_) => ({
    margin: '10px 1px 0 35px',
    lineHeight: '1em'
}));

const ATag = styled(Link)((_) => ({
    display: 'block',
    position: 'relative',
    color: '#333',
    textDecoration: 'none',
    fontSize: '12px',
    borderRadius: '30px',
    lineHeight: 1.5
}));

const Footer = styled.footer((_) => ({
    color: '#FFF',
    fontSize: '12px',
    marginTop: '40px'
}));

class RightPane extends React.Component<any, any> {
    public render() {
        const { recentArticles } = this.props._DB;
        console.log(recentArticles);
        return (
            <HomeWrap>
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
                                <LI>
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
            </HomeWrap>
        );
    }
}

export default connect(
    (state: State) => ({
        _DB: state.articles
    })
)(RightPane);