import React from 'react';

import atomComponent from './lib/atom-component';
import initialState from './state/initial';

import List from './components/list';

class App extends React.Component {

    render() {

        return <List />;
    }
}

let RootApp = atomComponent(App, initialState);

React.render(<RootApp />, document.body);
