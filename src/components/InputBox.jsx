import React from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import textAreaResize from '../tools/autoresize';

import arrow from '../assets/icons/arrow.svg';


class InputBox extends React.Component {
  constructor() {
    super();
    this.state = {
      chars: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submit = false;
  }

  componentDidMount() {
    // Textbox automatic resize
    this.element = document.getElementById('input-box');
    const form = document.getElementById('formSend');
    const observe = (event, handler) => {
      this.element.addEventListener(event, handler, false);
    };
    textAreaResize(this.element, observe);
  }

  componentWillUnMount() {
    this.element.removeEventListener();
  }
  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["handleKeyDown"] }] */
  // Textarea listener. Enter to send a message. Shift + Enter for a new line.
  handleKeyDown(e, cb) {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault();
      cb(e); // Callback to handleSubmit.
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const messageId = Date.now();
    const date = new Date();
    const sendTime = date.toLocaleString('en-GB');
    const message = this.textInput.value;
    if (message.trim().length !== 0 && message.trim().length <= 1000) {
      this.setState({ chars: message.trim().length });
      this.props.postMessage(sendTime, message, messageId);
      this.textInput.value = '';
    } else if (message.trim().length > 1000) {
      this.setState({ chars: message.trim().length });
    }
  }

  render() {
    const { themeSelected } = this.props.themeSelected;
    return (
      <div className="input-container">
        {this.state.chars > 1000 && <span className="character-limit">Character limit is 1000 characters. You typed {this.state.chars} characters.</span>}
        <div>{this.typings}</div>
        <form
          id="sendForm"
          className="send-form"
          onSubmit={this.handleSubmit}
        >
          <textarea
            id="input-box"
            className={themeSelected}
            type="text"
            ref={input => {
              this.textInput = input;
            }}
            placeholder="Type here..."
            onKeyDown={e => this.handleKeyDown(e, this.handleSubmit)}
          />
          <input
            className={`send-btn ${themeSelected}`}
            type="image"
            src={arrow}
            alt="Send message"
          />
        </form>

      </div>
    );
  }
}
InputBox.propTypes = {
  themeSelected: PropTypes.object.isRequired,
  postMessage: PropTypes.func.isRequired,
};

InputBox.defaultProps = {
  user: {},
};

export default InputBox;
