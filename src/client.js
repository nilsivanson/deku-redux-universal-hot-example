import {element, render} from 'deku';
import {AppTreeFactory} from './components/index';

// build the app tree
const appTree = AppTreeFactory(window.__state);
delete window.__state;

// start rendering the app
const {remove, inspect} = render(appTree, document.getElementById('content'));

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(function() {
        // get current state and store as if sending from server
        window.__state = appTree.sources.store.getState();

        // unsubscribe from current store
        appTree.sources.storeUnsubscribe();

        // teardown last app before rendering new one
        remove();
    });
}
