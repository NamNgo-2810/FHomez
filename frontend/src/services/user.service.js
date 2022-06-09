// import axiosClient from "./axiosClient";

const getMessages = (sender, receiver) => {
    return [
        {
            text: "Hello there",
            id: "1",
            sender: {
                name: "Ironman",
                uid: "user1",
                avatar: "https://data.cometchat.com/assets/images/avatars/ironman.png",
            },
        },
        {
            text: "Hi Mr. Stark",
            id: "2",
            sender: {
                name: "Spiderman",
                uid: "user2",
                avatar: "https://data.cometchat.com/assets/images/avatars/spiderman.png",
            },
        },
    ];
};

const sendMessages = (sender, receiver, message) => {
    console.log(message);
};



const register = (username, password, rePassword) => {};

const login = (username, password, rePassword) => {};

const logOut = () => {
    delete localStorage.jwt
};



// Handle all backend api call
export const userService = {
    // register,
    // login,
    logOut,
    // verifyOTP,
    // getAll, // Lấy tất cả bài đăng
    // getById, // Dùng id lấy chi tiết bài đăng
    // update,
    // deleteById: _delete,
    getMessages,
    sendMessages,
};