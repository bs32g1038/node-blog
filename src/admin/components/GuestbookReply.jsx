import * as React from 'react';
import axios from '../utils/axios';
import { withRouter } from "react-router-dom";
class GuestbookReply extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            guestbook: {}
        }
    }
    componentDidMount() {
        const { match } = this.props;
        axios.get('/guestbooks/' + match.params.id).then((res) => {
            this.setState({
                guestbook: res.data,
            });
        });
    }
    publish(e) {
        const { match, location, history } = this.props;
        const data = {};
        for (const ele of e.currentTarget.elements) {
            ele.name !== '' ? data[ele.name] = ele.value : "";
        }
        console.log(data)
        axios.put('/guestbooks/' + match.params.id, data).then((res) => {
            alert("提交成功")
            history.push('/blog/admin/guestbooks');
        })
        return e.preventDefault()
    }
    render() {
        const guestbook = this.state.guestbook;
        return (
            <div>
                <div className="article-publish">
                    <div className="manager-tip">
                        <i className="fa fa-edit fa-fw"></i>
                        控制台----回复留言
                    </div>
                    <form onSubmit={(e) => this.publish(e)} className="form-horizontal">
                        <div className="alert alert-warning text-center" role="alert"></div>
                        <div className="form-group">
                            <label className="control-label">昵称：</label>
                            <div>{guestbook.nickName}</div>
                        </div>
                        <div className="form-group">
                            <label className="control-label">email：</label>
                            <div>{guestbook.email}</div>
                        </div>
                        <div className="form-group">
                            <label className="control-label">email：</label>
                            <div>{guestbook.createdAt}</div>
                        </div>
                        <div className="form-group">
                            <label className="control-label">内容：</label>
                            <div>{guestbook.content}</div>
                        </div>
                        <div className="form-group">
                            <label className="control-label">回复内容：</label>
                            <textarea
                                key={guestbook._id}
                                placeholder="请输入文章内容摘要"
                                name="replyContent"
                                defaultValue={guestbook.replyContent}
                                style={{
                                    minHeight: "80px",
                                    maxHeight: "115px",
                                    width: "550px"
                                }}></textarea>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-3">操作：</label>
                            <button type="submit" className="btn is-primary" >发布</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default withRouter(GuestbookReply);