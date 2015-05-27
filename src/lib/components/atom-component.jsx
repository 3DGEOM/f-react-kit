import React from 'react';

import atom from '../../state/atom';

let atomComponent = function (Component, initialState, updateCallback) {

    class Root extends React.Component {

        constructor (props) {

            super(props);
            atom.silentSwap(initialState);
        }

        componentWillMount() {

            atom.addChangeListener(() => {

                this.forceUpdate();
                updateCallback(atom.getState());
            });
        }

        render() {

            return <Component {...this.props} />;
        }
    }

    return Root;
};

export default atomComponent;
