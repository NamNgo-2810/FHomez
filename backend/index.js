const express = require("express");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// require("./routes/authRoute")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Listening on port " + PORT));
