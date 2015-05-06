import _ from 'mori';

let toClj = _.comp(_.toClj, _.intoArray);

function selectTruthy (props, opts) {

    return props.filter(prop => opts[prop]);
}

function flip (fn) {

    return function (second, first, ...rest) {

        return fn.apply(fn, [first, second, ...rest]);
    };
}

function not (value) {

    return !value;
}

function pluralize (word, count) {

    return count === 0 || count > 1 ? word + 's' : word;
}

function trim (value) {

    return typeof value === 'string' ? value.trim() : value;
}

function cursorTo (to, cursor) {

    return cursor.concat(to);
}

function tail (arr) {

    return arr[arr.length - 1];
}

export default {

    cursorTo,
    flip,
    not,
    pluralize,
    selectTruthy,
    tail,
    toClj,
    trim
};
