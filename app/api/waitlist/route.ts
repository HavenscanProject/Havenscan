import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email, userType } = await req.json();
    if (!email) {
      return new Response(JSON.stringify({ error: "Missing email" }), { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const from = process.env.EMAIL_FROM || process.env.SMTP_USER || "no-reply@example.com";

    const mailOptions = {
      from,
      to: "skywardeagles3@gmail.com",
      subject: "New Waitlist Signup",
      text: `A user signed up for the waitlist.\n\nEmail: ${email}\nUser type: ${userType || "N/A"}`,
      html: `<p>A user signed up for the waitlist.</p><p><strong>Email:</strong> ${email}</p><p><strong>User type:</strong> ${userType || "N/A"}</p>`,
    } as any;

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error("/api/waitlist error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
