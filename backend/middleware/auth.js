const jwt = require("jsonwebtoken");
const jwtHelper = require("../helpers/jwt.helper");
const passport = require("passport");
const config = require("../config");
const database = require("../services/database");

const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: config.auth.GOOGLE_CLIENT_ID,
            clientSecret: config.auth.GOOGLE_CLIENT_SECRET,
            callbackURL: config.url + "/auth/google/callback",
            passReqToCallback: true,
        },
        function (req, accessToken, refreshToken, profile, done) {}
    )
);

exports.isAuth = async (req, res, next) => {
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
};
