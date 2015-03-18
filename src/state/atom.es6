import _ from 'mori';

let listeners = [],
    state;

function wrap (op, args) {

  return _[op].apply(_, [getState()].concat(args));
}

function addChangeListener (fn) {

    listeners.push(fn);
}

function emitChange() {

    for (let i = listeners.length; i-- > 0;) listeners[i]();
}

function silentSwap (nextState) {

    state = nextState;
}

function swap (nextState) {

    silentSwap(nextState);
    emitChange();
}

function getState() {

  return state;
}

function getIn (...args) {

    return wrap('getIn', args);
}

function assocIn (...args) {

    return swap(wrap('assocIn', args));
}

export default {

    addChangeListener,
    silentSwap,
    swap,
    getState,
    getIn,
    assocIn
};
