import React from 'react';
import PropTypes from 'prop-types';

const Theme = props => {
  const active = props.themeSelected;
  return (
    <div className="theme">
      <div className="btn-group">
        <span
          role="button"
          tabIndex="0"
          className={`balloon balloon-theme-one ${active === 'theme-one' ? 'theme-active' : ''}`}
          onClick={() => props.handleThemeChange('theme-one')}
        />
        <span
          role="button"
          tabIndex="0"
          className={`balloon balloon-theme-two ${active === 'theme-two' ? 'theme-active' : ''}`}
          onClick={() => props.handleThemeChange('theme-two')}
        />
        <span
          role="button"
          tabIndex="0"
          className={`balloon balloon-theme-three ${active === 'theme-three' ? 'theme-active' : ''}`}
          onClick={() => props.handleThemeChange('theme-three')}
        />
        <span
          role="button"
          tabIndex="0"
          className={`balloon balloon-theme-four ${active === 'theme-four' ? 'theme-active' : ''}`}
          onClick={() => props.handleThemeChange('theme-four')}
        />
      </div>
    </div>
  );
};

Theme.propTypes = {
  themeSelected: PropTypes.string.isRequired,
  handleThemeChange: PropTypes.func.isRequired,
};

export default Theme;
