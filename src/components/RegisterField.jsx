import React from 'react';
import PropTypes from 'prop-types';

const RegisterFields = props => {
  const { onChange, value, htmlFor, label, placeholder, name, type, errorMsg } = props;
  function error() {
    if (errorMsg) return 'error';
    return '';
  }
  return (
    <div className="register-field">
      <div className="form-group">
        <label htmlFor={htmlFor}>{label}</label>
        <input
          className={error()}
          type={type}
          value={value}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
        />
        {props.children &&
          <div className="info-tip">
            {props.children}
          </div>}
        <span className="error-field">{errorMsg}</span>
      </div>
    </div>
  );
};

RegisterFields.propTypes = {
  onChange: PropTypes.func.isRequired,
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  errorMsg: PropTypes.string,
  children: PropTypes.node,
};

RegisterFields.defaultProps = {
  errorMsg: '',
  children: null,
};

export default RegisterFields;
