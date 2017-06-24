import React from 'react';
import PropTypes from 'prop-types';
import Gravatar from 'react-gravatar';

const UserBlock = (props) => {
  return (
    <div className="userblock-container">
      <div className="userblock">
        <Gravatar className="userlist-pic" email={props.email} default="wavatar" size={40} />
        <p className="userblock-nick">{ props.name }</p>
      </div>
    </div>
  );
};

UserBlock.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default UserBlock;
