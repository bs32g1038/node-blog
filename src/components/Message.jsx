import { Component, render } from 'inferno';

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            show: false
        }
    }
    render() {
        let { content, show } = this.state;
        return (
            <div className="message">
                <div className="message-notice">
                    <div className="message-notice-content">
                        <div className="message-custom-content message-info">
                            <i className="fa fa-info-circle fa-fw"></i>
                            <span> {content} </span>
                        </div>
                    </div>
                </div>
            </div>
        )
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
        messageInstance.notice({ content, show: true })
        setTimeout(() => {
            messageInstance.destroy();
        }, 3 * 1000);
    }
};