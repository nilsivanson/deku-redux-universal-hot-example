import {element} from 'deku';
import {MainMenu} from './index';

export const propTypes = {
    header: {type: 'object', source: 'currentHeader'},
    page: {type: 'object', source: 'currentPage'},
    redux: {type: 'object', source: 'currentRedux'}
};

export function render({props}) {
    let {header} = props;
    let {page} = props;
    let {redux} = props;

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
