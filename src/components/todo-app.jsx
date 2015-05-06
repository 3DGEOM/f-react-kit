import React from 'react';

import Header from './header';
import Main from './main';
import Footer from './footer';

import ToDoItemsStore from '../stores/todo-items-store';

class ToDoApp extends React.Component {

    render() {

        let hasPageItems = !!ToDoItemsStore.getPageItems().length,
            hasAnyItems = !!ToDoItemsStore.getAllItems().length;

        let footerProps = {

            currentPage: ToDoItemsStore.getCurrentPage(),
            isAnyCompleted: ToDoItemsStore.isAnyCompleted(),
            uncompleted: ToDoItemsStore.countUncompleted()
        };

        return (

            <div>
                <section className='todoapp'>
                    <Header cursor={['newToDo']} />
                    {hasPageItems ? <Main /> : null}
                    {hasAnyItems ? <Footer {...footerProps} /> : null}
                </section>
                <footer className='info'>
                    <p>Double-click to edit a todo</p>
                </footer>
            </div>
        );
    }
}

export default ToDoApp;
