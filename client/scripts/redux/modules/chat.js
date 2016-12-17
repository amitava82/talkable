import firebase from 'firebase';
import { resolve, reject as _reject } from '../middleware/simple-promise';
import { fireDb } from '../../firebase/firebase';
import store from '../store';

import createAction from '../createActions';

export const [LOAD_MESSAGES, SEND, RECEIVE, JOIN, LEAVE, CHANGE_NAME] =
    createAction('chat', ["LOAD_MESSAGES", "SEND", "RECEIVE", "JOIN", "LEAVE", "CHANGE_NAME"]);


const initialState = {
    messages: [],
    users: {},
    loading: false
};

export default function (state = initialState, action) {
    const {type, payload, meta} = action;

    switch (type) {
        case JOIN:
            return {
                ...state,
                users: {...state.users, [payload.uid]: payload}
            };

        case LEAVE:
            const users = {...state.users};
            delete users[payload.uid];
            return {...state, users};

        case RECEIVE:
            const messages = [...state.messages, payload];
            return {...state, messages};

        default:
            return state;
    }
}


/* sending message. Firebase messages listener will take care of updating store*/
export const sendMessage = (data) => {
  const ref = fireDb.ref('messages').push();
  data.createdAt = firebase.database.ServerValue.TIMESTAMP;
  ref.set(data);
};


/* This is Thunk */
export const changeName = name => {
    return (dispatch, getState) => {
        const session = getState().session;
        fireDb.ref(`users/${session.user.uid}`).update({name});
        dispatch( {
            type: CHANGE_NAME,
            payload: name
        });
    };
};

/* firebase listeners. Bind this on Chat container mount. For simple app like this, this method works */

/* Online users listener */
export const bindUsersListener = () => {
    const ref = fireDb.ref('users');

    ref.on('child_added', snapshot => {
        const val = snapshot.val();
        store.dispatch({
            type: JOIN,
            payload: val
        });
    });

    ref.on('child_changed', snapshot => {
        const val = snapshot.val();
        store.dispatch({
            type: JOIN,
            payload: val
        });
    });

    ref.on('child_removed', snapshot => {
        const val = snapshot.val();
        console.log(val);
        store.dispatch({
            type: LEAVE,
            payload: val
        });
    });
};


/* Messages listener */
export const bindMessagesListener = () => {
    const ref = fireDb.ref('messages');

    ref.on('child_added', snapshot => {
        const val = snapshot.val();
        store.dispatch({
            type: RECEIVE,
            payload: val
        });
    });

};