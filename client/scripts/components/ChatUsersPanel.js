import React from 'react';
import autobind from 'autobind-decorator';
import {ListItem, Avatar, Paper, AutoComplete} from 'material-ui';
import get from 'lodash/get';
import last from 'lodash/last';
import randomColor from 'randomcolor';

const styles = {
    container: {
        width: 260,
        overflowX: 'hidden',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column'
        //borderLeft: '1px solid #eee'
    },
    active: {
        backgroundColor: '#f5f5f5'
    },
    filterContainer: {
        padding: '0 10px'
    },
    listContainer: {
        flex: 1
    }
};

@autobind
export default class ChatUsersPanel extends React.Component {

    onSelect(selected, idx) {
        if(idx > -1) {
            this.props.onSelect(selected.id);
        }
    }

    render() {
        const { users = {}} = this.props;

        const _users = Object.keys(users).map(k => users[k]);

        const usersList = _users.map(user => (
            <ListItem
                key={user.uid}
                primaryText={user.name}
                leftAvatar={<Avatar backgroundColor={randomColor({seed: user.uid})}>{user.name[0]}</Avatar>}
            />
        ));

        return (
            <Paper style={styles.container}>
                <div style={styles.listContainer}>
                    {usersList}
                </div>
            </Paper>
        )
    }
}