import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendVerificationEmail(email: string, token: string) {
  const confirmUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev", // todo: change to domain
    to: email, //test
    subject: "Verify your email",
    html: `
      <p>Click the link below to verify your email:</p>
      <a href="${confirmUrl}">${confirmUrl}</a>
    `,
  });
}
