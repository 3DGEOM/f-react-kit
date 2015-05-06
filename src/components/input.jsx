import React from 'react';

import protonComponent from '../lib/components/proton-component';

class Input extends React.Component {

    static propTypes = {

        protonState: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.bool
        ]),
        type: React.PropTypes.string,
        value: React.PropTypes.string,
        checked: React.PropTypes.bool
    }

    render() {

        let status = {};

        switch (this.props.type) {

            case 'checkbox':
                status.checked = this.props.protonState;
                break;

            default:
                status.value = this.props.protonState;
        }

        return <input {...this.props} {...status} />;
    }
}

export default protonComponent(Input);
