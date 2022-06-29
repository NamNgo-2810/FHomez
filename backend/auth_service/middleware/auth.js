const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;
const verify = promisify(jwt.verify).bind(jwt);
require("dotenv").config();

const verifyToken = async (token, secretKey) => {
    try {
        return await verify(token, secretKey);
    } catch (error) {
        console.log(`Error in verify access token: ${error}`);
        return null;
    }
};

const isAuth = async (req, res, next) => {
    const accessTokenFromHeader = req.headers.x_authorization;
    if (!accessTokenFromHeader) {
        return res.status(401).send("Access token not found.");
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const verified = await verifyToken(
        accessTokenFromHeader,
        accessTokenSecret
    );

    if (!verified) {
        return res.status(401).send("Permission denied.");
    }

    return next();
};

module.exports = {
    isAuth: isAuth,
};
