let allUsers = [];

const userController = {
    addUser: (id, username, room) => {
        const user = {id, username, room};
        allUsers = [...allUsers, user];
        return user;
    },

    roomMembers: (roomId) => {
        const members = allUsers.filter(user => user.room === roomId);
        return members;
    },

    disconnectUser: (id) => {
        const candidate = allUsers.find(user => user.id === id);
        allUsers = allUsers.filter(user => user.id !== id);
        return candidate;
    }
}

export default userController;