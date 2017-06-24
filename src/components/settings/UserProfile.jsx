import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import Gravatar from 'react-gravatar';

const UserProfile = props => {
  const { username, email } = props.user;
  return (
    <div className="user-container">
      <div className="userprofile">
        <a href="https://en.gravatar.com/emails/" target="_blank" rel="noopener noreferrer">
          <div className="gravatar-container">
            <span className="avatar-overlay">
              <p>Change Gravatar</p>
            </span>
            <Gravatar className="profile-pic" email={email} default="wavatar" size={70} />
          </div>
        </a>
        <div className="profile-nick-container">
          <div id="profile-nick">{username}</div>
          <FontAwesome
            className="pencil"
            name="pencil"
            alt="Click to change username"
            title="Click to change username"
            onClick={props.handleEditClick}
          />
        </div>
      </div>
      <Link className="btn-logout" to="/login" onClick={(e) => props.handleLogOut(e)}>Logout</Link>
    </div>
  );
};


UserProfile.propTypes = {
  handleLogOut: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  user: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

UserProfile.defaultProps = {
  user: {},
};

export default UserProfile;
