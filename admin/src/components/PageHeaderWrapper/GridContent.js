import React, { PureComponent } from 'react';
import style from './index.module.scss';

class GridContent extends PureComponent {
    render() {
        const { children } = this.props;
        return <div className={style.gridContent}>{children}</div>;
    }
}

export default GridContent;
