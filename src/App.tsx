import { Global } from '@emotion/core';
import styled from '@emotion/styled';
import { normalize } from 'polished';
import queryString from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { Route } from 'react-router-dom';
import AppFooter from './components/app-footer';
import AppHeader from './components/app-header';
import Progress from './components/progress';
import siteInfo from './config/site-info';
import media from './utils/media';

let _t: any = null;
let _timer: any = null;

const PageWrap = styled.div`
    width: 720px;
    margin: 0 auto;
    ${media.phone`margin-left:0;margin-right:0;width: 100%;`};
`;

class App extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        const { routes } = this.props;
        this.state = {
            routes,
            previousLocation: this.props.location,
            isFetching: false,
            isShowProgress: false,
            percent: 0,
            _timer: null,
            init: false
        };
    }

    // // 预加载数据，并显示滚动条
    public getDataBeforeRouter(location: any) {
        const q = queryString.parse(location.search);
        const branchs = matchRoutes(this.state.routes, location.pathname);
        return Promise.all(branchs.map((branch: any) => {
            return branch && branch.route.asyncData && branch.route.asyncData(
                { dispatch: this.props.dispatch },
                {
                    query: q,
                    params: branch.match.params
                }
            );
        }));
    }

    public componentDidUpdate(prevProps: any, prevState: any) {
        if ((this.state.previousLocation.pathname !== this.props.location.pathname || this.state.previousLocation.search !== this.props.location.search) && !this.state.isFetching) {
            this.setState({
                isFetching: true
            });
            this.increase();
        }
        if (this.state.isFetching) {
            const w: any = window;
            if (typeof w._hmt !== 'undefined') {
                w._hmt.push(['_trackPageview', this.props.location.pathname]);
            }
            this.getDataBeforeRouter(this.props.location).then((res) => {
                this.setState({
                    previousLocation: this.props.location,
                    isFetching: false
                });
                this.finishProgress();
            }).catch((err) => {
                console.log('获取数据失败！', err);
            });
        }
    }

    public componentDidMount() {
        this.setState({
            isFetching: true
        });
        this.increase();
        if (this.state.isFetching) {
            const w: any = window;
            if (typeof w._hmt !== 'undefined') {
                w._hmt.push(['_trackPageview', this.props.location.pathname]);
            }
            this.getDataBeforeRouter(this.props.location).then((res) => {
                this.finishProgress();
                this.setState({
                    previousLocation: this.props.location,
                    isFetching: false
                });
            }).catch((err) => {
                console.log('获取数据失败！', err);
            });
        }
    }

    // 进度条进度增加
    public increase() {
        if (this.state.percent > 95 && !this.state.isShowProgress) {
            return this.setState({
                percent: 0,
                isShowProgress: true
            });
        }
        const percent = this.state.percent + 30 * Math.random();
        if (percent >= 95) {
            clearTimeout(_timer);
            return;
        }
        this.setState({ percent, isShowProgress: true });
        _timer = setTimeout(() => this.increase(), 1000);
    }

    // 进度条完成
    public finishProgress() {
        clearInterval(_timer);
        clearInterval(_t);
        this.setState({
            percent: 100
        });
        _t = setTimeout(() => {
            this.setState({
                isShowProgress: false,
                percent: 0
            });
        }, 500);
    }

    public render() {
        const theme = {
            isMobile: this.props.$G.isMobile
        };
        return (
            <div className="app">
                <Progress show={this.state.isShowProgress} percent={this.state.percent} />
                <Global styles={normalize()} />
                <Global
                    styles={{
                        body: {
                            color: '#444',
                            fontFamily: '-apple-system, Monda, PingFang SC, Microsoft YaHei, sans-serif',
                            fontSize: '14px',
                            lineHeight: '1.5',
                            margin: 0
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
                        this.state.routes && <Route
                            location={this.state.previousLocation || this.props.location}
                            render={() => (
                                renderRoutes(this.state.routes[1].routes)
                            )}
                        />
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