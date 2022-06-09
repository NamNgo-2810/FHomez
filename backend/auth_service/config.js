const config = {
    db: {
        host: "tidb.e6c3a535.8a5ae6bc.ap-northeast-1.prod.aws.tidbcloud.com",
        user: "root",
        password: "FHomez2018",
        database: "testt",
        port: "4000",
    },
    auth: {
        TOKEN_KEY: "namdeptrai",
        ACCESS_TOKEN_LIFE: 10,
        ACCESS_TOKEN_SECRET: "vjppro2000",
        REFRESH_TOKEN_LIFE: "",
        REFRESH_TOKEN_SECRET: "",
        REFRESH_TOKEN_SIZE: 20,
        SALT: 12,
    },
    twilio: {
        TWILIO_ACCOUNT_SID: "ACef793fbcbcc837292304e307da84021a",
        TWILIO_AUTH_TOKEN: "4909512d27aad300d9f09ae918af8dbf",
        TWILIO_SERVICE_SID: "VA90e2ee9b4f833f4da59fef79cabe8f5b"
    },
    url: "http://localhost:8000",
};

module.exports = config;
