import React from 'react';
import MessagesList from './MessagesList';
import Input from './Input';

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            messages: [],
            loaded: false
        };

        socket.on('user connected', (username) => {
            console.log(`New user has connected ${username}`);
        });

        socket.on('user disconnected', (username) => {
            console.log(`User has disconnected ${username}`);
        });

        socket.on('chat message', ({message, clientId}) => {
            if (clientId === socket.id) {
                // Set sent flag on message
                this.setState(prevState => {
                    // Set sent flag to message
                    // when it comes this way
                    // client -> server -> client
                    prevState.messages[message.userUniqeId].sent = true;

                    return {messages: prevState.messages};
                })
            } else {
                this.setState(prevState => {
                    prevState.messages.push(message);
                    return {messages: prevState.messages};
                });
            }
        });

        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount() {
        this.setState({
            loaded: true
        });
    }

    sendMessage(message) {
        // Do nothing if messages is not loaded from the server
        if (!this.state.loaded) return;

        // Uniq message id for specific user
        message.userUniqeId = this.state.messages.length;

        // Sent clear message
        socket.emit('chat message', message);

        // In self state store message with additional variables
        // like sent flag
        this.setState(prevState => {
            // Add additional vars to message
            message.sent = false;

            // Add message to state
            prevState.messages.push(message);
            return {messages: prevState.messages};
        });
    }

    render() {
        return (
            <div className="chat-wrapper">
                <div className="chat">
                    {
                        (this.state.loaded)
                            ? <MessagesList messages={this.state.messages} />
                            : <div>Loading...</div>
                    }
                    <Input sendMessage={this.sendMessage} />
                </div>
            </div>
        );
    }
}
