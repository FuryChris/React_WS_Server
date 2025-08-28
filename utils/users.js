const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (!name || !room) return { error: 'Username and room are required.' };
  if (existingUser) return { error: 'Username is taken.' };

  const user = { id, name, room };

  users.push(user);

  return { user };
};

const checkUser = (users, name) => {
  // Sprawdź, czy użytkownik o podanej nazwie już istnieje
  console.log(`checkuser start. Nazwa która widoczna jest u nas ${name}`);
  const existingUser = users.find((user) => user.name === name);
  if (existingUser) {
    // Jeśli tak, przypisz mu unikalną nazwę "UserX"
    let i = 1;
    while (users.find((user) => user.name === `${name}${i}`)) {
      i++;
    }
    console.log(`checkuser end. Nazwa która zwracana jest u nas ${name}`);
    return `${name}${i}`;
  } else {
    // Jeśli nie, zwróć podaną nazwę
    console.log(`checkuser end. Nazwa która zwracana jest u nas ${name}`);
    return name;
  }
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const getUsersInRoomText = (room) => {
  const userObj = getUsersInRoom(room);
  const names = userObj.map((user) => user.name);
  return (
    names.slice(0, -1).join(', ') +
    (names.length > 1 ? ', ' : '') +
    names.slice(-1)
  );
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  getUsersInRoomText,
  checkUser,
};
