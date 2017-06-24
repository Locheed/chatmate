import React from 'react';
import PropTypes from 'prop-types';

const Fonts = props => {
  return (
    <div className="fonts-container">
      <div className="fonts">
        <div className="fonts-overlay">
          <p className={`fonts-label ${props.themeSelected}`}>Font settings</p>
        </div>
        <form className="form">
          <label htmlFor="fontSize" className="label-size">Size</label>
          <select
            defaultValue="1rem"
            onChange={e => props.handleFontSize(e.target.value)}
            name="fontSize"
            id="fontSize"
          >
            <option value="0.75rem">Smaller</option>
            <option value="0.875rem">Small</option>
            <option value="1rem">Default</option>
            <option value="1.125rem">Big</option>
            <option value="1.25rem">Bigger</option>
          </select>
        </form>
      </div>
    </div>
  );
};

Fonts.propTypes = {
  themeSelected: PropTypes.string.isRequired,
  handleFontSize: PropTypes.func.isRequired,
};

export default Fonts;
