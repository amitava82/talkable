import React from 'react';
import { Paper, Avatar, TextField, RaisedButton } from 'material-ui';
import autobind from 'autobind-decorator';
import get from 'lodash/get';
import randomColor from 'randomcolor';

import MessageBubble from './MessageBubble';
import ChangeNameModal from './ChangeNameModal';

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'rgba(222, 182, 143, 0.33)',
        display: 'flex',
        flexDirection: 'column'
    },
    messages: {
        overflow: 'auto',
        padding: 20,
        flex: 1
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: 'white',
        boxShadow: '-1px 1px 1px rgba(0,0,0,.2)',
        zIndex: 1
    },
    avatar: {
      marginRight: 10
    },
    flex: {
        flex: 1
    },
    me: {
        backgroundColor: 'white'
    },
    other: {
        backgroundColor: '#DCF8C6'
    },
    composer: {
        backgroundColor: 'white',
        padding: 10,
        boxShadow: '0 -1px 2px rgba(0,0,0,.2)'
    }
};

@autobind
export default class ChatMessagePanel extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            value: '',
            showModal: false
        }
    }

    componentDidMount(nextProps) {
        this.scrollBottom();
    }

    componentDidUpdate() {
        this.scrollBottom();
    }

    onChange(e) {
        this.setState({value: e.target.value})
    }

    onEnter(e) {
        if(!e.shiftKey && e.which === 13) {
            e.preventDefault();
            const val = this.state.value;
            this.setState({value: ''});
            this.props.onSend(val);
        }
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    scrollBottom() {
        if(this.refs.messages)
            this.refs.messages.scrollTop = this.refs.messages.scrollHeight + 50;
    }

    render() {
        const { messages = [], me, onChangeName } = this.props;
        const msgItems = messages.map(m => <MessageBubble message={m} key={m._id} isOtherParty={m.userId != me.uid} />);

        return (
            <Paper style={styles.container}>
                <div style={styles.header}>
                    <Avatar style={styles.avatar} backgroundColor={randomColor({seed: me.uid})}>{me.name[0]}</Avatar>
                    <h4 style={styles.flex}>{me.name}</h4>
                    <RaisedButton primary={true} label="Change name" onTouchTap={this.toggleModal} />
                </div>
                <div style={styles.messages} ref="messages">
                    {msgItems}
                </div>
                <div style={styles.composer}>
                    <TextField
                        name="composer"
                        placeholder="Type your message and press Enter"
                        value={this.state.value}
                        fullWidth={true}
                        onChange={this.onChange}
                        onKeyPress={this.onEnter}
                        multiLine={true}
                        rowsMax={4} />
                </div>
                {this.state.showModal && <ChangeNameModal onClose={this.toggleModal} onSubmit={onChangeName} />}
            </Paper>
        )
    }
}