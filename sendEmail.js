const express = require("express");
const bodyParser = require("body-parser");
const nodeMailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/sendmail", (req, res) => {
    const { to, subject, text } = req.body;

    // Create Nodemailer transporter
    const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: "libinseban97@gmail.com",
            pass: process.env.APP_SPECIFIC_PASSWORD,
        },
        debug: process.env.NODE_ENV !== "production" ? true : false,
    });

    const mailOptions = {
        from: "libinseban97@gmail.com",
        to: "libinseban01@gmail.com",
        subject: "Nodemailer Assignment",
        text: "Successfully sended messege through nodemailer",
    };

    // Send the email
    transporter.sendMail(mailOptions, function (err, val) {
        if (err) {
            console.error("Error occurred:", err);
            return res.status(500).json({ error: err.message || "An error occurred while sending the email." });
        } else {
            console.log("Email sent:", val.response);
            return res.json({ message: "Email sent successfully." });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
