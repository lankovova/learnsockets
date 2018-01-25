import React from 'react';
import {getCurrentTime} from './utils';

export default class Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({message: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.message === '') return;

        const currentTime = getCurrentTime();

        // Send message to store
        this.props.sendMessage({
            time: `${currentTime.hours}:${currentTime.mins} ${currentTime.ampm}`,
            text: this.state.message
        });

        // Clear input field
        this.setState({message: ''});
    }

    render() {
        return (
            <form className="inputForm">
                <input type="text" value={this.state.message} onInput={this.handleChange} />
                <input type="submit" value="Send" onClick={this.handleSubmit} />
            </form>
        );
    }
}
