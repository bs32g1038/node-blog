import { Component } from 'inferno';
import { inject, observer } from 'inferno-mobx';
import classNames from 'classnames';

import styles from './cssmodule.scss';

class Topbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            typeWindow: {
                MESSAGEWINDOW: 'MESSAGEWINDOW',
                FRIENDSWINDOW: 'FRIENDSWINDOW'
            },
            curTypeWindow: 'FRIENDSWINDOW'
        };
    }

    ShowMessageWindow() {
        this.props.coreStore.setMessageWindow();
        this.setState({
            curTypeWindow: this.state.typeWindow.MESSAGEWINDOW
        });
    }

    ShowFriendsWindow() {
        this.props.coreStore.setFriendsWindow();
        this.setState({
            curTypeWindow: this.state.typeWindow.FRIENDSWINDOW
        });
    }

    isCurMessageWindow() {
        return this.state.curTypeWindow == this.state.typeWindow.MESSAGEWINDOW;
    }

    isCurFriendsWindow() {
        return this.state.curTypeWindow == this.state.typeWindow.FRIENDSWINDOW;
    }

    render() {
        return (
            <div className={styles.TopSidebar}>
                <div className={styles.avatar}>
                    <img className={styles.avatarImg} src="/static/avatar/0.jpg" />
                </div>
                <div className={styles.mainBtn}>
                    <button
                        type="button"
                        className={classNames(styles.btn, this.isCurMessageWindow() && styles.btnActive)}
                        onClick={() => this.ShowMessageWindow()}>
                        <i className="fa fa-comments"></i>
                    </button>
                    <button
                        type="button"
                        className={classNames(styles.btn, this.isCurFriendsWindow() && styles.btnActive)}
                        onClick={() => this.ShowFriendsWindow()}>
                        <i className="fa fa-users"></i>
                    </button>
                </div>
                <div className={styles.toolBtn}>
                    <a href="https://github.com/bs32g1038/node-blog" target="_black" rel="noopener noreferrer">
                        <i className="fa fa-github"></i>
                    </a>
                    <a href="http://www.lizc.me" target="_black" rel="noopener noreferrer">
                        <i className="fa fa-exclamation-circle"></i>
                    </a>
                    <a href="http://www.lizc.me" target="_black" rel="noopener noreferrer">
                        <i className="fa fa-cog"></i>
                    </a>
                    <a href="http://www.lizc.me" target="_black" rel="noopener noreferrer">
                        <i className="fa fa-power-off"></i>
                    </a>
                </div>
            </div>
        );

    }
}

export default inject(['coreStore'])(observer(Topbar));