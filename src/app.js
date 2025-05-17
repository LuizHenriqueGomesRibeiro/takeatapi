const express = require("express");
const public = require("./routes/public");
const private = require("./routes/private");

const app = express();

app.use(express.json());
app.use('/public', public);
app.use('/private', private);

module.exports = app;