const mongoose = require("mongoose");
const config = require("./config");

mongoDBConnect();

async function mongoDBConnect() {
    try {
        mongoose.connect(
            config.mongo.URI,
            { useNewUrlParser: true, useUnifiedTopology: true },
            () => {
                console.log("MongoDB connected success");
            }
        );
    } catch (error) {
        console.log(error);
    }
}
