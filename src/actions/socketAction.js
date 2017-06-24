export function socketJoin(name, email) {
  return dispatch => {
    dispatch({
      type: 'server/SOCKET_JOIN',
      name,
      email,
    });
  };
}

export function socketLeave(name) {
  return dispatch => {
    dispatch({
      type: 'server/SOCKET_LEAVE',
      name,
    });
  };
}
