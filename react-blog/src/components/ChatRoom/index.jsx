import React, { Component } from 'react';
import axios from '../../utils/axios';
import { parseTime } from '../../utils/time';
// import TopBar from './TopBar';
// import MessageSideBar from './MessageSideBar';
// import MainContent from './MainContent';
import Login from './Login';
import socket from './socket.js';
import styles from './cssmodule.scss';
import './style.scss';

class ChatRoom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            roomList: [],
            user: null
        };
    }

    getEditorContent() {
        const content = document.getElementById('content').value;
        return content;
    }

    sendMessage() {
        const content = this.getEditorContent();
        socket.emit('sendMessage', {
            user: this.state.user,
            content
        }, (res) => {
            console.log(res);
        });
    }

    getLoginUserData(user) {
        this.setState({
            user
        });
    }

    componentDidMount() {
        axios.get('/chatroom/groups').then((res) => {
            this.setState({
                roomList: res.data
            });
        });
        socket.on('receiveMessage', (data) => {
            this.state.messages.push(
                <li className={styles.item}>
                    <div className={styles.avatar}>
                        <img className={styles.avatarImg} src={data.user.avatar} alt="" />
                    </div>
                    <div className={styles.content}>
                        <div className={styles.contentHeader}>
                            <h3 className={styles.name}>{data.user.nickName}</h3>
                            <span className={styles.time}>{parseTime(new Date())}</span>
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
        return (
            <div className={styles.main}>
                <div className={styles.room}>
                    <div className="ChatRoom-wrap">
                        <Login getLoginUserData={(user) => this.getLoginUserData(user)} />
                        <div className={styles.toolBar}>
                            <div className={styles.decroation}>
                                <i className="fa fa-qq fa-fw"></i>
                                ChatRoom
                            </div>
                            <div className={styles.loginAvatar}>
                                {
                                    this.state.user &&
                                    <img className={styles.loginAvatarImg} src={this.state.user.avatar} alt="" />
                                }
                                {this.state.user && this.state.user.account}
                            </div>
                            <div className={styles.toolBarBtn}>
                                <i className="fa fa-question-circle"></i>
                            </div>
                            <div className={styles.toolBarBtn}>
                                <i className="fa fa-power-off"></i>
                            </div>
                        </div>
                        <div className="ChatRoom-content-wrap">
                            <div style={{ width: '100%' }}>
                                <ul className={styles.mainContent}>
                                    {this.state.messages}
                                </ul>
                                <footer className={styles.mainFooter}>
                                    <div className={styles.messageSendArea}>
                                        <a href="javascript:;" className={styles.emojibtn}><i className="fa fa-smile-o"></i></a>
                                        <textarea id="content" className={styles.messageInput} />
                                        <button type="button" onClick={() => this.sendMessage()} className={styles.sendBtn}>
                                            <i className="fa fa-send fa-fw"></i>发送
                                        </button>
                                    </div>
                                </footer>
                            </div>
                            <div className="ChatRoom-content-right">
                                <div className="ChatRoom-room-name"> <i className="fa fa-institution fa-fw"></i> 房间</div>
                                <ul className="ChatRoom-room-list">
                                    {
                                        this.state.roomList.map((item) => (
                                            <li className="ChatRoom-room-item" key={item._id}>
                                                <div className="ChatRoom-room-avatar">
                                                    <img className="ChatRoom-room-avatarImg" src={item.avatar} alt="" />
                                                </div>
                                                <div className="ChatRoom-room-info">
                                                    <h3 className="ChatRoom-room-title">{item.name}</h3>
                                                    <div className="ChatRoom-room-description">{item.description}</div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="ChatRoom-footer">
                            当前在线总人数：20
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatRoom;
