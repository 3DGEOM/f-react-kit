import React from 'react';

import Dispatcher from '../lib/dispatcher';

function toggleSelect (item, index) {

  item.selected = !item.selected;
  Dispatcher.dispatch('UPDATE_ITEM', item, index);
}

class Item extends React.Component {

    render() {

        let item = this.props.item;

        return (

            <li onClick={toggleSelect.bind(null, item, this.props.index)}>

                {item.name}
                {item.selected ? '✔' : null}

            </li>
        );
    }
}

export default Item;
