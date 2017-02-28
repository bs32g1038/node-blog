import React from 'react';
import '../App.css'
import { Layout } from 'antd';
import Header from './common/Header';
import Sider from './common/Sider';
// import Footer from '../common/Footer';

const main = React.createClass({
  render() {
    return (
      <Layout >
        <Header></Header>
        <Sider></Sider>
        {this.props.children}
        {/*<Footer></Footer>*/}
      </Layout>
    );
  }
})
export default main