Deku Redux Universal Hot Example
=================================

### Description

NOTE: This is a fork of [erikras/react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example) modified for Deku

Beware of dirty hacks.

* Isomorphic/Universal rendering
* Both client and server make calls to load data from separate API server
* [Deku](https://github.com/dekujs/deku)
* [Crossroads Router](https://github.com/rackt/react-router)
* [Materialize CSS](http://materializecss.com/) due to lack of material-ui components
* [Express](http://expressjs.com)
* [Babel](http://babeljs.io) for ES6 and ES7 magic
* [Webpack](http://webpack.github.io) for bundling
* [Webpack Dev Server](http://webpack.github.io/docs/webpack-dev-server.html)
* [Redux](https://github.com/gaearon/redux)'s futuristic [Flux](https://facebook.github.io/react/blog/2014/05/06/flux
.html) implementation

### Running Web Server

```
npm install
npm run start
```

### Running Webpack Dev Server

```
npm run watch-client
```

Both `npm run start` and `npm run watch-client` must be running at the same
time for the webapp to work with hot reloading.

Then try editing src/components/App.js or any other template or store

### Maybe TODO

* Move routing solution into redux to get rid of hacky solution
* Make sure all promises if any are resolved before rendering on server
* Get rid of AppClient is not defined error (that was also present in original repo)

-----

Original Author: Erik Rasmussen [@erikras](https://twitter.com/erikras)

Modified by: Nils Ivanson [@nivanson](https://github.com/nivanson)
