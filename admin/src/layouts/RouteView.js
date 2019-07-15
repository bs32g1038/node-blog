import React from 'react';
import { renderRoutes } from 'react-router-config';

class RouterView extends React.Component {
    render() {
        const {
            route: { routes },
        } = this.props;

        return renderRoutes(routes);
    }
}

export default RouterView;
