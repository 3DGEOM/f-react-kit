import atom from '../state/atom';

import { register } from '../lib/dispatcher';

import { cursorTo, not, tail, trim, toClj } from '../lib/functions';

import _ from 'mori';

let cursor = {

    newToDo: ['newToDo'],
    toDoItems: ['toDoItems'],
    currentPage: ['currentPage'],
    currentPageToDoItems: ['currentPageToDoItems']
};

let isCompleted = _.curry(_.getIn, ['completed']);
let getItems = _.partial(atom.getIn, cursor.toDoItems);
let setItems = _.partial(atom.assocIn, cursor.toDoItems);
let getCurrentPageItems = _.partial(atom.getIn, cursor.currentPageToDoItems);
let setCurrentPageItems = _.partial(atom.assocIn, cursor.currentPageToDoItems);
let removeCompleted = _.comp(setItems, getUncompleted);
let showToDoEditor = _.comp(setEditingText, _.partial(setEditingStatus, true));
let hideToDoEditor = _.partial(setEditingStatus, false);
let cursorToNextTitle = _.partial(cursorTo, 'nextTitle');
let cursorToEditing = _.partial(cursorTo, 'editing');
let cursorToTitle = _.partial(cursorTo, 'title');
let cursorToCompleted = _.partial(cursorTo, 'completed');
let cursorIntoAllItems = _.comp(cursor.toDoItems.concat.bind(cursor.toDoItems), tail);
let getNextTitle = _.comp(atom.getIn, cursorToNextTitle);
let getTrimmedNextTitle = _.comp(trim, getNextTitle);
let getTitle = _.comp(atom.getIn, cursorToTitle);

function toggleAll (value) {

    setItems(toClj(_.map(item => _.assocIn(item, ['completed'], value),
        getItems())));
}

function completeToDo (toDoCursor, value) {

    atom.assocIn(cursorToCompleted(cursorIntoAllItems(toDoCursor)), value);
}

function getCompleted() {

    return toClj(_.filter(isCompleted, getItems()));
}

function getUncompleted() {

    return toClj(_.filter(_.comp(not, isCompleted), getItems()));
}

function setEditingStatus (value, toDoCursor) {

    toDoCursor = cursorIntoAllItems(toDoCursor);
    atom.assocIn(cursorToEditing(toDoCursor), value);
    return toDoCursor;
}

function setEditingText (toDoCursor) {

    atom.assocIn(cursorToNextTitle(toDoCursor), getTitle(toDoCursor));
}

function updateNextTitle (toDoCursor, value) {

    atom.assocIn(cursorToNextTitle(cursorIntoAllItems(toDoCursor)), value);
}

function updateTitle (toDoCursor) {

    toDoCursor = cursorIntoAllItems(toDoCursor);
    atom.assocIn(cursorToTitle(toDoCursor), getTrimmedNextTitle(toDoCursor));
}

function undoNextTitle (toDoCursor) {

    toDoCursor = cursorIntoAllItems(toDoCursor);
    atom.assocIn(cursorToNextTitle(toDoCursor), getTitle(toDoCursor));
}

function removeToDo (toDoCursor) {

    let itemToRemove = atom.getIn(toDoCursor);

    setItems(toClj(_.filter(item => not(_.equals(itemToRemove, item)),
        getItems())));
}

function updateInput (value) {

    atom.assocIn(cursor.newToDo, value);
}

function createToDo (title) {

    atom.updateIn(cursor.toDoItems, toDoItems => {

        return _.conj(toDoItems, _.toClj({

            completed: false,
            editing: false,
            nextTitle: title,
            title
        }));
    });
}

function getCurrentPage() {

    return atom.getIn(cursor.currentPage);
}

function setCurrentPage (path) {

    atom.assocIn(cursor.currentPage, path);
}

function getItemsByPage (path) {

    return (

        {
            '/': getItems,
            '/all': getItems,
            '/active': getUncompleted,
            '/completed': getCompleted
        }

    )[path]();
}

function updateCurrentPage (action) {

    return function (...args) {

        action.apply(null, args);
        setCurrentPageItems(getItemsByPage(getCurrentPage()));
    };
}

register('TODOS:UPDATE_INPUT', updateInput);
register('TODOS:CREATE', updateCurrentPage(createToDo));
register('TODOS:TOGGLE_ALL', updateCurrentPage(toggleAll));
register('TODOS:COMPLETE_TODO', updateCurrentPage(completeToDo));
register('TODOS:REMOVE_COMPLETED', updateCurrentPage(removeCompleted));
register('TODOS:SHOW_TODO_EDITOR', updateCurrentPage(showToDoEditor));
register('TODOS:HIDE_TODO_EDITOR', updateCurrentPage(hideToDoEditor));
register('TODOS:UPDATE_NEXT_TITLE', updateCurrentPage(updateNextTitle));
register('TODOS:UPDATE_TITLE', updateCurrentPage(updateTitle));
register('TODOS:UNDO_NEXT_TITLE', updateCurrentPage(undoNextTitle));
register('TODOS:REMOVE_TODO', updateCurrentPage(removeToDo));

register('PAGE:SET_CURRENT_PAGE', updateCurrentPage(setCurrentPage));

export default {

    getAllItems: _.comp(_.toJs, getItems),
    getPageItems: _.comp(_.toJs, getCurrentPageItems),
    countUncompleted: _.comp(_.count, getUncompleted),
    isAllCompleted() { return _.every(isCompleted, getItems()); },
    isAnyCompleted() { return _.some(isCompleted, getItems()); },
    getCurrentPage
};
