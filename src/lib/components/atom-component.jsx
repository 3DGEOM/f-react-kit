import React from 'react';

import atom from '../../state/atom';

import _ from 'mori';

let atomComponent = function (Component, initialState) {

    class Root extends React.Component {

        constructor (props) {

            super(props);

            /* Bootsrap applicaion state */
            atom.silentSwap(_.toClj(initialState));
        }

        componentWillMount() {

            /* Re-render application on atom state change */
            atom.addChangeListener(() => this.forceUpdate());
        }

        render() {

            return <Component {...this.props} />;
        }
    }

    return Root;
};

export default atomComponent;
