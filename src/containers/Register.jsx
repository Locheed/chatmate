import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import RegisterField from '../components/RegisterField';

export default class Register extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      email: '',
      password: '',
      password2: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    this.props.signupRequest(username, email, password, password2);
  }


  render() {
    const { username, email, password, password2 } = this.props.errors;
    const infoTip = {
      email: `You use your email for login. It is recommended to use same email, 
            that you use in Gravatar-service. We use Gravatar images. Email cannot be changed afterwards.`,
    };
    return (
      <div className="register-container">
        <form onSubmit={this.onSubmit}>
          <RegisterField
            errorMsg={username !== undefined ? username.msg : null}
            onChange={this.onChange}
            type="text"
            value={this.state.username}
            htmlFor="username"
            label="Username:"
            placeholder="Username"
            name="username"
          >
            <p>This will be your publicly visible nick.<br />You can change this later.</p>
          </RegisterField>
          <RegisterField
            errorMsg={email !== undefined ? email.msg : null}
            onChange={this.onChange}
            type="text"
            value={this.state.email}
            htmlFor="email"
            label="Email:"
            placeholder="Email"
            name="email"
          >
            <ul>
              <li>You use your email for login.</li>
              <li>It is <strong>recommended</strong> to use same email, 
                  that you use in <a href="https://en.gravatar.com/" target="_blank" rel="noopener noreferrer">Gravatar</a>.</li>
              <li>We use Gravatar images.</li>
              <li><strong>Email cannot be changed afterwards</strong>.</li>
              <li>We only use your email for login and for Gravatars.</li>
            </ul>
          </RegisterField>
          <RegisterField
            errorMsg={password !== undefined ? password.msg : null}
            onChange={this.onChange}
            type="password"
            value={this.state.password}
            htmlFor="password"
            label="Password:"
            placeholder="Password"
            name="password"
          >
            <ul>
              <li>A password minimum length is 6 characters.</li>
              <li>It must contain uppercase and lowercase letters</li>
              <li>It must have a numbers in it</li>
              <li>Keep passwords safe. It cannot be changed and forgotten passwords can&#39;t be retrieved</li>
            </ul>
          </RegisterField>
          <RegisterField
            errorMsg={password2 !== undefined ? password2.msg : null}
            onChange={this.onChange}
            type="password"
            value={this.state.password2}
            htmlFor="password2"
            label="Password Confirmation:"
            placeholder="Retype Password"
            name="password2"
          >
            <p>Just to make sure you have typed your password correctly. :)</p>
          </RegisterField>
          <input className="register-button" type="submit" value="Register" />
        </form>
        <Link className="login-link" to="/login">Already have account?</Link>
      </div>
    );
  }
}

Register.propTypes = {
  signupRequest: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

Register.defaultProps = {
  errors: {},
};

