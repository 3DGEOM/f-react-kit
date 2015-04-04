let listeners = {};

function register (event, fn) {

    listeners[event] = listeners[event] || [];
    listeners[event].push(fn);
}

function remove (event, fn) {

    let handlers = listeners[event];

    handlers.splice(handlers.indexOf(fn), 1);
}

function dispatch (event, ...args) {

    let eventListeners = listeners[event];
    for (let i = eventListeners.length; i-- > 0; ) {

        eventListeners[i].apply(null, args);
    }
}

function getEventHandlers (event) {

    return listeners[event];
}

function clearEventHandlers (event) {

    event ?
        (listeners[event] = []) :
        (listeners = {});
}

export default {

    register,
    remove,
    dispatch,
    getEventHandlers,
    clearEventHandlers
};
