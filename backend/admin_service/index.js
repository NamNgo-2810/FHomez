const express = require("express");
const cors = require("cors");
const adminRoutes = require("./adminRoutes");
const session = require("express-session");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(session({ secret: "foo", resave: true, saveUninitialized: true }));
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Admin service listening on port " + PORT));
