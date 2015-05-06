import React from 'react';

import atom from '../../state/atom';

import _ from 'mori';

let protonComponent = function (Component) {

    class ProtonComponent extends React.Component {

        static propTypes = {

            cursor: React.PropTypes.arrayOf(React.PropTypes.any)
        }

        /* Set initial proton state */
        componentWillMount() {

            this._protonState = atom.getIn(this.props.cursor);
        }

        /* Re-render component if proton state has been changed
           and update proton state
        */
        shouldComponentUpdate() {

            let currentProton = this._protonState,
                nextProton = atom.getIn(this.props.cursor);

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

            return <Component protonState={this.getProtonState()} {...this.props} />;
        }
    }

    return ProtonComponent;
};

export default protonComponent;
