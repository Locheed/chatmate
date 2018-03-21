import React from 'react';
import PropTypes from 'prop-types';

import Fonts from '../components/settings/Fonts';
import Theme from '../components/settings/Theme';
import UserProfile from '../components/settings/UserProfile';

export default class Settings extends React.Component {
  constructor() {
    super();
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleThemeChange = this.handleThemeChange.bind(this);
    this.handleFontSize = this.handleFontSize.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  // LogOut user
  handleLogOut(e) {
    console.log('handling logout');
    e.preventDefault();
    this.props.logOut(this.props.user.username);
  }


  // ********* Profile changes ********
  handleThemeChange(theme) {
    const { fontSize } = this.props;
    this.props.profileChangeRequest(theme, null, null);
  }
  handleFontSize(fontSize) {
    const { themeSelected } = this.props.themeSelected;
    this.props.profileChangeRequest(null, fontSize, null);
  }

  // Change username
  handleEditClick() {
    this.node = document.getElementById('profile-nick');
    this.node.contentEditable = true;
    this.node.addEventListener('keypress', (e) => {
      if (e.which === 32) {
        return false;
      }
      if (e.which === 13) {
        e.preventDefault();
        this.node.contentEditable = false;
      }
      if (this.node.innerText.length > 12) {
        e.preventDefault();
      }
      return true;
    });
    this.node.focus();
    this.node.onblur = () => {
      this.props.profileChangeRequest(null, null, this.node.innerText);
      this.node.contentEditable = false;
    };
  }

  componentWillUnMount() {
    this.node.removeEventListener();
  }
  render() {
    const { themeSelected } = this.props.themeSelected;
    const { panelOpen, user } = this.props;
    const { fontSize } = this.props.user;
    return (
      <div className={`settings-container ${themeSelected} ${(panelOpen ? 'settings-container-open' : 'settings-container-closed')}`}>
        <div className="times-container">
          <span
            className="times"
            role="button"
            tabIndex={0}
            onClick={this.props.handleClick}
          >
            &times;
          </span>
        </div>

        <hr className={`settings-divider ${themeSelected}`} />
        <UserProfile
          user={user}
          handleLogOut={this.handleLogOut}
          handleEditClick={this.handleEditClick}
        />

        <Fonts
          themeSelected={themeSelected}
          fontSize={fontSize}
          handleFontSize={this.handleFontSize}
        />
        <Theme
          themeSelected={themeSelected}
          handleThemeChange={this.handleThemeChange}
        />
      </div>
    );
  }
}

Settings.propTypes = {
  logOut: PropTypes.func.isRequired,
  profileChangeRequest: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,

  themeSelected: PropTypes.object.isRequired,

  panelOpen: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

Settings.defaultProps = {
  user: {},
};

