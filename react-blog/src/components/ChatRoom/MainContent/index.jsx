import { Component } from 'inferno';
import { inject, observer } from 'inferno-mobx';
import styles from './cssmodule.scss';
import socket from '../socket';

class MainContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
    }

    getEditorContent() {
        const content = document.getElementById('content').innerHTML;
        return content;
    }

    sendMessage() {
        const content = this.getEditorContent();
        const account = this.props.coreStore.user.account;
        socket.emit('sendMessage', {
            account,
            content,
        }, (res) => {
            console.log(res);
        });
    }

    componentDidMount() {
        socket.on('receiveMessage', (data) => {
            this.state.messages.push(
                <li className={styles.item}>
                    <div className={styles.avatar}>
                        <img className={styles.avatarImg} src="/static/avatar/0.jpg" alt="" />
                    </div>
                    <div className={styles.content}>
                        <div className={styles.contentHeader}>
                            <h3 className={styles.name}>{data.nickName}</h3>
                            <span className={styles.time}>{data.createdAt}</span>
                        </div>
                        <p className={styles.message}>{data.content}</p>
                    </div>
                </li>
            );
            this.setState({
                messages: this.state.messages
            });
        });
    }

    render() {
        const { curTalkingUser } = this.props.coreStore;
        return (
            <div className={styles.main}>
                <header className={styles.mainHeader}>
                    你正在和{curTalkingUser.account}聊天
                </header>
                <ul className={styles.mainContent}>
                    {this.state.messages}
                </ul>
                <footer className={styles.mainFooter}>
                    <div className={styles.messageSendArea}>
                        <a href="javascript:;" className={styles.emojibtn}><i className="fa fa-smile-o"></i></a>
                        <div id="content" contentEditable="true" className={styles.messageInput}></div>
                        <button onClick={() => this.sendMessage()} className={styles.emojibtn}><i className="fa fa-send"></i></button>
                    </div>
                </footer>
            </div>
        );

    }
}

export default inject(['coreStore'])(observer(MainContent));