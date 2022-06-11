const express = require("express");
const cors = require("cors");
const chatRoutes = require("./chatRoutes");
const session = require("express-session");

const app = express();
const database = require("./database");

app.use(express.json());
app.use(cors());
app.use(session({ secret: "foo", resave: false, saveUninitialized: false }));
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Chat service listening on port " + PORT));
