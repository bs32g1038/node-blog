import React from 'react';
import { connect } from 'react-redux'
import PageHeaderWrapper from '../../components/PageHeaderWrapper';

const Dashboard = () => {
    return (
        <PageHeaderWrapper
            title='仪表盘'
            content='分析运营信息'
        >
            <div>welcome!</div>
        </PageHeaderWrapper>
    )
}

const mapStateToProps = (state) => {
    return {
        dashboard: state.dashboard
    }
}

const mapDispatchToProps = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)