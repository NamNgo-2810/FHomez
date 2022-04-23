const otplib = require("otplib");
const fast2sms = require("fast-two-sms");
const config = require("../config");
const { authenticator } = otplib;

const generateUniqueSecret = () => {
    return authenticator.generateSecret();
};

const generateOTPToken = (phoneNumber, service, secret) => {
    return authenticator.keyuri(phoneNumber, service, secret);
};

const sendOTPToken = (phoneNumber, OTPToken, res) => {
    const option = {
        authorization: config.auth.FAST_2_API_KEY,
        message: `Your OTP for FHomez: ${OTPToken}`,
        number: phoneNumber,
    };

    fast2sms
        .sendMessage(option)
        .then(() => {
            res.send("SMS OTP code sent successfully");
        })
        .catch(res.send("Something wrong. Try again"));
};

const verifyOTPToken = (token, secret) => {
    return authenticator.verify({ token, secret });
};

module.exports = {
    generateUniqueSecret: generateUniqueSecret,
    generateOTPToken: generateOTPToken,
    sendOTPToken: sendOTPToken,
    verifyOTPToken: verifyOTPToken,
};
