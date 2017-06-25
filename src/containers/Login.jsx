import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import logo from '../assets/chatmate_logo.png';

import RegisterField from '../components/RegisterField';


export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.loginRequest(email, password);
  }

  render() {
    const { successMsg } = this.props;
    const successStyle = {
      height: '650px',
    };
    return (
      <div className="login-container">
        <img src={logo} className="logo" alt="Chatmate" title="Chatmate" />
        <form onSubmit={this.onSubmit}>
          <RegisterField
            errorMsg={this.props.errors.email !== undefined ? this.props.errors.email.msg : null}
            type="text"
            onChange={this.onChange}
            value={this.state.email}
            htmlFor="email"
            label="Email:"
            placeholder="Email"
            name="email"
          />
          <RegisterField
            errorMsg={this.props.errors.password !== undefined ? this.props.errors.password.msg : null}
            type="password"
            onChange={this.onChange}
            value={this.state.password}
            htmlFor="password"
            label="Password:"
            placeholder="Password"
            name="password"
          />
          <input className="login-button" type="submit" value="Login" />
        </form>
        {successMsg === '' && <Link className="signup-link" to="/signup">Need account?</Link>}
        {successMsg !== '' && <p className="success-msg">Thank you for registering! You may now login.</p>}
        {successMsg !== '' &&
          <FontAwesome
            size="5x"
            className="check"
            name="check-circle"
          />}
      </div>
    );
  }
}

Login.propTypes = {
  loginRequest: PropTypes.func.isRequired,
  successMsg: PropTypes.string,
  errors: PropTypes.object,
};

Login.defaultProps = {
  errors: {},
  successMsg: '',
};

