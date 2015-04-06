import assert from 'assert';

import _ from 'mori';

import atom from '../src/state/atom';

let initial = {

    items: _.sortedSet(

        _.hashMap('name', 'Item #1', 'selected', false),
        _.hashMap('name', 'Item #2', 'selected', false),
        _.hashMap('name', 'Item #3', 'selected', false),
        _.hashMap('name', 'Item #4', 'selected', false)
    )
};

let cursor = {

    items: ['items'],
    data: ['data']
};

let noop = () => null,
    noop1 = () => null;

describe('Atom', () => {

    let state;

    beforeEach(() => state = _.toClj(initial));
    afterEach(() => atom.clearChangeListeners());

    describe('addChangeListener(fn)', () => {

        it('should add change listener', () => {

            atom.addChangeListener(noop);

            assert.notEqual(atom.getChangeListeners().indexOf(noop), -1);
        });
    });

    describe('removeChangeListener(fn)', () => {

        it('should remove change listener', () => {

            atom.addChangeListener(noop);
            atom.removeChangeListener(noop);

            assert.equal(atom.getChangeListeners().indexOf(noop), -1);
        });
    });

    describe('getChangeListeners()', () => {

        it('should get change listeners', () => {

            atom.addChangeListener(noop);
            atom.addChangeListener(noop1);

            assert.equal(atom.getChangeListeners().length, 2);
            assert.equal(atom.getChangeListeners().indexOf(noop), 0);
            assert.equal(atom.getChangeListeners().indexOf(noop1), 1);
        });
    });

    describe('clearChangeListeners()', () => {

        it('should clear change listeners', () => {

            atom.addChangeListener(noop);
            atom.addChangeListener(noop1);
            atom.clearChangeListeners();

            assert.equal(atom.getChangeListeners().length, 0);
        });
    });

    describe('silentSwap(nextState)', () => {

        it('should swap state', () => {

            atom.silentSwap(state);
            assert.ok(_.equals(state, atom.getState()));
        });

        it('should swap state silently', () => {

            atom.addChangeListener(() => { throw new Error('Should not notify!'); });
            atom.silentSwap(state);
        });
    });

    describe('swap(nextState)', () => {

        it('should swap state', () => {

            atom.swap(state);

            assert.ok(_.equals(state, atom.getState()));
        });

        it('should notify on swap', () => {

            atom.addChangeListener(() => assert.ok(true));
            atom.swap(state);

            assert.ok(_.equals(state, atom.getState()));
        });
    });

    describe('getState()', () => {

        it('should get state', () => {

            atom.swap(state);

            assert.ok(_.equals(state, atom.getState()));
        });
    });

    describe('getIn(cursor)', () => {

        it('should get data', () => {

            assert.ok(_.equals(initial.items, atom.getIn(cursor.items)));
        });
    });

    describe('assocIn(cursor, data)', () => {

        it('should put data', () => {

            let data = {};

            atom.assocIn(cursor.data, data);

            assert.equal(atom.getIn(cursor.data), data);
        });
    });
});
