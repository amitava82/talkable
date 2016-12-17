var names = require('starwars-names');
import { fireDb } from '../../firebase/firebase';

import createAction from '../createActions';

export const [LOGIN, LOGOUT] = createAction('chat', ["LOGIN", "LOGOUT"]);
import { CHANGE_NAME } from './chat';

const initialState = {
    user: null,
    loading: true
};

export default function (state = initialState, action) {
    const {type, payload, meta} = action;

    switch (type) {
        case LOGIN:
            return {
                user: payload,
                loading: false
            };

        case CHANGE_NAME:
            return {
                ...state,
                user: {...state.user, name: payload}
            };

        default:
            return state;
    }
}

export const storeSession = (data) =>  {
    const name = names.random();
    const user = {
        name: name,
        uid: data.uid
    };

    const ref = fireDb.ref(`/users/${user.uid}`);
        ref.set(user);
        ref.onDisconnect().remove();
    return {
        type: LOGIN,
        payload: user
    };
};

export const logout = (user) => {
    //todo
    console.log('logout', user);
    if(user)
        fireDb.ref(`/users/${user.uid}`).remove(); //
};