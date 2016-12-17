import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const style = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0
};


export default class Navbar extends React.Component{

    render(){
        return (
            <AppBar style={style}
                onLeftIconButton={false}
                title="Talkable"
            />
        )
    }
}