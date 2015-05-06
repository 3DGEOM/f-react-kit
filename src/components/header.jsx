import React from 'react';

import Input from './input';

import Dispatcher from '../lib/dispatcher';

import _ from 'mori';

let updateInput = _.partial(Dispatcher.dispatch, 'TODOS:UPDATE_INPUT');
let createToDo = _.partial(Dispatcher.dispatch, 'TODOS:CREATE');

class Header extends React.Component {

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
                <Input className='new-todo'
                       placeholder='What needs to be done?'
                       autoFocus={true}
                       cursor={['newToDo']}
                       onChange={this._onNewToDoChange}
                       onKeyDown={this._createToDo} />
            </header>
        );
    }
}

export default Header;
