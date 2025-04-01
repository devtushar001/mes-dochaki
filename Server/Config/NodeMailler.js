import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

export const sendOtpEmail = async (email, otp) => {
    try {
        const mailOptions = {
            from: `tmr908776@gmail.com`,
            to: email,
            subject: "Your OTP Code",
            html: `<h2>Your OTP Code is: <strong>${otp}</strong></h2><p>This OTP will expire in 10 minutes.</p>`
        };
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};
