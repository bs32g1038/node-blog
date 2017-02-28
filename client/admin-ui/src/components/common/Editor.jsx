import React, { Component } from 'react';
import { ReactMde, ReactMdeCommands } from 'react-mde';

export default class Editor extends Component {

    state = {
        mdeValue: { text: this.props.value, selection: null },
        value: this.props.value
    }

    onChange(mdeValue) {
        this.setState({ mdeValue: mdeValue });
        console.log(mdeValue.text)
        this.props.onChange(mdeValue.text)
    }

    componentWillReceiveProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState({ mdeValue: { text: value } });
        }
    }

    render() {
        console.log(this.props)

        // get the default commands, you can pick individual commands if you like, or add your own
        let commands = ReactMdeCommands.getDefaultCommands()
        return (
            <div className="container" style={{ border: '1px solid #ccc', padding: '5px', fontSize: '14px' }}>
                <ReactMde
                    textareaId="ta1"
                    textareaName="ta1"
                    value={this.state.mdeValue}
                    onChange={this.onChange.bind(this)}
                    commands={commands} />
            </div>
        );
    }
}