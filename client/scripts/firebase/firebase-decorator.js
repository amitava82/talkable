import React from 'react';
import {connect} from 'react-redux';
import firebase from './firebase';

// Simple decorator that can subscribe to a firebase path and pass data to decorated component
// For example each chat message can listen to change in user name and update the message user name

export default function decorator(options) {
    return function (Component) {
        const handlers = [];

        class DecoratedComponent extends React.Component{

            constructor(...args){
                super(...args);
                this.state = {
                    value: null,
                }
            }
            componentWillMount(){
                const ref = firebase.firebaseDb.ref(options.path(this.props));
                const fn = snapshot => {
                    const val = snapshot.val();
                    this.setState({value: val});
                };
                ref.on('value', fn);
                handlers.push({ref, fn});
            }

            componentWillUnmount(){
                handlers.forEach(i => i.ref.off('value',i.fn));
                handlers.length = 0;
            }

            render(){
                const state = {
                    [options.valueKey] : this.state.value
                };
                return <Component {...this.props} {...state} />
            }

        }
        return DecoratedComponent;
    }
}