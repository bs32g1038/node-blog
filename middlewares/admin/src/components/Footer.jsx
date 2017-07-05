import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

class footer extends React.Component {
    render() {
        return (<Footer style={{ textAlign: 'center' }}>
            博客后台
          </Footer>
        )
    }

}

export default footer;