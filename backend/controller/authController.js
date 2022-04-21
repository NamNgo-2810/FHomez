const config = require("../config");
const jwtHelper = require("../helpers/jwt.helper");
const database = require("../services/user.database");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;
        if (!(phoneNumber && password)) {
            res.status(400).send("All input is required");
        }

        const user = await database.checkUserExist(phoneNumber);

        console.log("User: " + user);

        if (user) {
            res.send("Phone number was registered. Try another");
        } else {
            const hashPassword = bcrypt.hashSync(
                req.body.password,
                config.auth.SALT
            );
            const createUser = await database.userSignUp(
                phoneNumber,
                hashPassword
            );

            // if (!createUser)
            //     return res.status(400).send("Something went wrong. Try again");

            return res.status(200).send("Register success");
        }
    } catch (error) {
        console.log(error);
    }
};

exports.login = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;
        if (!(phoneNumber && password)) {
            res.status(400).send("All input is required");
        }
        const user = await database.userSignIn(phoneNumber, password);

        if (!user) {
            return res.status(401).send("Invalid User");
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send("Wrong password");
        }

        const accessToken = await jwtHelper.generateToken(
            user,
            config.auth.ACCESS_TOKEN_SECRET,
            config.auth.ACCESS_TOKEN_LIFE
        );

        if (!accessToken) {
            return res.status(401).send("Login failed, please try again");
        }

        return res.json({
            accessToken,
            user,
        });
    } catch (error) {
        console.log(error);
    }
};
