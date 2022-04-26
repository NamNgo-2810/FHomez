const express = require("express");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");
const session = require("express-session");

const app = express();

app.use(express.json());
app.use(session({ secret: "foo", resave: false, saveUninitialized: false }));
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);

// require("./routes/authRoute")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Listening on port " + PORT));
