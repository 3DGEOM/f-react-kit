import atom from '../state/atom';

import Dispatcher from '../lib/dispatcher';

import _ from 'mori';

let cursor = {

    items: ['items']
};

function getItems() {

    return _.toJs(atom.getIn(cursor.items));
}

function updateItem (item, index) {

  let items = getItems();
  items[index] = item;
  atom.assocIn(cursor.items, items);
}

Dispatcher.register('UPDATE_ITEM', updateItem);

export default {

  getItems
};
