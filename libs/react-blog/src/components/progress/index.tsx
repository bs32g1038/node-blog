import styled from '@emotion/styled';
import React, { Component } from 'react';

const ProgressDiv = styled.div(() => ({
    backgroundColor: '#2299dd',
    height: '2px',
    left: '0px',
    opacity: 1,
    position: 'fixed',
    right: '0px',
    top: '0px',
    transition: 'width 0.2s, opacity 0.4s',
    width: '0%',
    zIndex: 999999
}));

export default class Progress extends Component<any, any> {
    constructor(props: any) {
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

    public render() {
        const { percent, show } = this.props;
        return (
            <ProgressDiv
                style={{
                    width: percent + '%',
                    height: this.state.height,
                    backgroundColor: this.state.canSuccess ? this.state.color : this.state.failedColor,
                    opacity: show ? 1 : 0
                }}
            >
            </ProgressDiv>
        );
    }
}
