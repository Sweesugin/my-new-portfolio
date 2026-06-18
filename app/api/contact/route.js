import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { name, email, message } = await request.json();

        // Validate fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required.' },
                { status: 400 }
            );
        }

        // Validate environment variables for email
        const EMAIL_USER = process.env.EMAIL_USER;
        const EMAIL_PASS = process.env.EMAIL_PASS;
        if (!EMAIL_USER || !EMAIL_PASS) {
            console.warn('Email credentials missing for contact API');
            return NextResponse.json({ error: 'Email service not configured.' }, { status: 500 });
        }

        // Setup Nodemailer transporter (safe: only when creds present)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS,
            },
        });

        // Email options
        const mailOptions = {
            from: EMAIL_USER,
            to: EMAIL_USER,
            subject: 'New Portfolio Contact Message',
            html: `
                <h3>New message from your portfolio</h3>
                <p><strong>Sender Name:</strong> ${name}</p>
                <p><strong>Sender Email:</strong> ${email}</p>
                <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
            `,
            replyTo: email,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Message sent successfully.' }, { status: 200 });
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
    }
}
