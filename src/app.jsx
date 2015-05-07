import React from 'react';

import atomComponent from './lib/components/atom-component';
import initialState from './state/initial';

import ToDoApp from './components/todo-app';

import ToDoItemsStore from './stores/todo-items-store';
import { dispatch } from './lib/dispatcher';
import { flip } from './lib/functions';

import page from 'page';
import _ from 'mori';
import mt from 'mori-transit';

let addRoute = _.partial(flip(page), _.comp(

    _.partial(dispatch, 'PAGE:SET_CURRENT_PAGE'),
    _.partial((prop, obj) => obj[prop], 'path')
));

function getInitialState() {

    let localState = localStorage.getItem('todo-state');
    return localState ? mt.decode(localState) : _.toClj(initialState);
}

addRoute('/');
addRoute('/all');
addRoute('/active');
addRoute('/completed');
page(ToDoItemsStore.getCurrentPage());

let AtomicToDoApp = atomComponent(ToDoApp, getInitialState(),
        state => localStorage.setItem('todo-state', mt.encode(state)));

React.render(<AtomicToDoApp />, document.body);
