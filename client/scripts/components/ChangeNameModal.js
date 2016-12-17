import React from 'react';
import autobind from 'autobind-decorator';
import { Dialog, RaisedButton, FlatButton, TextField } from 'material-ui';

const customContentStyle = {
    width: '400px',
    maxWidth: 'none',
};


@autobind
export default class BroadcastModal extends React.Component {
    static propTypes = {
        onSubmit: React.PropTypes.func,
        onClose: React.PropTypes.func
    };

    constructor() {
        super();
        this.state = {
            text: ''
        }
    }

    componentDidMount() {
        this.refs.input.focus();
    }

    onChange(e) {
        this.setState({text: e.target.value});
    }

    onSubmit() {
        if(!this.state.text) return;
        this.props.onSubmit(this.state.text);
        this.setState({text: ''});
        this.props.onClose();
    }

    onClose() {
        this.props.onClose();
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                onTouchTap={this.onClose}
            />,
            <RaisedButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.onSubmit}
            />,
        ];

        return (
            <Dialog
                open={true}
                onRequestClose={this.onClose}
                title="Pick a name"
                actions={actions}
                modal={false} contentStyle={customContentStyle}>
            <TextField
                ref="input"
                fullWidth={true}
                onChange={this.onChange}
                value={this.state.text}
                floatingLabelText="Enter your Name"/>
            </Dialog>
        )
    }
}