import React from 'react';
import { Layout } from 'antd';
import Header from '../components/Header';
import Sider from '../components/Sider';

const main = React.createClass({
  render() {
    return (
      <Layout >
        <Header></Header>
        <Sider></Sider>
        {this.props.children}
      </Layout>
    );
  }
})
export default main