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

let saveState = _.partial(dispatch, 'STATE:SAVE');

let addRoute = _.partial(flip(page), _.comp(

    _.partial(dispatch, 'PAGE:SET_CURRENT_PAGE'),
    _.partial((prop, obj) => obj[prop], 'path')
));

addRoute('/');
addRoute('/all');
addRoute('/active');
addRoute('/completed');
page({ hashbang: true });
page(ToDoItemsStore.getCurrentPage());


!PersistenceStore.loadState() && saveState(_.toClj(initialState));

let AtomicToDoApp = atomComponent(ToDoApp, PersistenceStore.loadState(), saveState);

React.render(<AtomicToDoApp />, document.body);
