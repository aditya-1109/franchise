import nodemailer from "nodemailer";

// Configure transporter 
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can also use SMTP or another service
  auth: {
    user: process.env.EMAIL_USER, //  email address
    pass: process.env.EMAIL_PASSWORD, //  email password
  },
});

// Send email function
export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
