import assert from 'assert';

import dispatcher from '../src/lib/dispatcher';

let noop = () => null,
    noop1 = () => null,
    eventName = 'TEST',
    payload = {};

describe('Dispatcher', () => {

    afterEach(() => dispatcher.clearEventHandlers());

    describe('register(event, fn)', () => {

        it('should register event handler', () => {

            dispatcher.register(eventName, noop);

            assert.equal(noop, dispatcher.getEventHandlers(eventName)[0]);
        });
    });

    describe('remove(event, fn)', () => {

        it('should remove event handler', () => {

            dispatcher.register(eventName, noop);
            dispatcher.remove(eventName, noop);

            assert.equal(dispatcher.getEventHandlers(eventName).length, 0);
        });
    });

    describe('dispatch(event, payload)', () => {

        it('should dispatch event', () => {

            dispatcher.register(eventName, (inPayload) => {

                assert.equal(inPayload, payload);
            });

            dispatcher.dispatch(eventName, payload);
        });
    });

    describe('getEventHandlers(event)', () => {

        it('should get event handlers', () => {

            dispatcher.register(eventName, noop);
            dispatcher.register(eventName, noop1);

            assert.equal(dispatcher.getEventHandlers(eventName).length, 2);
        });
    });

    describe('clearEventHandlers(event?)', () => {

        it('should clear event handlers', () => {

            dispatcher.register(eventName, noop);
            dispatcher.clearEventHandlers();

            assert.ok(typeof dispatcher.getEventHandlers(eventName) === 'undefined');
        });

        it('should clear event handlers of type', () => {

            dispatcher.register(eventName, noop);
            dispatcher.clearEventHandlers(eventName);

            assert.equal(dispatcher.getEventHandlers(eventName).length, 0);
        });
    });
});
