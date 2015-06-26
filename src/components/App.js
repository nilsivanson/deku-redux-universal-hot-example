import {element} from 'deku';
import {MainMenu} from './index';

export const propTypes = {
    header: {type: 'object', source: 'currentHeader'},
    page: {type: 'object', source: 'currentPage'},
    reduxState: {type: 'object', source: 'currentReduxState'}
};

export function render({props}) {
    let {page, header, reduxState} = props;

    return (
            <div>
                <header>
                    {header}
                    <MainMenu/>
                </header>
                <main>
                    <div class="container">{page}</div>
                </main>
            </div>
    )
}

export default {propTypes, render};
