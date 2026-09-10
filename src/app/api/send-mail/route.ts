import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, message: 'Invalid payload structure' },
        { status: 400 }
      );
    }

    const { name, email, message } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > 100) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid name (1-100 characters)' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim()) || email.length > 150) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0 || message.length > 5000) {
      return NextResponse.json(
        { success: false, message: 'Please provide a message (1-5000 characters)' },
        { status: 400 }
      );
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const emailTo = process.env.EMAIL_TO || emailUser;

    if (!emailUser || !emailPass) {
      console.warn('Mail transmission skipped: EMAIL_USER or EMAIL_PASS not configured in environment.');
      return NextResponse.json(
        { success: true, message: 'Message received (Demo mode — email configuration pending)' },
        { status: 200 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br/>');

    const mailOptions = {
      from: `"${safeName}" <${emailUser}>`,
      replyTo: safeEmail,
      to: emailTo,
      subject: `💌 New Portfolio Message from ${safeName}`,
      html: `
        <div style="
          background: linear-gradient(135deg, #1E1B2E, #0F172A);
          color: #F3F4F6;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
            font-size: 24px;
            margin-bottom: 20px;
          ">
            ✨ New Message from Portfolio
          </h2>

          <div style="margin-bottom: 20px;">
            <p style="font-size: 15px; line-height: 1.6; margin: 6px 0;">
              <strong style="color: #A855F7;">Sender:</strong> ${safeName}
            </p>
            <p style="font-size: 15px; line-height: 1.6; margin: 6px 0;">
              <strong style="color: #A855F7;">Email:</strong> <a href="mailto:${safeEmail}" style="color:#60A5FA;text-decoration:none;">${safeEmail}</a>
            </p>
          </div>

          <div style="
            background: #111827;
            border-radius: 8px;
            padding: 16px;
            border-left: 4px solid #9333EA;
            margin-bottom: 20px;
          ">
            <p style="font-size: 15px; line-height: 1.8; color: #E5E7EB; margin: 0;">
              ${safeMessage}
            </p>
          </div>

          <p style="text-align:center; font-size:12px; color:#9CA3AF; margin-top: 24px;">
            Transmitted securely via Zayed's Portfolio Contact Form.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: 'Message transmitted successfully' });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, message: 'Transmission failed. Please reach out directly via email.' },
      { status: 500 }
    );
  }
}
