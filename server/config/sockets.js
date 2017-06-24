module.exports = (io) => {
  const users = [];
  let people = {};

  function removeSockets(socket) {
    const index = users.map(e => {
      return e.id;
    }).indexOf(socket.id);
    index > -1 ? users.splice(index, 1) : null;
    return users;
  }

  io.sockets.on('connection', (socket) => {
    socket.on('disconnect', () => {
      removeSockets(socket);
      io.sockets.emit('action', { type: 'SOCKET_LEAVE', people: users });
    });
    socket.on('typing', (data) => {
      socket.broadcast.emit('typing', `${data} is typing...`);
    });
    socket.on('action', (action) => {
      switch (action.type) {
        case 'server/SOCKET_JOIN':
          people = {
            id: socket.id,
            name: action.name,
            email: action.email,
          };

          // Check if email already exists as online with a different socket.id (New tab/window)
          if (users.map((item) => {
            return item.email;
          }).indexOf(people.email) === -1) {
            users.push(people);
          }
          // List people online with Socket.io connection
          console.log(`People on chat: ${JSON.stringify(users)}`);
          io.sockets.emit('action', { type: 'ANNOUNCE_JOIN', msg: `${action.name} has joined chat` });
          io.sockets.emit('action', { type: 'SOCKET_JOIN', people: users });
          break;
        case 'server/SOCKET_LEAVE':
          removeSockets(socket);
          console.log(`People on chat: ${JSON.stringify(people)}`);
          io.sockets.emit('action', { type: 'SOCKET_LEAVE', people: users });
          break;
        default: break;
      }
    });
  });
};
