import React from 'react';

import atom from '../../state/atom';

import _ from 'mori';

let nuclearComponent = function (Component) {

    class NuclearComponent extends React.Component {

        static propTypes = {

            cursors: React.PropTypes.objectOf(React.PropTypes.array)
        }

        _nuclearState = {}

        /* Set initial nuclear state */
        componentWillMount() {

            let cursors = this.props.cursors;

            /* Fill-in nuclear state with protons */
            Object.keys(cursors)
                .forEach(protonName => this._nuclearState[protonName] = atom.getIn(cursors[protonName]));
        }

        /* Re-render component if any of protons has been changed
           and update nuclear state
        */
        shouldComponentUpdate (nextProps) {

            /* Find changed protons */
            let nextProtons = Object.keys(nextProps.cursors)
                    .filter(this._isProtonChanged);

            if (nextProtons.length > 0) {

                nextProtons.forEach(nextProton => {

                    let nextProtonName = Object.keys(nextProton)[0];
                    this._nuclearState[nextProtonName] = nextProton[nextProtonName];
                });
                return true;
            }
            else {

                return false;
            }
        }

        /* Check if a single proton has been changed */
        _isProtonChanged (nextProtonName) {

            let currentProton = this._nuclearState[nextProtonName],
                nextProton = atom.getIn(this.props.cursors[nextProtonName]);

            if (_.equals(currentProton, nextProton)) {

                return false;
            }
            else {

                return { [nextProtonName]: nextProton };
            }
        }

        /* Get data as plain JS data structure */
        _getNuclearState() {

            return _.toJs(this._nuclearState);
        }

        render() {

            return <Component nuclearState={this._getNuclearState()} {...this.props} />;
        }
    }

    return NuclearComponent;
};

export default nuclearComponent;
