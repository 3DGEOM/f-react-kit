import assert from 'assert';

import _ from 'mori';

import Dispatcher from '../src/lib/dispatcher';
import atom from '../src/state/atom';

let initial = {

    items: _.sortedSet(

        _.hashMap('name', 'Item #1', 'selected', false),
        _.hashMap('name', 'Item #2', 'selected', false),
        _.hashMap('name', 'Item #3', 'selected', false),
        _.hashMap('name', 'Item #4', 'selected', false)
    )
};

let state = _.toClj(initial),
    newState = _.hashMap('name', 'Item #1', 'selected', false);

describe('Flux', () => {

    describe('Data flow', () => {

        afterEach(() => atom.clearChangeListeners());

        it('atom should update', done => {

            atom.silentSwap(state);
            atom.addChangeListener(() => {

                assert.ok(_.equals(atom.getState(), newState));
                done();
            });

            Dispatcher.register('UPDATE', payload => atom.swap(payload));
            Dispatcher.dispatch('UPDATE', newState);
        });
    });
});
