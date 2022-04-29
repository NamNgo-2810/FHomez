export const config = {
    db: {
        host: "http://tidb.e6c3a535.8a5ae6bc.ap-northeast-1.prod.aws.tidbcloud.com/",
        user: "root",
        password: "FHomez2018",
        database: "test_node",
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
        TWILIO_AUTH_TOKEN: "b52cc8039fd32eaaf9d59b0810d1ee38",
        TWILIO_SERVICE_SID: "VA90e2ee9b4f833f4da59fef79cabe8f5b",
    },
    firebase: {
        API_KEY: "",
        DATABASE_URL: "",
        PROJECT_ID: "",
        STORAGE_BUCKET: "",
        MESSAGEING_SENDER_ID: "",
        APP_ID: "",
        MEASUREMENT_ID: "",
    },
    url: "http://localhost:5000",
};
