require('dotenv').config();
const express = require("express");
const public = require("./routes/public");
const private = require("./routes/private");
const auth = require("./middlewares/auth");
const cors = require('cors');


const app = express();

app.use(cors({
  origin: process.env.ALLOWED_PROJECT,
  credentials: true
}));

app.use(express.json());
app.use('/public', public);
app.use(auth);
app.use('/restaurant', private);

module.exports = app;