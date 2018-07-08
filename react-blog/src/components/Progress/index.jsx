import React, { Component } from 'react';

export default class Progress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 0,
            show: false,
            canSuccess: true,
            height: '2px',
            color: '#2299dd',
            failedColor: '#ff0000'
        };
    }

    render() {
        const { percent, show } = this.props;
        return (
            <div className="Progress" style={{
                width: percent + '%',
                height: this.state.height,
                backgroundColor: this.state.canSuccess ? this.state.color : this.state.failedColor,
                opacity: show ? 1 : 0
            }}></div>
        );
    }
}
