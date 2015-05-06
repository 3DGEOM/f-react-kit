import React from 'react';

import shallowEqual from '../shallow-equal';

let pureComponent = function (Component) {

    class PureComponent extends React.Component {

        /* Re-render component if props has been changed */
        shouldComponentUpdate (nextProps) {

            return !shallowEqual(this.props, nextProps);
        }

        render() {

            return <Component {...this.props} />;
        }
    }

    return PureComponent;
};

export default pureComponent;
