import axiosClient from "../apiConfig/axiosClient";

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

const register = async (username, phoneNumber, password, rePassword) => {
    console.log("Signup");
    try {
        if (password !== rePassword) {
            return false;
        }

        const response = await axiosClient.post(
            "http://localhost:8000/api/auth/signup",
            {
                username: username,
                phoneNumber: phoneNumber,
                password: password,
            }
        );

        return response;
    } catch (error) {
        console.log(error);
    }
};

const login = (username, password, rePassword) => {};

const logOut = () => {
    delete localStorage.jwt;
};

// Handle all backend api call
export const userService = {
    register,
    login,
    logOut,
    // verifyOTP,
    // getAll, // Lấy tất cả bài đăng
    // getById, // Dùng id lấy chi tiết bài đăng
    // update,
    // deleteById: _delete,
    getMessages,
    sendMessages,
};
