import React from 'react';

import Input from './input';

import protonComponent from '../lib/components/proton-component';

import Dispatcher from '../lib/dispatcher';
import { selectTruthy, flip } from '../lib/functions';

import _ from 'mori';

let getToDoClassNames = _.comp(

    (joiner => array => array.join(joiner))(' '),
    _.partial(selectTruthy, ['completed', 'editing'])
);

class ToDoItem extends React.Component {

    static propTypes = {

        protonState: React.PropTypes.object,
        cursor: React.PropTypes.arrayOf(React.PropTypes.any)
    }

    constructor (props) {

        super(props);
        this._updateDispatcherCursor(props.cursor);
    }

    componentDidUpdate (prevProps) {

        let protonState = this.props.protonState;

        if (protonState.editing) {

            !prevProps.protonState.editing &&
                React.findDOMNode(this.refs.toDoEditor).focus();
        }
        else {

            protonState.title === '' ?
                this._removeItem() :
                this._updateTitleAndHide();
        }
    }

    componentWillUpdate (nextProps) {

        this._updateDispatcherCursor(nextProps.cursor);
    }

    _updateDispatcherCursor = cursor => this._dispatchWithCursor = _.partial(flip(Dispatcher.dispatch), cursor);

    _onSelect = event => this._dispatchWithCursor('TODOS:COMPLETE_TODO', event.target.checked);

    _showEditor = () => this._dispatchWithCursor('TODOS:SHOW_TODO_EDITOR');

    _hideEditor = () => this._dispatchWithCursor('TODOS:HIDE_TODO_EDITOR');

    _updateNextTitle = event => this._dispatchWithCursor('TODOS:UPDATE_NEXT_TITLE', event.target.value);

    _undoNextTitle = () => {

        this._dispatchWithCursor('TODOS:UNDO_NEXT_TITLE');
        this._hideEditor();
    }

    _updateTitle = () => this._dispatchWithCursor('TODOS:UPDATE_TITLE');

    _handleTitleChange = event => {

        event.keyCode === 13 &&
            this._updateTitleAndHide();

        event.keyCode === 27 &&
            this._undoNextTitle();
    }

    _updateTitleAndHide = () => {

        this._updateTitle();
        this._hideEditor();
    }

    _removeItem = () => this._dispatchWithCursor('TODOS:REMOVE_TODO');

    render() {

        let protonState = this.props.protonState,
            cursor = this.props.cursor;

        return (

            <li className={getToDoClassNames(protonState)}>
                <div className='view'>

                    <Input className='toggle'
                           type='checkbox'
                           cursor={cursor.concat('completed')}
                           onChange={this._onSelect} />

                    <label onDoubleClick={this._showEditor}>{protonState.title}</label>
                    <button className='destroy' onClick={this._removeItem}></button>
                </div>

                <Input className='edit'
                       ref='toDoEditor'
                       cursor={cursor.concat('nextTitle')}
                       onChange={this._updateNextTitle}
                       onKeyDown={this._handleTitleChange}
                       onBlur={this._updateTitleAndHide} />
            </li>
        );
    }
}

export default protonComponent(ToDoItem);
