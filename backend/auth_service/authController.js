const jwtHelper = require("./helpers/jwt.helper");
const twofaHelper = require("./helpers/2fa.helper");
const database = require("./user.database");
const bcrypt = require("bcryptjs");
const randToken = require("rand-token");
require("dotenv").config();

exports.signup = async (req, res) => {
    console.log("Signup");
    try {
        const { username, phoneNumber, password } = req.body.username;
        const exist = await database.getUserByPhoneNumber(phoneNumber);

        if (exist !== null) {
            return res.send("Phone number existed");
        }

        const formattedPhoneNumber = "+84" + phoneNumber.substring(1);

        const sendOTPToken = await twofaHelper.sendOTPToken(
            formattedPhoneNumber
        );

        if (!sendOTPToken) {
            return res.send("OTP sent failed. Try again");
        }

        req.session.username = username;
        req.session.phoneNumber = phoneNumber;
        req.session.password = password;

        return res.status(200).send("OTP sent success");
    } catch (error) {
        console.log(error);
    }
};

exports.OTPverifier = async (req, res) => {
    try {
        const phoneNumber = req.session.phoneNumber || req.body.phoneNumber;
        const hashPassword = bcrypt.hashSync(req.session.password);
        const otpToken = req.body.OTPtoken;
        const isValid = await twofaHelper.verifyOTPToken(phoneNumber, otpToken);

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
        if (!(phoneNumber && password)) {
            return res.status(400).send("All input is required");
        }
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

        return res.json({
            accessToken,
            refreshToken,
            user,
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
