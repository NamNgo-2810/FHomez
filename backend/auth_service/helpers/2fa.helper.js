const twilio = require("twilio");
require("dotenv").config();

const sendOTPToken = async (phoneNumber) => {
    console.log(`Sending to ${phoneNumber}...`);
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    let success = false;

    return client.verify
        .services(process.env.TWILIO_SERVICE_SID)
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
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);
    let success = false;

    return client.verify
        .services(process.env.TWILIO_SERVICE_SID)
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
