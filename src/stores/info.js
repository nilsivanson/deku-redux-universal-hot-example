import {
        INFO_LOAD,
        INFO_LOAD_SUCCESS,
        INFO_LOAD_FAIL
        } from '../actions/actionTypes';

const initialState = {
    loaded: false
};

export default function info(state = initialState, action = {}) {
    switch (action.type) {
        case INFO_LOAD:
            return {
                ...state,
                loading: true
            };
        case INFO_LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                data: action.result,
                error: null
            };
        case INFO_LOAD_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                data: null,
                error: action.error
            };
    }
    return state;
};
