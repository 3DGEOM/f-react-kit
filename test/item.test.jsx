import jsdom from 'mocha-jsdom';
import assert from 'assert';

import React from 'react/addons';
import _ from 'mori';

import Item from '../src/components/item';
import Store from '../src/stores/store';
import atom from '../src/state/atom';

let TestUtils = React.addons.TestUtils;

let item, li;

let initial = {

    items: _.sortedSet(

        _.hashMap('name', 'Item #1', 'selected', false)
    )
};

function renderItem() {

    item = TestUtils.renderIntoDocument(

        <Item item={Store.getItems()[0]} index={0} />
    );

    li = TestUtils.findRenderedDOMComponentWithTag(item, 'li');
}

describe('Item', () => {

    jsdom();

    beforeEach(() => {

        atom.silentSwap(_.toClj(initial));
        atom.addChangeListener(() => renderItem());

        renderItem();
    });

    afterEach(() => atom.clearChangeListeners());

    it('should render with item data', () => {

        assert.equal(li.getDOMNode().textContent, 'Item #1');
    });

    it('should change selected state', () => {

        TestUtils.Simulate.click(li);

        assert.ok(li.getDOMNode().textContent.includes('✔'));
    });
});
