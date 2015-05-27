import React from 'react';

import atom from '../../state/atom';

import _ from 'mori';

let protonComponent = function (Component) {

    class ProtonComponent extends React.Component {

        static propTypes = {

            cursor: React.PropTypes.arrayOf(React.PropTypes.any)
        }

        componentWillMount() {

            this._protonState = atom.getIn(this.props.cursor);
        }

        shouldComponentUpdate (nextProps) {

            let nextProtonState = atom.getIn(nextProps.cursor);

            if (_.equals(this._protonState, nextProtonState)) {

                return false;
            }
            else {

                this._protonState = nextProtonState;
                return true;
            }
        }

        _getProtonState() {

            return _.toJs(this._protonState);
        }

        render() {

            return <Component protonState={this._getProtonState()} {...this.props} />;
        }
    }

    return ProtonComponent;
};

export default protonComponent;
