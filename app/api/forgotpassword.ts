import nodemailer from 'nodemailer';
import { NextApiRequest, NextApiResponse } from 'next';

interface ResetPasswordData {
    email: string;
}

// Function to send a reset password email
export async function sendResetPasswordEmail(email: string): Promise<void> {
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



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email } = req.body as ResetPasswordData;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        try {
            await sendResetPasswordEmail(email);
            return res.status(200).json({ message: 'Reset password email sent' });
        } catch (error) {
            console.error('Error in handler:', error);
            return res.status(500).json({ error: 'Failed to send reset password email' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
