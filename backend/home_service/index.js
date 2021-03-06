const express = require("express");
const cors = require("cors");
const homeRoutes = require("./homeRoutes");
const session = require("express-session");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(session({ secret: "foo", resave: false, saveUninitialized: false }));
app.use("/api/home", homeRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Home service listening on port " + PORT));
