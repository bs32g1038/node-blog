import * as React from 'react';
import axios from '../utils/axios';
import { withRouter } from "react-router-dom";
class UserLogin extends React.Component {
    constructor(props) {
        super(props);
    }
    login(e) {
        const { history } = this.props;
        const data = {};
        for (const ele of e.currentTarget.elements) {
            ele.name !== '' ? data[ele.name] = ele.value : "";
        }
        console.log(data)
        axios.post('/login', data).then((res) => {
            alert("登陆成功！")
            sessionStorage.setItem("user", res.data.account);
            history.push('/blog/admin/articles');
        })
        return e.preventDefault()
    }
    render() {
        return (
            <form onSubmit={(e) => this.login(e)} className="form-horizontal">
                <div className="form-group">
                    <label className="control-label">账号：</label>
                    <div>
                        <input
                            placeholder="请输入账户"
                            type="text"
                            className="form-control input-sm"
                            name="account" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label">密码：</label>
                    <div>
                        <input
                            placeholder="请填写密码"
                            type="password"
                            className="form-control input-sm"
                            name="password" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-3">操作：</label>
                    <button type="sumbit" className="btn is-primary">登录</button>
                </div>
            </form >
        );
    }
};
export default withRouter(UserLogin);