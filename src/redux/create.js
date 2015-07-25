import { createStore, combineReducers, applyMiddleware } from 'redux';
import clientMiddleware from './clientMiddleware';
import thunkMiddleware from './thunkMiddleware';
import * as reducers from '../reducers/index';

export default function (client, data) {
    const reducer = combineReducers(reducers);
    const finalCreateStore = applyMiddleware(thunkMiddleware, clientMiddleware(client))(createStore);
    return finalCreateStore(reducer, data);
}
