import React from 'react';
import PropTypes from 'prop-types';
import UserBlock from '../components/userlist/UserBlock';

export default class UserList extends React.Component {

  render() {
    const { themeSelected } = this.props.themeSelected;
    const { userPanelOpen } = this.props;
    return (
      <div className={`userlist-container ${themeSelected} ${(userPanelOpen ? 'userlist-container-open' : 'userlist-container-closed')}`}>
        <hr className={`userlist-divider ${themeSelected}`} />
        <p className="users-header">Online:</p>
        <div className="online-users">
          {this.props.people.map(people => (
            <UserBlock key={people.name} name={people.name} email={people.email} />
          ))}
        </div>;
      </div>
    );
  }
}

UserList.propTypes = {
  themeSelected: PropTypes.object.isRequired,
  userPanelOpen: PropTypes.bool.isRequired,
  people: PropTypes.array,
};

UserList.defaultProps = {
  people: [],
};

