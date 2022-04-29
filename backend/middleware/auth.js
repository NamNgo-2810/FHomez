const jwtHelper = require("../helpers/jwt.helper");
const config = require("../config");
const database = require("../services/user.database");

const isAuth = async (req, res, next) => {
    const accessTokenFromHeader = req.headers.x_authorization;
    if (!accessTokenFromHeader) {
        return res.status(401).send("Access token not found.");
    }

    const accessTokenSecret = config.auth.ACCESS_TOKEN_SECRET;
    const verified = await jwtHelper.verifyToken(
        accessTokenFromHeader,
        accessTokenSecret
    );

    if (!verified) {
        return res.status(401).send("Permission denied.");
    }

    const user = await database.getUserByPhoneNumber(
        verified.payload.phoneNumber
    );
    req.user = user;

    return next();
};

module.exports = {
    isAuth: isAuth,
};
