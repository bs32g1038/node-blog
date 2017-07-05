import React, { Component } from 'react';
import { Layout } from 'antd';
import Header from '../components/Header';
import { connect } from 'react-redux';
const { Content } = Layout;

class main extends Component {
  componentWillMount() {
 
  }
  render() {
    const { user } = this.props;
    return (
      <Layout >
        <Header user={user}></Header>
        <Content style={{ margin: '0 auto', width: '1100px' }}>
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return {
    user
  };
}

export default connect(mapStateToProps)(main);
