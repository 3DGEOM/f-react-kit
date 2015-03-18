let listeners = {};

function register (event, fn) {

    listeners[event] = listeners[event] || [];
    listeners[event].push(fn);
}

function dispatch (event, ...args) {

    let eventListeners = listeners[event];
    for (let i = eventListeners.length; i-- > 0;) eventListeners[i].apply(null, args);
}

export default {

    register,
    dispatch
};
