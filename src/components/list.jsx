import React from 'react';

import protonComponent from '../lib/proton-component';
import Store from '../stores/store';

import Item from './item';

import r from 'ramda';

class List extends React.Component {

    static propTypes = {

        protonState: React.PropTypes.object
    }

    render() {

        let items = this.props.protonState.items;

        let list = r.mapIndexed((item, index) => {

            return (

                <Item key={index}
                      index={index}
                      item={item} />
            );

        }, items);

        return <ul>{list}</ul>;
    }
}

export default protonComponent(List, 'items', ['items']);
