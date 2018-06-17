import { Component } from 'inferno';
import styles from './cssmodule.scss';
import { inject, observer } from 'inferno-mobx';

class Sidebar extends Component {
    openTalkingWindow(id) {
        const openTalkingAction = this.props.coreStore.openTalking(id);
        openTalkingAction();
    }
    render() {
        return (
            <ul className={styles.sidebarList}>
                <li className={styles.item} onClick={() => this.openTalkingWindow(1)}>
                    <div className={styles.avatar}>
                        <img className={styles.avatarImg} src="/static/avatar/0.jpg" alt="" />
                    </div>
                    <div className={styles.content}>
                        <div className={styles.contentHeader}>
                            <h3 className={styles.name}>冷夜流星</h3>
                            <span className={styles.time}>14:02</span>
                        </div>
                        <p className={styles.message}>你吃饭了没有？</p>
                    </div>
                </li>
            </ul>
        );

    }
}

export default inject(['coreStore'])(observer(Sidebar));