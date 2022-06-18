const jwtHelper = require("./helpers/jwt.helper");
const twofaHelper = require("./helpers/2fa.helper");
const database = require("./user.database");
const bcrypt = require("bcryptjs");
const randToken = require("rand-token");
require("dotenv").config();

let data;

exports.signup = async (req, res) => {
    try {
        const { username, phoneNumber, password } = req.body;
        const exist = await database.getUserByPhoneNumber(phoneNumber);

        if (exist !== null) {
            return res.status(400).send("Phone number existed");
        }

        const formattedPhoneNumber = "+84" + phoneNumber.substring(1);

        const sendOTPToken = await twofaHelper.sendOTPToken(
            formattedPhoneNumber
        );

        if (!sendOTPToken) {
            return res.status(400).send("OTP sent failed. Try again");
        }

        data = { username, phoneNumber, password };

        console.log(data);
        return res.status(200).send("OTP sent success");
    } catch (error) {
        console.log(error);
    }
};

exports.OTPverifier = async (req, res) => {
    console.log(data);
    try {
        const username = data.username;
        const phoneNumber = data.phoneNumber;
        const formattedPhoneNumber = "+84" + phoneNumber.substring(1);
        const hashPassword = bcrypt.hashSync(data.password);
        const otpToken = req.body.OTPtoken;
        const isValid = await twofaHelper.verifyOTPToken(
            formattedPhoneNumber,
            otpToken
        );

        if (!isValid) {
            return res.send("Invalid OTP");
        }

        const user = await database.userSignUp(
            username,
            phoneNumber,
            hashPassword
        );

        if (user) {
            return res.status(200).send("Register success");
        } else return res.status(400).send("Something went wrong. Try again");
    } catch (error) {
        console.log(error);
    }
};

exports.login = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;
        const response = await database.userSignIn(phoneNumber, password);

        if (response.status != 200) {
            return res.status(response.status).send(response.message);
        }

        const user = response.body;

        const accessToken = await jwtHelper.generateToken(
            user,
            process.env.ACCESS_TOKEN_SECRET,
            process.env.ACCESS_TOKEN_LIFE
        );

        if (!accessToken) {
            return res.status(401).send("Login failed, please try again");
        }

        let refreshToken = randToken.generate(process.env.REFRESH_TOKEN_SIZE);

        if (!user.refreshToken) {
            await database.updateRefreshToken(phoneNumber, refreshToken);
        } else {
            refreshToken = user.refreshToken;
        }

        const { user_id, username, role } = user;

        return res.json({
            accessToken,
            user: {
                user_id,
                username,
                role
            },
            refreshToken
        });
    } catch (error) {
        console.log(error);
    }
};

exports.refreshToken = async (req, res) => {
    const accessTokenFromHeader = req.headers.x_authorization;
    if (!accessTokenFromHeader) {
        return res.status(400).send("Access token not found");
    }

    const refreshTokenFromBody = req.body.refreshToken;
    if (!refreshTokenFromBody) {
        return res.status(400).send("Refresh token not found");
    }

    const decoded = jwtHelper.decodeToken(
        accessTokenFromHeader,
        process.env.ACCESS_TOKEN_SECRET
    );

    if (!decoded) {
        return res.status(400).send("Invalid access token");
    }

    const phoneNumber = decoded.payload.phoneNumber;
    const user = await database.getUserByPhoneNumber(phoneNumber);
    if (!user) {
        return res.status(401).send("User doesn't exist");
    }

    if (refreshTokenFromBody !== user.refreshToken) {
        return res.status(400).send("Invalid refresh token");
    }

    const dataForAccessToken = { phoneNumber };

    const accessToken = await jwtHelper.generateToken(
        dataForAccessToken,
        process.env.ACCESS_TOKEN_SECRET,
        process.env.ACCESS_TOKEN_LIFE
    );

    if (!accessToken) {
        return res.status(400).send("Access token generate failed, try again");
    }

    return res.json({
        accessToken,
    });
};

exports.getUserById = async (req, res) => {
    try {
        const { userId } = req.body;
        const response = await database.getUserById(userId);

        if (response.status != 200) {
            return res.status(400).send("Bad request");
        }

        const user = response.body;

        return res.json(user);
    } catch (error) {
        console.log(error);
    }
};

exports.updateUserInfo = async (req, res) => {
    try {
        const data = req.body;
        const response = await database.updateUserInfo(data);
    } catch (error) {
        console.log(error);
    }
};
