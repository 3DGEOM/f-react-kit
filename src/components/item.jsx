import React from 'react';

import Dispatcher from '../lib/dispatcher';

function toggleSelect (index, selected) {

    Dispatcher.dispatch('ITEM:TOGGLE_SELECT', index, selected);
}

class Item extends React.Component {

    static propTypes = {

        item: React.PropTypes.object,
        index: React.PropTypes.number
    }

    render() {

        let item = this.props.item,
            index = this.props.index;

        return (

            <li onClick={toggleSelect.bind(null, index, item.selected)}>

                {item.name}
                {item.selected ? '✔' : null}

            </li>
        );
    }
}

export default Item;
