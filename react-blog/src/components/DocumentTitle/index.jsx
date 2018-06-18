import React, { Component } from 'react';
import config from '../../config';
export default class DocumentTitle extends Component {
    setTitle() {
        document.title = this.props.title
            ? this.props.title + ' | ' + config.siteInfo.name
            : config.siteInfo.name;
    }
    componentDidMount() {
        this.setTitle();
    }
    componentDidUpdate() {
        this.setTitle();
    }
    render() {
        return this.props.children;
    }
}