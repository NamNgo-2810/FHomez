const twilio = require("twilio");
const otplib = require("otplib");
const config = require("../config");
const { authenticator } = otplib;

const generateUniqueSecret = () => {
    return authenticator.generateSecret();
};

const generateOTPToken = (phoneNumber, service, secret) => {
    return authenticator.keyuri(phoneNumber, service, secret);
};

const sendOTPToken = async (phoneNumber) => {
    console.log(`Sending to ${phoneNumber}...`);
    const accountSid = config.plugin.TWILIO_ACCOUNT_SID;
    const authToken = config.plugin.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    return client.verify
        .services(config.plugin.TWILIO_SERVICE_SID)
        .verifications.create({ to: phoneNumber, channel: "sms" })
        .then((verification) => {
            console.log(verification.status);
        });
};

const verifyOTPToken = async (phoneNumber, OTPToken) => {
    // return authenticator.verify({ token, secret });
    console.log("Verifying...");
    const accountSid = config.plugin.TWILIO_ACCOUNT_SID;
    const authToken = config.plugin.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    const check = await client.verify
        .services(config.plugin.TWILIO_SERVICE_SID)
        .verificationChecks.create({ to: phoneNumber, code: OTPToken })
        .catch((e) => {
            console.log(e);
        });

    console.log("Verified");
    return check;
};

module.exports = {
    generateUniqueSecret: generateUniqueSecret,
    generateOTPToken: generateOTPToken,
    sendOTPToken: sendOTPToken,
    verifyOTPToken: verifyOTPToken,
};
