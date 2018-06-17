import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DocumentTitle extends Component {
    setTitle() {
        document.title = this.props.title
            ? this.props.title + ' | ' + this.context.siteInfo.name
            : this.context.siteInfo.name;
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

DocumentTitle.contextTypes = {
    siteInfo: PropTypes.shape({
        name: PropTypes.string,
        icp: PropTypes.string,
        github: PropTypes.string
    })
};