import React from 'react';
import PropTypes from 'prop-types';

import FontAwesome from 'react-fontawesome';

const TopBar = props => {
  const { themeSelected } = props.themeSelected;
  return (
    <div className={`topbar ${themeSelected}`}>
      <FontAwesome
        className={`icons ${themeSelected}`}
        name="user"
        size="2x"
        onClick={props.handleUserListClick}
      />
      <p className="chatmate-logo">chatmate</p>
      <FontAwesome
        className={`icons ${themeSelected} settings-toggle-off`}
        name="cog"
        size="2x"
        onClick={props.handleClick}
      />
    </div>
  );
};

TopBar.propTypes = {
  themeSelected: PropTypes.object.isRequired,
  handleUserListClick: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default TopBar;
