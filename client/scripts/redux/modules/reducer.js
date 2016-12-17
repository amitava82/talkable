import { combineReducers } from 'redux';

import session from './session';
import chat from './chat';


export default combineReducers({
    chat,
    session
});