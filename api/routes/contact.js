const express = require("express");
const nodemailer = require("nodemailer");
require('dotenv').config();

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, mail, message } = req.body;

  if (!name || !mail || !message)
    return res.status(400).json({ error: "All fields are required." });

  try {
    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false, // true for 465, false for 587
      auth: {
        user: process.env.MAIL_API,      // your Brevo username
        pass: process.env.MAIL_PASSWORD, // your Brevo API key
      },
    });

    // Send email
    await transporter.sendMail({
      from: mail,                       // visitor email
      to: process.env.MAIL_ADDRESS,     // your receiving email
      subject: `Contact Form Message from ${name}`,
      text: message,
    });

    res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error sending email" });
  }
});

module.exports = router;
