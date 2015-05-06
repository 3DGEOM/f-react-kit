import React from 'react';

import protonComponent from '../lib/components/proton-component';

import Dispatcher from '../lib/dispatcher';

import _ from 'mori';

let updateInput = _.partial(Dispatcher.dispatch, 'TODOS:UPDATE_INPUT');
let createToDo = _.partial(Dispatcher.dispatch, 'TODOS:CREATE');

class Header extends React.Component {

    static propTypes = {

        protonState: React.PropTypes.string
    }

    _onNewToDoChange (event) {

        updateInput(event.target.value);
    }

    _createToDo (event) {

        let value = event.target.value;

        event.keyCode === 13 &&
            value && (value = value.trim()) &&
                (createToDo(value),
                 updateInput(''));
    }

    render() {

        return (

            <header className='header'>
                <h1>todos</h1>
                <input className='new-todo'
                       placeholder='What needs to be done?'
                       value={this.props.protonState}
                       autoFocus={true}
                       onChange={this._onNewToDoChange}
                       onKeyDown={this._createToDo} />
            </header>
        );
    }
}

export default protonComponent(Header);
