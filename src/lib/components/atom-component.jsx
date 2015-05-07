import React from 'react';

import atom from '../../state/atom';

let atomComponent = function (Component, initialState, updateCallback) {

    class Root extends React.Component {

        constructor (props) {

            super(props);

            /* Bootsrap applicaion state */
            atom.silentSwap(initialState);
        }

        componentWillMount() {

            /* Re-render application on atom state change
               and fire a callback with reference to the atom state
            */
            atom.addChangeListener(() => {

                updateCallback(atom.getState());
                this.forceUpdate();
            });
        }

        render() {

            return <Component {...this.props} />;
        }
    }

    return Root;
};

export default atomComponent;
