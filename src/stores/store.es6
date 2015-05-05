import atom from '../state/atom';

import Dispatcher from '../lib/dispatcher';

import _ from 'mori';

let cursor = {

    items: ['items']
};

function getItems() {

    return _.toJs(atom.getIn(cursor.items));
}

function toggleSelect (index, selected) {

    atom.assocIn(cursor.items.concat([index, 'selected']), !selected);
}

Dispatcher.register('ITEM:TOGGLE_SELECT', toggleSelect);

export default {

    getItems
};
