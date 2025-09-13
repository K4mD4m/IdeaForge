import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendVerificationEmail(email: string, token: string) {
  const confirmUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/verify?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev", // todo: change to domain
    to: email, //test
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
     background:#6b21a8; /* ciemny fiolet */
     color:white; 
     text-decoration:none; 
     font-weight:bold; 
     border-radius:12px;
     box-shadow: 0 0 10px #8b5cf6, 0 0 20px #d946ef;">
           Verify Email
        </a>
        <p style="margin-top:30px; font-size:12px; color:#888;">
          If you didn't create an account, you can safely ignore this email.
        </p>
      </div>
    `,
  });
}
