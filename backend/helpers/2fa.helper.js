const twilio = require("twilio");
const config = require("../config");

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
    return true;
};

module.exports = {
    sendOTPToken: sendOTPToken,
    verifyOTPToken: verifyOTPToken,
};
