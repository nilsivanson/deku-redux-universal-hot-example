import {element} from 'deku';
import {bindActionCreators} from 'redux';
import * as infoActions from '../actions/infoActions';

const propTypesInfoBar = {
    load: {type: 'function', source: 'load'},
    info: {type: 'object', source: 'info'}
};

function renderInfoBar({props}) {
    let {load, info} = props;
    if (!info) {
        info = {};
    }
    return (
            <div class="card">
                <div class="card-content">
                    <span class="card-title black-text">Remote call with redux</span>
                    <br/>Loading: {info.loading ? 'TRUTHY' : 'FALSEY'}
                    <br/>Loaded: {info.loaded ? 'TRUTHY' : 'FALSEY'}
                    <br/>Data: {info.data ? info.data.message + ' ' + new Date(info.data.time).toString() : 'NO DATA'}
                    <br/>Errors: {info.error ? 'YEAH' : 'NOPE'}
                    <br/><br/>
                    <a class="btn"onClick={load}>Load</a>
                </div>
            </div>
    );
}

const InfoBar = {propTypes: propTypesInfoBar, render: renderInfoBar};

const propTypes = {
    redux: {type: 'object', source: 'redux'},
    info: {type: 'object', source: 'info'}
};

function render({props}) {
    const {redux, info} = props;
    return (
            <InfoBar info={info} {...bindActionCreators(infoActions, redux.dispatch)}/>
    );
}

export default {propTypes, render};
