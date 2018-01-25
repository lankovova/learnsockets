import React from 'react';

function Message({message}) {
    return (
        <div className="message">
            <div className="content">
                <span className="time">{message.time}</span>
                <span>{message.text}</span>
            </div>
            <span className="check">
            {
                // FIXME: Change +/- to pretty HTML sybols
                (message.sent !== undefined)
                ? (message.sent) ? '+' : '-'
                : ''
            }
            </span>
        </div>
    );
}

export default class MessagesList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.listElem.scrollTop = this.listElem.scrollHeight;
    }

    render() {
        const messagesList = this.props.messages.map((message, i) =>
            <Message key={i} message={message} />
        );

        return (
            <div className="messages-list" ref={el => this.listElem = el}>
                {messagesList}
            </div>
        );
    }
}
