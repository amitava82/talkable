import React from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import UsersPanel from '../components/ChatUsersPanel';
import MessagePanel from '../components/ChatMessagePanel';

import {
    bindMessagesListener, bindUsersListener, sendMessage, changeName
} from '../redux/modules/chat';


const styles = {
    container: {
        marginTop: 65,
        display: 'flex',
        flex: 1,
        height: 'calc(100vh - 65px)'
    },
    emptyMsg: {
        display: 'flex',
        alignItems: 'center',
        flex: 1
    }
};


@connect(state => state)
@autobind
export default class ChatContainer extends React.Component {

    constructor(...args) {
        super(...args);
    }

    componentWillMount() {
        // Bind firebase handlers. For large apps having a decorator makes thing easy to bind and unbind handlers
        // handlers. We don't care since there are no other views in this app.
        bindMessagesListener();
        bindUsersListener();
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    sendMessage(message) {
        sendMessage({
            userName: this.props.session.user.name,
            userId: this.props.session.user.uid,
            text: message
        })
    }

    onChangeName(name) {
        this.props.dispatch(changeName(name));
    }

    render() {
        const {chat: {users, messages}, session: { user }} = this.props;

        return (
            <div style={styles.container}>
                <MessagePanel messages={messages} me={user} onSend={this.sendMessage} onChangeName={this.onChangeName} />
                <UsersPanel users={users} />
            </div>
        )
    }
}