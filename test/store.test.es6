import assert from 'assert';

import _ from 'mori';

import atom from '../src/state/atom';
import Store from '../src/stores/store';
import Dispatcher from '../src/lib/dispatcher';

let initial = {

    items: _.sortedSet(

        _.hashMap('name', 'Item #1', 'selected', false),
        _.hashMap('name', 'Item #2', 'selected', false),
        _.hashMap('name', 'Item #3', 'selected', false),
        _.hashMap('name', 'Item #4', 'selected', false)
    )
};

let item = _.hashMap('name', 'Item #0', 'selected', false);

describe('Store', () => {

    beforeEach(() => atom.silentSwap(_.toClj(initial)));
    afterEach(() => atom.clearChangeListeners());

    describe('getItems()', () => {

        it('should get data from atom', () => {

            assert.deepEqual(Store.getItems(), _.toJs(initial.items));
        });
    });

    describe('updateItem(item, index)', () => {

        it('should update atom', done => {

            atom.addChangeListener(() => {

                assert.equal(_.toJs(_.first(atom.getIn(['items']))).name, _.toJs(item).name);
                done();
            });

            Dispatcher.dispatch('UPDATE_ITEM', item, 0);
        });
    });
});
