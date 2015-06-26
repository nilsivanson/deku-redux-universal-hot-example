import {element} from 'deku';

export const propTypes = {
    router: {type: 'object', source: 'router'}
};

export function render({props}) {
    let {router} = props;
    return (
            <ul id="slide-out" class="side-nav fixed">
                <li><a href="/" onClick={router.generateGo('/')}>Home</a></li>
                <li><a href="/another" onClick={router.generateGo('/another')}>Another</a></li>
                <li><a href="/brokenlink" onClick={router.generateGo('/brokenlink')}>A broken link</a></li>
            </ul>
    )
}

export default {propTypes, render};
