import {element} from 'deku';
import {InfoBar} from '../components/index';

function render({props}) {
    return (
            <div>
                <h1>Another page</h1>
                <p>Note that the info bar state persists. It is stored in redux and whenever it changes it is pushed to currentReduxState. See client.js for more information.</p>
                <InfoBar/>
            </div>
    );
}

export default {render};
