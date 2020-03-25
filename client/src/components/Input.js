import React from 'react';

import '../assets/main.css';

const Input = ({ message, setMessage, messageHandler }) => (
    <form className="form">
        <input
            className="input"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={(event) => event.key === 'Enter' ? messageHandler(event) : null}
        />
        <button className="sendButton" onClick={(event) => messageHandler(event)}>Send</button>
    </form>
)

export default Input;