import assert from 'assert';

import Dispatcher from '../src/lib/dispatcher';

let noop = () => null,
    noop1 = () => null,
    eventName = 'TEST',
    payload = {};

describe('Dispatcher', () => {

    afterEach(() => Dispatcher.clearEventHandlers());

    describe('register(event, fn)', () => {

        it('should register event handler', () => {

            Dispatcher.register(eventName, noop);

            assert.equal(noop, Dispatcher.getEventHandlers(eventName)[0]);
        });
    });

    describe('remove(event, fn)', () => {

        it('should remove event handler', () => {

            Dispatcher.register(eventName, noop);
            Dispatcher.remove(eventName, noop);

            assert.equal(Dispatcher.getEventHandlers(eventName).length, 0);
        });
    });

    describe('dispatch(event, payload)', () => {

        it('should dispatch event', () => {

            Dispatcher.register(eventName, (inPayload) => {

                assert.equal(inPayload, payload);
            });

            Dispatcher.dispatch(eventName, payload);
        });
    });

    describe('getEventHandlers(event)', () => {

        it('should get event handlers', () => {

            Dispatcher.register(eventName, noop);
            Dispatcher.register(eventName, noop1);

            assert.equal(Dispatcher.getEventHandlers(eventName).length, 2);
        });
    });

    describe('clearEventHandlers(event?)', () => {

        it('should clear event handlers', () => {

            Dispatcher.register(eventName, noop);
            Dispatcher.clearEventHandlers();

            assert.ok(typeof Dispatcher.getEventHandlers(eventName) === 'undefined');
        });

        it('should clear event handlers of type', () => {

            Dispatcher.register(eventName, noop);
            Dispatcher.clearEventHandlers(eventName);

            assert.equal(Dispatcher.getEventHandlers(eventName).length, 0);
        });
    });
});
