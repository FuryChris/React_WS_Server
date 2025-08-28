const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  getUsersInRoomText,
  checkUser,
} = require('../utils/users');

const { handleAIMessage } = require('./aiHandler');

function socketHandler(io) {
  io.on('connection', (socket) => {
    console.log('We have a new connection!!!');

    socket.on('join', ({ name, room }, callback) => {
      console.log('JOIN received from client:', { name, room }); // 🔹 dodaj log

      const username = checkUser(getUsersInRoom(room), name);
      const { error, user } = addUser({ id: socket.id, name: username, room });
      console.log('User after addUser:', user); // 🔹 dodaj log

      if (error) return callback({ error: 'Error ocurred' });

      socket.join(user.room);

      socket.emit('message', {
        user: 'admin',
        text: `${user.name}, welcome to the room ${
          user.room
        } \n Users in the room: ${getUsersInRoomText(user.room)}`,
      });

      console.log(`getuserinroom: ${getUsersInRoomText(user.room)}`);

      socket.broadcast
        .to(user.room)
        .emit('message', { user: 'admin', text: `${user.name} has joined!` });

      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });

      callback();
    });

    socket.on('sendMessage', async (message, callback) => {
      const user = getUser(socket.id);
      if (user) {
        io.to(user.room).emit('message', {
          user: user.name,
          text: `${message}`,
        });
        await handleAIMessage(user, message, io);
      }
      callback();
    });

    socket.on('disconnect', () => {
      const user = removeUser(socket.id);

      if (user) {
        io.to(user.room).emit('message', {
          user: 'admin',
          text: `${user.name} has left`,
        });
      }
      console.log(user);
      console.log('User had left!!!');
    });
  });
}

module.exports = socketHandler;
