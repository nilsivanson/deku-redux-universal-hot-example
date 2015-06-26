import {element} from 'deku';
import {DefaultHeader, Home, Another, Error404NotFound} from './views/index';

export function AppRouter(router) {
    return function (app) {
        // ignore state on router
        router.routed.add(() => {
            router.resetState();
        });

        // set the router on the app so that we can access it from components
        app.set('router', router);

        // set a default header for the app
        app.set('currentHeader', <DefaultHeader/>);

        router.addRoute('/', () => {
            app.set('currentPage', <Home/>);
        });
        router.addRoute('/another', () => {
            app.set('currentPage', <Another/>);
        });
        router.addRoute('/404', () => {
            app.set('currentPage', <Error404NotFound/>);
        });

        // no route found on parse
        router.bypassed.add(function (request) {
            console.log('No route matches, so parsing /404', request);
            router.parse('/404');
        });
    }
}
