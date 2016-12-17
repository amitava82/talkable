import React from 'react';
import TimeAgo from 'react-timeago'

const styles = {
    container: {
        padding: '6px 7px 8px 9px',
        marginBottom: 10,
        borderRadius: 3,
        width: '80%',
        boxShadow: '1px 1px 2px rgba(0,0,0,.2)'
    },
    self: {
        backgroundColor: '#DCF8C6',
        marginLeft: 'auto'
    },
    other: {
        background: 'white',
        marginRight: 'auto'
    },
    text: {
        fontSize: 13.5
    },
    timestamp: {
        fontSize: 10,
        color: '#AAA',
        textAlign: 'right'
    },
    user: {
        fontSize: 14,
        fontWeight: 700,
        opacity: .7,
        marginBottom: 5
    }
};

export default class MessageBubble extends React.PureComponent {

    render() {
        const {message, isOtherParty} = this.props;
        const containerStyle = {...styles.container, ...(isOtherParty ? styles.other : styles.self)};
        return (
            <div style={containerStyle}>
                <div style={styles.user}>{message.userName}</div>
                <div style={styles.text}>{message.text}</div>
                <div style={styles.timestamp}><TimeAgo date={message.createdAt} /></div>
            </div>
        )
    }
}