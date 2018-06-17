import React, { Component } from 'react';
import axios from '../../utils/axios';
import message from '../Message';
import styles from './cssmodule.scss';
import { isURL } from 'validator';

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonLoading: false
        };
    }
    render() {
        let sumbitBtnStyle = this.state.buttonLoading ? { cursor: 'default', pointerEvents: 'none' } : {};
        return (
            <form className={styles.form} id="form" onSubmit={(e) => this.ok(e)}>
                <p className={styles.notice}>电子邮件地址不会被公开。必填项已用*标注</p>
                <div className={styles.formInline}>
                    <div className={styles.group}>
                        <label className={styles.label}>昵称<span className={styles.red}>*</span>：</label>
                        <input className={styles.input} id="nickName" name="nickName" placeholder="请输入你的昵称" type="text" />
                    </div>
                    <div className={styles.group}>
                        <label className={styles.label}>邮箱<span className={styles.red}>*</span>：</label>
                        <input className={styles.input} id="email" name="email" placeholder="请输入你的email" type="text" />
                    </div>
                    <div className={styles.group}>
                        <label className={styles.label}>网址：</label>
                        <input className={styles.input} id="website" name="website" placeholder="如：https://www.lizc.me" type="text" />
                    </div>
                </div>
                <div className={styles.contentWrap}>
                    <textarea className={styles.textarea} id="content" name="content" rows="3" placeholder="留点空白给你说~"></textarea>
                </div>
                <div className={styles.footer}>
                    <button type="submit" className={styles.submit} style={sumbitBtnStyle}>
                        {this.state.buttonLoading && <i className="fa fa-spinner fa-pulse fa-fw" ></i>}提 交
                    </button>
                </div>
            </form>
        );
    }

    flash(el) {
        let count = 1;
        let intervalID = setInterval(function () {
            if (count % 2 == 0) {
                el.style = 'border-bottom: 1px solid #f90000';
            } else {
                el.style = null;
            }
            count++;
            if (count >= 8) {
                clearInterval(intervalID);
            }
        }, 140);
    }

    ok(event) {
        let data = {
            article: this.props.articleId
        };
        const self = this;
        const elements = event.currentTarget.elements;
        for (let i = 0; i < elements.length; i++) {
            let ele = elements[i];
            if (ele.name) {
                if (ele.name == "email" && !/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(ele.value)) {
                    self.flash(ele);
                    return event.preventDefault();
                }
                if (ele.name == "website" && !isURL(ele.value, {
                    require_protocol: true
                })) {
                    self.flash(ele);
                    return event.preventDefault();
                }
                if (!ele.value && ele.name != "website") {
                    self.flash(ele);
                    return event.preventDefault();
                }
                data[ele.name] = ele.value;
            }
        }
        if (this.props.replyId) {
            Object.assign(data, {
                reply: this.props.replyId
            });
        }
        self.setState({
            buttonLoading: true
        });
        axios.post(this.props.url, data).then(() => {
            self.setState({
                buttonLoading: false
            });
            message.info('提交成功!');
            document.getElementById('form').reset();
        }).catch((err) => {
            const res = err.response;
            if (res.status == 429) {
                message.info('对不起！您的ip存在异常行为，系统已暂时禁止提交！');
            } else {
                message.info('sorry！系统异常，正在修复中。。。');
            }
            self.setState({
                buttonLoading: false
            });
        });
        return event.preventDefault();
    }
}

export default CommentForm;