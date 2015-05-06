import React from 'react';

import pureComponent from '../lib/components/pure-component';

import Dispatcher from '../lib/dispatcher';

import { pluralize } from '../lib/functions';

import r from 'ramda';

let footerLinksMap = {

    '/all': 'All',
    '/active': 'Active',
    '/completed': 'Completed'
};

class Footer extends React.Component {

    static propTypes = {

        currentPage: React.PropTypes.string,
        isAnyCompleted: React.PropTypes.bool,
        uncompleted: React.PropTypes.number
    }

    _onClear() {

        Dispatcher.dispatch('TODOS:REMOVE_COMPLETED');
    }

    render() {

        let props = this.props;

        let itemsLeft = props.uncompleted,
            itemsLeftText = <strong>{itemsLeft}</strong>,
            maybePluralItem = pluralize('item', itemsLeft),
            currentPage = props.currentPage;

        let footerLinks = r.mapIndexed((path, index) => {

            let className;

            (path === currentPage || currentPage === '/' && path === '/all') &&
                (className = 'selected');

            return (

                <li key={index}>
                    <a href={path} className={className}>{footerLinksMap[path]}</a>
                </li>
            );

        }, Object.keys(footerLinksMap));


        let clearBtn = (

            <button className='clear-completed'
                    onClick={this._onClear}>Clear completed</button>
        );

        return (

            <footer className='footer'>
                <span className='todo-count'>{itemsLeftText} {maybePluralItem} left</span>
                <ul className='filters'>{footerLinks}</ul>
                {props.isAnyCompleted ? clearBtn : null}
            </footer>
        );
    }
}

export default pureComponent(Footer);
