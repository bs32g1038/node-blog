import { Global } from '@emotion/core';
import styled from '@emotion/styled';
import { normalize } from 'polished';
import React from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import AppFooter from './components/app-footer';
import AppHeader from './components/app-header';
import siteInfo from './config/site-info';
import { fetchCategories } from './redux/reducers/categories';
import media from './utils/media';

const PageWrap = styled.div`
    width: 960px;
    margin: 20px auto;
    ${media.phone`margin-left:0;margin-right:0;width: 100%;`};
`;

class App extends React.Component<any, any> {

    public static asyncData(store: any) {
        store.dispatch(fetchCategories());
    }

    constructor(props: any) {
        super(props);
        const { routes } = this.props;
        this.state = {
            routes,
            previousLocation: this.props.location,
            nextLocation: null,
            isFetching: false,
            isShowProgress: false,
            percent: 0,
            _timer: null,
            init: false,
            num: 1
        };
    }

    public render() {
        const theme = {
            isMobile: this.props.$G.isMobile
        };
        return (
            <div className="app">
                <Global styles={normalize()} />
                <Global
                    styles={{
                        body: {
                            color: '#444',
                            fontFamily: '-apple-system, Monda, PingFang SC, Microsoft YaHei, sans-serif',
                            fontSize: '14px',
                            lineHeight: '1.5',
                            margin: 0,
                            overflowY: 'scroll'
                        },
                        input: {
                            font: '400 14px/16px -apple-system, Monda, PingFang SC, Microsoft YaHei, sans-serif'
                        },
                        textarea: {
                            font: '400 14px/16px -apple-system, Monda, PingFang SC, Microsoft YaHei, sans-serif'
                        },
                    }}
                />
                <AppHeader
                    siteInfo={{
                        github: siteInfo.github,
                        name: siteInfo.name
                    }}
                >
                </AppHeader>
                <PageWrap>
                    {
                        renderRoutes(this.state.routes[1].routes)
                    }
                </PageWrap>
                <AppFooter
                    siteInfo={{
                        icp: siteInfo.icp,
                        name: siteInfo.name
                    }}
                >
                </AppFooter>
            </div>
        );
    }
}

export default connect(
    (state: any) => ({
        $G: state.$G
    })
)(App as any);