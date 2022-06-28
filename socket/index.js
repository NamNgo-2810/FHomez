const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000",
    },
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId == userId);
};

io.on("connection", (socket) => {
    // when connected
    // take userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        console.log("users", users);
        io.emit("getUsers", users);
    });

    // send and get message
    socket.on(
        "sendMessage",
        ({ senderId, receiverId, contentType, content }) => {
            const user = getUser(receiverId);
            console.log("user", user);
            if (user) {
                io.to(user.socketId).emit("getMessage", {
                    senderId,
                    contentType,
                    content,
                });
            }
        }
    );

    // when disconnected
    socket.on("disconnect", () => {
        console.log("An user disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});
