import React, { Component } from 'react';
import { render } from 'react-dom';
import styles from "./cssmodule.scss";
class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
    }
    componentDidMount() {
        document.getElementById('message').classList.add(styles.fadeIn);
    }
    render() {
        let { content } = this.state;
        return (
            <div className={styles.message}>
                <div className={styles.messageNotice}>
                    <div className={styles.messageNoticeContent} id="message">
                        <i className="fa fa-info-circle fa-fw"></i>
                        <span> {content} </span>
                    </div>
                </div>
            </div>
        );
    }
}

Message.newInstance = function newNotificationInstance(properties) {
    let props = properties || {};
    let div = document.createElement('div');
    document.body.appendChild(div);
    const notification = render(<Message {...props} />, div);
    return {
        notice(noticeProps) {
            notification.setState({ ...noticeProps });
        },
        component: notification,
        destroy() {
            render(null, div);
            document.body.removeChild(div);
        },
    };
};


export default {
    info(content) {
        const messageInstance = Message.newInstance({});
        messageInstance.notice({ content });
        setTimeout(() => {
            messageInstance.destroy();
        }, 2.5 * 1000);
    }
};