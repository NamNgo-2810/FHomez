const twilio = require("twilio");
const config = require("../config");

const sendOTPToken = async (phoneNumber) => {
    console.log(`Sending to ${phoneNumber}...`);
    const accountSid = config.twilio.TWILIO_ACCOUNT_SID;
    const authToken = config.twilio.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    let success = false;

    return client.verify
        .services(config.twilio.TWILIO_SERVICE_SID)
        .verifications.create({ to: phoneNumber, channel: "sms" })
        .then((verification) => {
            success = verification.status === "pending";
        })
        .then(() => {
            return success;
        });
};

const verifyOTPToken = async (phoneNumber, OTPToken) => {
    console.log(`Verifying to ${phoneNumber}...`);
    const accountSid = config.twilio.TWILIO_ACCOUNT_SID;
    const authToken = config.twilio.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);
    let success = false;

    return client.verify
        .services(config.twilio.TWILIO_SERVICE_SID)
        .verificationChecks.create({ to: phoneNumber, code: OTPToken })
        .then((verification_check) => {
            success = verification_check.status === "approved";
        })
        .then(() => {
            return success;
        });
};

module.exports = {
    sendOTPToken: sendOTPToken,
    verifyOTPToken: verifyOTPToken,
};
