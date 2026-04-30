const express = require("express");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");
const dns = require('dns').promises; // DNS চেক করার জন্য
require('dotenv').config();

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 3, 
  message: { error: "Too many messages. Please try again later." }
});

router.post("/", contactLimiter, async (req, res) => {
  const { name, mail, message } = req.body;

  if (!name || !mail || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // ১. ফরম্যাট চেক
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(mail)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  try {
    // ২. ডোমেইন চেক (নিশ্চিত করে যে ইমেইল সার্ভারটি আসল)
    const domain = mail.split('@')[1];
    const mxRecords = await dns.resolveMx(domain).catch(() => []);
    if (mxRecords.length === 0) {
      return res.status(400).json({ error: "This email domain is not valid or cannot receive emails." });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_APP_PASS,
      },
    });

    console.log("Attempting to send email with the following details:");
    console.log("Name:", name);
    console.log("Email:", mail);
    console.log("Message:", message);
    console.log("Using transporter with user:", process.env.MAIL_USER);
    console.log("Using transporter with pass:", process.env.MAIL_APP_PASS);
    console.log("Sending email to:", process.env.MAIL_RECEIVER);

    const mailOptions = {
      from: `"${name}" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_RECEIVER,
      replyTo: mail,
      subject: `Portfolio Message: ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${mail}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f9f9f9; padding: 15px;">${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Message sent!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email." });
  }
});

module.exports = router;