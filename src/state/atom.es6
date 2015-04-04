import _ from 'mori';

let listeners = [],
    state;

function getState() {

  return state;
}

function wrap (op, args) {

  return _[op].apply(_, [getState()].concat(args));
}

function addChangeListener (fn) {

    listeners.push(fn);
}

function removeChangeListener (fn) {

    listeners.splice(listeners.indexOf(fn), 1);
}

function getChangeListeners() {

    return listeners;
}

function clearChangeListeners() {

    listeners = [];
}

function emitChange() {

    for (let i = listeners.length; i-- > 0; ) {

        listeners[i]();
    }
}

function silentSwap (nextState) {

    state = nextState;
}

function swap (nextState) {

    silentSwap(nextState);
    emitChange();
}

function getIn (...args) {

    return wrap('getIn', args);
}

function assocIn (...args) {

    return swap(wrap('assocIn', args));
}

export default {

    addChangeListener,
    removeChangeListener,
    getChangeListeners,
    clearChangeListeners,
    silentSwap,
    swap,
    getState,
    getIn,
    assocIn
};
