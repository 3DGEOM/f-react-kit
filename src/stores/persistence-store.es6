import { register } from '../lib/dispatcher';

import _ from 'mori';
import mt from 'mori-transit';

let stateRecordName = 'todo-state';

let saveState = _.comp(_.partial(localStorage.setItem.bind(localStorage), stateRecordName), mt.encode),
    loadState = _.comp(mt.decode, _.partial(localStorage.getItem.bind(localStorage), stateRecordName));

register('STATE:SAVE', saveState);

export default {

    loadState
};
