# f-react-kit

React application development setup which encourages usage of **global immutable state** and **functional programming style**.
I've been introduced to this concept by awesome devs at [Redradix](http://redradix.com/).

## Usage

```
$ git clone git@github.com:roman01la/f-react-kit.git myproject
$ cd myproject
$ npm i
$ npm start
```

## Concepts

### Global immutable state

Concept of a single immutable state comes from [Om](https://github.com/omcljs/om) and has a good explanation in ["React Tips and Best Practices"](http://aeflash.com/2015-02/react-tips-and-best-practices.html) article.

The benefit of this pattern in its simplicity. Root component retrieves an updated atom state every time it's being modified and does re-render of the entire components tree. Every component in the tree receives state as a property passed down from root component.

Thus you don't care about synchronization of changes across application and the whole app can be easily forced to a particular state.

`src/state/atom.es6` represents immutable state and data management operations.

`src/state/initial.es6` is an initial state.

[mori](http://swannodette.github.io/mori/)'s persistent data structures is used here to represent and manipulate atom state.

### Functional programming style

Functional programming is about immutability, purity and side-effect free functions, which brings simplicity to your code.

[Ramda](http://ramdajs.com/) functional lib is used here for manipulating plain JavaScript arrays and objects.

## Difference from Flux architecture

### Component's state

There's only one global state, which is described in `src/state/initial.es6`.

### Stores

In Flux store is where you keep data, but here store describes only a way of accessing and transforming data of atom state. A store knows how to access data via **cursors** and exposes getters and setters for retrieving and transforming data.

### Dispatcher

Here we have a simplest possible implementation, but you can use your own.
