import React, { Component } from 'react';
import { render } from 'react-dom';
class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
    }
    componentDidMount() {
        document.getElementById('message').classList.add("MessageSlideInDown");
    }
    render() {
        let { content } = this.state;
        return (
            <div className="Message">
                <div className="Message-notice">
                    <div className="Message-noticeContent" id="message">
                        <i className="fa fa-info-circle fa-fw"></i>
                        <span> {content} </span>
                    </div>
                </div>
            </div>
        );
    }
}

function newNotificationInstance(properties) {
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
            document.getElementById('message').classList.add("MessageSlideInUp");
            setTimeout(() => {
                render(null, div);
                document.body.removeChild(div);
            }, 200);
        },
    };
};


export default {
    info(content) {
        const messageInstance = newNotificationInstance({});
        messageInstance.notice({ content });
        setTimeout(() => {
            messageInstance.destroy();
        }, 2.5 * 1000);
    }
};