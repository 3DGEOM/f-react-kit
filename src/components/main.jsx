import React from 'react';

import ToDoList from './todo-list';

import ToDoItemsStore from '../stores/todo-items-store';
import Dispatcher from '../lib/dispatcher';

class Main extends React.Component {

    _onToggleAllChange (event) {

        Dispatcher.dispatch('TODOS:TOGGLE_ALL', event.target.checked);
    }

    render() {

        return (

            <section className='main'>

                <input className='toggle-all'
                       id='toggle-all'
                       type='checkbox'
                       checked={ToDoItemsStore.isAllCompleted()}
                       onChange={this._onToggleAllChange} />

                <label htmlFor="toggle-all">Mark all as complete</label>

                <ToDoList cursor={['currentPageToDoItems']} />
            </section>
        );
    }
}

export default Main;
