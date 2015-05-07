import React from 'react';

import atomComponent from './lib/components/atom-component';
import initialState from './state/initial';

import ToDoApp from './components/todo-app';

import ToDoItemsStore from './stores/todo-items-store';
import PersistenceStore from './stores/persistence-store';
import { dispatch } from './lib/dispatcher';
import { flip } from './lib/functions';

import page from 'page';
import _ from 'mori';

/* Route initialization helper */
let addRoute = _.partial(flip(page), _.comp(

    _.partial(dispatch, 'PAGE:SET_CURRENT_PAGE'),
    _.partial((prop, obj) => obj[prop], 'path')
));

/* Initialize router */
addRoute('/');
addRoute('/all');
addRoute('/active');
addRoute('/completed');
page({ hashbang: true });
page(ToDoItemsStore.getCurrentPage());

/* Persist initial state if there's no a stored one */
!PersistenceStore.loadState() && PersistenceStore.saveState(_.toClj(initialState));

/* Atomify root component with a state and persist the state on its change
   ignore 'newToDo' field
 */
let AtomicToDoApp = atomComponent(ToDoApp, PersistenceStore.loadState(),
        state => dispatch('STATE:SAVE', _.updateIn(state, ['newToDo'], () => '')));

React.render(<AtomicToDoApp />, document.body);
