const express = require('express');
const nodemailer = require('nodemailer');
const { default: helmet } = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

function sendEmail({ name, email, subject, message }) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailConfigs = {
      from: {
        name,
        address: process.env.EMAIL,
      },
      to: process.env.EMAIL,
      subject,
      html: `<p>${message} ${email}</p>`,
    };

    transporter.sendMail(mailConfigs, (error) => {
      if (error) {
        return reject(error);
      }
      return resolve({ message: 'Email sent successfully' });
    });
  });
}

app.post('/contact', async (req, res) => {
  await sendEmail(req.body.params)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

module.exports = app;
