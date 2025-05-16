const express = require("express");
const private = require("./routes/private");
const public = require("./routes/public");

const app = express();

app.use(express.json());
app.use('/public', public);
app.use('/restaurant', private);

module.exports = app;