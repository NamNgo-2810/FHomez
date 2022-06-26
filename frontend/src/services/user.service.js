import axiosAuth from "../apiConfig/axiosAuth";

const register = (data) => {
    return axiosAuth.post("signup", data);
};

const verifyOTP = (data) => {
    return axiosAuth.post("verify", data);
};

const login = (data) => {
  return axiosAuth.post("login", data);
};


const getUserById = (id) => {
    return axiosAuth.get("get_user_by_id",{userId: id})
}

const logOut = () => {
    delete localStorage.user
    delete localStorage.jwt
    window.location.reload()
};

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

// Handle all backend api call
export const userService = {
    register,
    login,
    logOut,
    verifyOTP,
    // getAll, // Lấy tất cả bài đăng
    // getById, // Dùng id lấy chi tiết bài đăng
    // update,
    // deleteById: _delete,
    getMessages,
    sendMessages,
};
