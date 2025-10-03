import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

interface ResetPasswordData {
  email: string;
}

// Function to send a reset password email
async function sendResetPasswordEmail(email: string): Promise<void> {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Replace with your email service
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset Your Password',
      text: 'Click the link below to reset your password:\n\nhttps://www.orignx.com/reset-password',
    };

    await transporter.sendMail(mailOptions);
    console.log('Reset password email sent successfully');
  } catch (error) {
    console.error('Error sending reset password email:', error);
    throw new Error('Failed to send reset password email');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ResetPasswordData;
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await sendResetPasswordEmail(email);
    return NextResponse.json({ message: 'Reset password email sent' }, { status: 200 });
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json(
      { error: 'Failed to send reset password email' },
      { status: 500 }
    );
  }
}
