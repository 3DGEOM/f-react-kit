import React from 'react';

import atom from './state/atom';
import initial from './state/initial';

import Store from './stores/store';

import Item from './components/item';

import _ from 'mori';
import r from 'ramda';

class App extends React.Component {

    constructor() {

        atom.silentSwap(_.toClj(initial));
        this.state = { atom: atom.getState() };
    }

    componentWillMount() {

        atom.addChangeListener(() => this.setState({ atom: atom.getState() }));
    }

    render() {

        let list = r.mapIndexed((item, index) => {

            return <Item key={index}
                         index={index}
                         item={item} />

        }, Store.getItems());

        return (

            <ul>{list}</ul>
        );
    }
}

React.render(<App />, document.body);
