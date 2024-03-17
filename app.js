const express = require('express');
// const nodemailer = require('nodemailer');
const { default: helmet } = require('helmet');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

module.exports = app;
