const config = require("../config");
const jwtHelper = require("../helpers/jwt.helper");
const database = require("../services/user.database");
const bcrypt = require("bcryptjs");
const randToken = require("rand-token");

exports.signup = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;
        if (!(phoneNumber && password)) {
            res.status(400).send("All input is required");
        }

        const hashPassword = bcrypt.hashSync(
            req.body.password,
            config.auth.SALT
        );

        const exist = await database.getUserByPhoneNumber(phoneNumber);

        if (exist != null) {
            return res
                .status(400)
                .send("Phone number was registered. Try another");
        }

        const user = await database.userSignUp(phoneNumber, hashPassword);

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
            config.auth.ACCESS_TOKEN_SECRET,
            config.auth.ACCESS_TOKEN_LIFE
        );

        if (!accessToken) {
            return res.status(401).send("Login failed, please try again");
        }

        let refreshToken = randToken.generate(config.auth.REFRESH_TOKEN_SIZE);

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
        config.auth.ACCESS_TOKEN_SECRET
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
        config.auth.ACCESS_TOKEN_SECRET,
        config.auth.ACCESS_TOKEN_LIFE
    );

    if (!accessToken) {
        return res.status(400).send("Access token generate failed, try again");
    }

    return res.json({
        accessToken,
    });
};
