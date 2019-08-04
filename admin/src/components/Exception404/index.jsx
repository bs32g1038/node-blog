import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';
import React from 'react';

export default () => (
    <Result
        status="404"
        title="404"
        style={{
            background: 'none',
        }}
        subTitle="Sorry, the page you visited does not exist."
        extra={
            <Link to="/">
                <Button type="primary">返回首页</Button>
            </Link>
        }
    />
);
