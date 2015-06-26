import {element, deku, tree, render} from 'deku';
import crossroads from 'crossroads';
import {AppRouter} from './router';
import {App} from './components/index';
import createRedux from './redux/create';
import ApiClient from './ApiClient';

const client = new ApiClient();
var unsubscribe;

var redux = createRedux(client, window.__state);
var router = buildRouter(redux);
var appTree = buildAppTree(redux, router, AppRouter);

// start rendering the app
var {remove, inspect} = mountApplication(appTree, App);

function mountApplication(tree, App) {
    tree.mount(<App/>);
    router.parse(location.pathname);

    // on back and forward buttons in browser
    window.onpopstate = function (event) {
        router.parse(location.pathname);
    };

    return render(tree, document.getElementById('content'));
}

function buildRouter(redux) {
    let router = crossroads.create();
    // transition now
    router.go = function (path) {
        if (path === location.pathname) {
            return;
        }
        history.pushState(redux.getState(), path, path);
        router.parse(path);
    };
    // used for onClick handlers
    router.generateGo = function (path) {
        return function (event) {
            // ability to open links in new tabs with keyboard shortcuts pressed when clicking
            if (event.shiftKey || event.ctrlKey || event.metaKey) {
                return;
            }

            event.preventDefault();
            router.go(path);
        }
    };
    return router;
}

function buildAppTree(redux, router, AppRouter) {
    let tree = deku().use(AppRouter(router));
    tree.option('validateProps', true);
    tree.set('currentRedux', redux);
    tree.set('currentReduxState', redux.getState());
    unsubscribe = redux.subscribe(function() {
        tree.set('currentReduxState', redux.getState());
    });
    return tree;
}

function rebootApp() {
    console.log('Starting app reboot');
    unsubscribe();
    remove();
    let currentState = redux.getState();

    let createRedux = require('./redux/create');
    redux = createRedux(client, currentState);
    router = buildRouter(redux);
    let {AppRouter} = require('./router');
    appTree = buildAppTree(redux, router, AppRouter);
    let {App} = require('./components/index');
    let mountRemoveInspect = mountApplication(appTree, App);
    remove = mountRemoveInspect.remove;
    inspect = mountRemoveInspect.inspect;
}

if (module.hot) {
    module.hot.accept('./components/index', rebootApp);
    module.hot.accept('./views/index', rebootApp);
    module.hot.accept('./stores/index', rebootApp);
    module.hot.accept('./redux/create', rebootApp);
    module.hot.accept('./router', rebootApp);
}
