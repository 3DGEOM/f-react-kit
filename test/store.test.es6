import assert from 'assert';

import _ from 'mori';

import atom from '../src/state/atom';
import Store from '../src/stores/store';

let initial = {

    items: _.sortedSet(

        _.hashMap('name', 'Item #1', 'selected', false),
        _.hashMap('name', 'Item #2', 'selected', false),
        _.hashMap('name', 'Item #3', 'selected', false),
        _.hashMap('name', 'Item #4', 'selected', false)
    )
};

describe('Store', () => {

    beforeEach(() => atom.silentSwap(_.toClj(initial)));

    describe('getItems()', () => {

        it('should get data from atom', () => {

            assert.deepEqual(Store.getItems(), _.toJs(initial.items));
        });
    });
});
