const config = {
    db: {
        host: "localhost",
        user: "root",
        password: "",
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
        FAST_2_API_KEY: "",
    },
    url: "http://localhost:5000",
};

module.exports = config;
