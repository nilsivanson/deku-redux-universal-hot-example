import {App} from './index';
import {element, deku} from 'deku';
import crossroads from 'crossroads';
import {AppRouter} from '../router';
import createRedux from '../redux/create';
import ApiClient from '../ApiClient';

// * state is the state of the application
// to start a new application with an old state just redux.getState() and inject
// * request is the express request that is given on server side rendering
// since this is undefined on browser side we also be know that code is
// running in the browser when it is undefined
export default function AppTreeFactory(state, request) {
    const isServerSide = !!request;
    const client = new ApiClient(request);
    const redux = createRedux(client, state);

    const router = crossroads.create();
    router.go = (path) => {
        if (!isServerSide) history.pushState(redux.getState(), path, path);
        router.parse(path);
    };
    // generateGo is used for click handlers in components and views
    router.generateGo = (path) => {
        return (event) => {
            const preventDefault = event && !(event.shiftKey || event.ctrlKey || event.metaKey);
            if (preventDefault) {
                event.preventDefault();
            }
            router.go(path);
        }
    };
    // history handler for client
    if (!isServerSide) {
        window.onpopstate = function (event) {
            router.parse(location.pathname);
        };
    }

    const appTree = deku().use(AppRouter(router));
    if (isServerSide) appTree.option('validateProps', true);
    appTree.set('currentRedux', redux);
    appTree.set('currentReduxState', redux.getState());
    appTree.set('loaded', new Date().toString());

    // subscribe app tree to redux changes in state and store a handler for teardown
    const unsubscribeRedux = redux.subscribe(() => appTree.set('currentReduxState', redux.getState()));
    appTree.set('currentReduxUnsubscribe', unsubscribeRedux);

    // mount the application container on the application tree
    appTree.mount(<App/>);

    // parse current path
    if (isServerSide) {
        router.parse(request.path);
    } else {
        router.parse(location.pathname);
    }

    return appTree;
}
