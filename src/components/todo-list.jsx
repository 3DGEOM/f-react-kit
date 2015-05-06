import React from 'react';

import ToDoItem from './todo-item';

import protonComponent from '../lib/components/proton-component';

import r from 'ramda';

class ToDoList extends React.Component {

    static propTypes = {

        protonState: React.PropTypes.array,
        cursor: React.PropTypes.arrayOf(React.PropTypes.any)
    }

    render() {

        let list = r.mapIndexed((item, index) => {

            return (

                <ToDoItem cursor={this.props.cursor.concat(index)}
                          key={index} />
            );

        }, this.props.protonState);

        return <ul className='todo-list'>{list}</ul>;
    }
}

export default protonComponent(ToDoList);
