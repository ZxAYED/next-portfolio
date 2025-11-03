'use server'
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_TO,
    subject: `💌 New Message from ${name}`,
    html: `
  <div style="
    background: linear-gradient(135deg, #1E1B2E, #0F172A);
    color: #F3F4F6;
    font-family: 'Segoe UI', sans-serif;
    padding: 30px;
    border-radius: 12px;
    border: 1px solid #9333EA33;
    max-width: 600px;
    margin: 20px auto;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  ">
    <h2 style="
      text-align: center;
      background: linear-gradient(90deg, #9333EA, #3B82F6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 26px;
      margin-bottom: 20px;
    ">
      ✨ You’ve got a new message!
    </h2>

    <div style="margin-bottom: 20px;">
      <p style="font-size: 16px; line-height: 1.6;">
        <strong style="color: #A855F7;">Name:</strong> ${name}<br/>
        <strong style="color: #A855F7;">Email:</strong> <a href="mailto:${email}" style="color:#60A5FA;text-decoration:none;">${email}</a>
      </p>
    </div>

    <div style="
      background: #111827;
      border-radius: 8px;
      padding: 16px;
      border-left: 4px solid #9333EA;
      margin-bottom: 20px;
    ">
      <p style="font-size: 15px; line-height: 1.8; color: #E5E7EB;">
        ${message}
      </p>
    </div>

    <p style="text-align:center; font-size:13px; color:#9CA3AF;">
      This message was sent via your website contact form.
    </p>
  </div>
  `
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Error sending email' }, { status: 500 });
  }
}
