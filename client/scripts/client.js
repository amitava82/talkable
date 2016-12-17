import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';


import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

injectTapEventPlugin();

import { fireAuth, fireDb } from './firebase/firebase';

import Loading from './components/Loading';
import store from './redux/store';
import Navbar from './components/Navbar';
import ChatContainer from './containers/ChatContainer';

import { storeSession } from './redux/modules/session';


@connect(state => state)
class App extends React.Component {

    componentWillMount() {
        let loggedIN = false;

        /*
        * Alright, we are hooking up auth here.
        * Since we just have one page, this is alright to put it here.
        * Ideally for large app, I'd put this in session store
        * */
        fireAuth.onAuthStateChanged(user => {
            if (user) {
                if(!loggedIN) { //Need to do this so firebase don't create multiple user since this handler gets called multiple times
                    store.dispatch(storeSession(user));
                    loggedIN = user;
                }
            }
        });

        //
        fireAuth.signInAnonymously().catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <Navbar/>
                { this.props.session.loading ? <Loading /> : <ChatContainer />}
            </div>
        )
    }
}

class Client extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <App />
                </MuiThemeProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<Client />, document.getElementById('app-root'));