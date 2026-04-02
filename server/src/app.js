const express = require("express");
const app = express();

app.use(express.json());

// Routes
// app.use("/api/users", require("./routes/user.routes"));
// app.use("/api/records", require("./routes/record.routes"));
// app.use("/api/dashboard", require("./routes/dashboard.routes"));

module.exports = app;