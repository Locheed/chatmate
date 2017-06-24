import React from 'react';
import PropTypes from 'prop-types';


const ScrollAlert = props => {
  const style = {
    width: props.chatBoxWidth,
  };
  return (
    <div
      className="scroll-alert"
      style={style}
      tabIndex="0"
      role="button"
      onClick={() => props.jumpToBottom()}
    >
      <p>You&#39;re reading older messages.</p>
      <p>Click here to see newer messages.</p>
    </div>
  );
};

ScrollAlert.propTypes = {
  jumpToBottom: PropTypes.func.isRequired,
  chatBoxWidth: PropTypes.number,
};

ScrollAlert.defaultProps = {
  chatBoxWidth: 0,
};

export default ScrollAlert;
