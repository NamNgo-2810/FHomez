const express = require("express");
const cors = require("cors");
const authRoutes = require("./authRoutes");
const session = require("express-session");

const app = express();

app.use(express.json());
app.use(cors());
app.use(session({ secret: "foo", resave: false, saveUninitialized: false }));
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("Auth service listening on port " + PORT));
