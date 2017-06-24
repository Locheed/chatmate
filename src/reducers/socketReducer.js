function socketReducer(
  state = [{ socket: window.io('http://localhost:3002') }],
  action) {
  switch (action.type) {
    case 'SOCKET_JOIN':
      return {
        ...state,
        people: action.people,
      };

    case 'SOCKET_LEAVE':
      return {
        ...state,
        people: action.people,
      };

    case 'ANNOUNCE_JOIN':
      return {
        ...state,
        msg: action.msg,
      };

    default:
      return state;
  }
}

export default socketReducer;
