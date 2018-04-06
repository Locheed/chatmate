import React from 'react';
import { Router, Route, Redirect, BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'normalize.css';

import * as messagesAction from '../actions/messagesAction';
import * as uiAction from '../actions/uiAction';
import * as socketAction from '../actions/socketAction';

import '../styles/main.sass';

import Register from '../containers/Register';
import Settings from '../containers/Settings';
import Login from '../containers/Login';
import UserList from '../containers/UserList';

import TopBar from '../components/TopBar';
import ChatBox from '../components/ChatBox';
import InputBox from '../components/InputBox';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.toggleUserPanel = this.toggleUserPanel.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      panelOpen: false,
      userPanelOpen: false,
    };
  }

  componentDidMount() {
    this.props.loginCheck();
  }

  toggleSettings() {
    this.state.panelOpen === false ? this.setState({ panelOpen: true }) : this.setState({ panelOpen: false });
  }

  toggleUserPanel() {
    this.state.userPanelOpen === false ? this.setState({ userPanelOpen: true }) : this.setState({ userPanelOpen: false });
  }

  // Fontsize handler
  handleChange(e) {
    this.setState({ fontSize: e });
  }

  render() {
    const { user, isLoggedIn, successMsg } = this.props.uiControl;
    return (
      <BrowserRouter>
        <div className="container">
          <Route
            path="/signup"
            render={() => (
              this.props.uiControl.authenticated ?
                <Redirect to="/login" /> :
                <Register signupRequest={this.props.signupRequest} errors={this.props.uiControl.error} />
                )}
          />
          <Route
            path="/login"
            render={() => (
              this.props.uiControl.isLoggedIn ?
                <Redirect to="/" /> :
                <Login loginRequest={this.props.loginRequest} successMsg={successMsg} />
              )}
          />
          <Route
            exact
            path="/"
            render={() => (
              !this.props.uiControl.isLoggedIn ?
                <Redirect to="/login" /> : (
                  <div className="container">
                    <UserList
                      userPanelOpen={this.state.userPanelOpen}
                      themeSelected={this.props.uiControl}
                      people={this.props.socketsData.people}
                    />
                    <Settings
                      handleClick={this.toggleSettings}
                      logOut={this.props.logOut}
                      panelOpen={this.state.panelOpen}
                      profileChangeRequest={this.props.profileChangeRequest}
                      handleChange={this.handleChange}
                      changeTheme={this.props.changeTheme}
                      themeSelected={this.props.uiControl}
                      user={user}
                    />
                    <div className="main-area">
                      <TopBar
                        handleClick={this.toggleSettings}
                        handleUserListClick={this.toggleUserPanel}
                        themeSelected={this.props.uiControl}
                      />
                      <ChatBox
                        people={this.props.socketsData}
                        messages={this.props.messages}
                        fontSize={this.props.uiControl}
                        getMessages={this.props.getMessages}
                        isLoggedIn={this.props.uiControl.isLoggedIn}
                        themeSelected={this.props.uiControl}
                        user={user}
                      />
                      <InputBox
                        postMessage={this.props.postMessage}
                        themeSelected={this.props.uiControl}
                        user={user}
                      />
                    </div>
                  </div>
            ))}
          />
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  signupRequest: PropTypes.func.isRequired,
  loginCheck: PropTypes.func.isRequired,
  profileChangeRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    uiControl: state.uiControl,
    socketsData: state.socket,

  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...messagesAction, ...uiAction, ...socketAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
