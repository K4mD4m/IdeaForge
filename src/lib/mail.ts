import nodemailer from "nodemailer";

export async function sendVerificationEmail(email: string, token: string) {
  const confirmUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/verify?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Verify your email",
    html: `
      <div style="font-family: Arial, sans-serif; background-color:#0a0a0f; color:#e0e0e0; padding:40px; text-align:center;">
        <h1 style="color:#a855f7;">Welcome to IdeaForge! 🎉</h1>
        <p style="font-size:16px; margin-top:20px;">
          Click the button below to verify your email and unlock full access.
        </p>
        <a href="${confirmUrl}" 
           style="display:inline-block; 
                  margin-top:30px; 
                  padding:12px 24px; 
                  background:#6b21a8; 
                  color:white; 
                  text-decoration:none; 
                  font-weight:bold; 
                  border-radius:12px;">
           Verify Email
        </a>
        <p style="margin-top:30px; font-size:12px; color:#888;">
          If you didn't create an account, you can safely ignore this email.
        </p>
      </div>
    `,
  });
}
