import React from 'react';
import PropTypes from 'prop-types';
import AlertContainer from 'react-alert';
import Message from '../components/Message';
import ScrollAlert from '../components/ScrollAlert';

export default class ChatBox extends React.Component {
  constructor() {
    super();

    this.alertOptions = {
      offset: 14,
      position: 'top left',
      theme: 'dark',
      time: 2000,
      transition: 'fade',
    };
    this.showAlert = msg => {
      this.msg.show(msg, {
        time: 3000,
        type: 'success',
      });
    };
  }

  componentDidMount() {
    // Check if user is loggedin and start fetching messages every 5s
    if (this.props.isLoggedIn) {
      this.props.getMessages();
      this.intervalId = setInterval(this.startPolling.bind(this), 5000);
    }
  }

  componentWillReceiveProps(nextProps) {
    // Show joining alert
    if (this.props.people.msg !== nextProps.people.msg) {
      this.showAlert(nextProps.people.msg);
    }
  }

  componentWillUpdate() {
    // Check if user is scroll state isn't at bottom.
    const node = document.getElementsByClassName('chatbox-container')[0];
    this.shouldScrollBottom =
      node.scrollTop + node.offsetHeight === node.scrollHeight;
    this.chatBoxWidth = node.offsetWidth;
  }

  componentDidUpdate() {
    // If user scroll state is at bottom. Auto scroll when new messages arrives.
    if (this.shouldScrollBottom) {
      const node = document.getElementsByClassName('chatbox-container')[0];
      node.scrollTop = node.scrollHeight;
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  startPolling() {
    this.props.getMessages();
  }

  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["jumpToBottom"] }] */
  // Click alert to scroll to the bottom of a chat
  jumpToBottom() {
    const node = document.getElementsByClassName('chatbox-container')[0];
    node.scrollTop = node.scrollHeight;
  }

  render() {
    const { fontSize } = this.props.fontSize;
    const { themeSelected } = this.props.themeSelected;
    const { messages, user } = this.props;
    return (
      <div className="chatbox-container" style={{ fontSize }}>
        {!this.shouldScrollBottom
          ? <ScrollAlert
            jumpToBottom={this.jumpToBottom}
            chatBoxWidth={this.chatBoxWidth}
          />
          : null}
        {messages.map(message => (
          <Message
            themeSelected={themeSelected}
            key={message._id}
            message={message}
            user={user}
          />
        ))}
        <AlertContainer
          ref={a => {
            this.msg = a;
          }}
          {...this.alertOptions}
        />
      </div>
    );
  }
}

ChatBox.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  fontSize: PropTypes.object.isRequired,
  messages: PropTypes.array,
  themeSelected: PropTypes.object.isRequired,
  user: PropTypes.object,
  getMessages: PropTypes.func.isRequired,
  people: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

ChatBox.defaultProps = {
  error: {},
  messages: {},
  user: {},
  msg: '',
  people: {},
};
