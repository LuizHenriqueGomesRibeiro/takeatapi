require('dotenv').config();
const express = require("express");
const public = require("./routes/public");
const private = require("./routes/private");
const auth = require("./middlewares/auth");

const app = express();

app.use(express.json());
app.use('/public', public);
app.use(auth);
app.use('/private', private);

module.exports = app;