import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from './middleware/simple-promise';
import thunk from 'redux-thunk';

import reducer from './modules/reducer';


export default function (initialState = {}) {
    const createStoreWithMiddleware = applyMiddleware(thunk, promiseMiddleware())(createStore);
    return createStoreWithMiddleware(reducer, initialState);
}
