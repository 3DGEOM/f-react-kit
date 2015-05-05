import React from 'react';

import atom from '../state/atom';

import _ from 'mori';

let protonComponent = function (Component, cursorName, cursorPath) {

    class ProtonComponent extends React.Component {

        /* Set initial proton state */
        componentWillMount() {

            this._protonState = atom.getIn(cursorPath);
        }

        /* Re-render component if proton state has been changed
           and update proton state
        */
        shouldComponentUpdate() {

            let currentProton = this._protonState,
                nextProton = atom.getIn(cursorPath);

            if (_.equals(currentProton, nextProton)) {

                return false;
            }
            else {

                this._protonState = nextProton;
                return true;
            }
        }

        /* Get data as plain JS data structure */
        getProtonState() {

            return _.toJs(this._protonState);
        }

        render() {

            let protonState = { [cursorName]: this.getProtonState() };
            return <Component protonState={protonState} {...this.props} />;
        }
    }

    return ProtonComponent;
};

export default protonComponent;
