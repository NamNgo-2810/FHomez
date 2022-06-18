const mongoose = require("mongoose");
require("dotenv").config();

mongoDBConnect();

async function mongoDBConnect() {
    try {
        mongoose.connect(
            process.env.MONGO_URI,
            { useNewUrlParser: true, useUnifiedTopology: true },
            () => {
                console.log("MongoDB connected success");
            }
        );
    } catch (error) {
        console.log(error);
    }
}
