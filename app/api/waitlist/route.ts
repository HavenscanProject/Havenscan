import nodemailer from "nodemailer";
import { appendFileSync } from "fs";
import { join } from "path";

// #region agent log
const logPath = join(process.cwd(), ".cursor", "debug.log");
const log = (data: any) => {
  try {
    const logEntry = JSON.stringify({ ...data, timestamp: Date.now(), sessionId: "debug-session" }) + "\n";
    appendFileSync(logPath, logEntry, { flag: "a" });
    console.log("[DEBUG]", JSON.stringify(data)); // Also log to console for Vercel
  } catch (e) {
    console.log("[DEBUG]", JSON.stringify(data)); // Fallback to console only
  }
};
// #endregion

export async function POST(req: Request) {
  // #region agent log
  log({ location: "route.ts:15", message: "POST request received", hypothesisId: "A,B,C,D,E", data: { hasBody: !!req.body } });
  // #endregion

  try {
    const { email, userType } = await req.json();
    
    // #region agent log
    log({ location: "route.ts:20", message: "Request body parsed", hypothesisId: "A,B,C,D,E", data: { email: email?.substring(0, 5) + "...", userType } });
    // #endregion

    if (!email) {
      // #region agent log
      log({ location: "route.ts:24", message: "Missing email validation failed", hypothesisId: "A,B,C,D,E", data: {} });
      // #endregion
      return new Response(JSON.stringify({ error: "Missing email" }), { status: 400 });
    }

    // #region agent log
    const envCheck = {
      SMTP_HOST: !!process.env.SMTP_HOST,
      SMTP_PORT: !!process.env.SMTP_PORT,
      SMTP_USER: !!process.env.SMTP_USER,
      SMTP_PASS: !!process.env.SMTP_PASS,
      SMTP_SECURE: process.env.SMTP_SECURE,
      EMAIL_FROM: !!process.env.EMAIL_FROM,
    };
    log({ location: "route.ts:32", message: "Environment variables check", hypothesisId: "A", data: envCheck });
    
    // Validate required environment variables
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      const missing = [];
      if (!process.env.SMTP_HOST) missing.push("SMTP_HOST");
      if (!process.env.SMTP_USER) missing.push("SMTP_USER");
      if (!process.env.SMTP_PASS) missing.push("SMTP_PASS");
      log({ location: "route.ts:42", message: "Missing required environment variables", hypothesisId: "A", data: { missing } });
      return new Response(JSON.stringify({ error: "Server configuration error", details: `Missing: ${missing.join(", ")}` }), { status: 500 });
    }
    // #endregion

    const smtpConfig = {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    };

    // #region agent log
    log({ location: "route.ts:45", message: "SMTP config created", hypothesisId: "B", data: { host: smtpConfig.host, port: smtpConfig.port, secure: smtpConfig.secure, hasUser: !!smtpConfig.auth.user, hasPass: !!smtpConfig.auth.pass } });
    // #endregion

    const transporter = nodemailer.createTransport(smtpConfig);

    const from = process.env.EMAIL_FROM || process.env.SMTP_USER || "no-reply@example.com";

    // #region agent log
    log({ location: "route.ts:52", message: "Email from address determined", hypothesisId: "A,B", data: { from } });
    // #endregion

    const mailOptions = {
      from,
      to: "skywardeagles3@gmail.com",
      subject: "New HavenScan Waitlist Signup",
      text: `A user signed up for the waitlist for HavenScan!\n\nEmail: ${email}\nUser type: ${userType || "N/A"}`,
      html: `<p>A user signed up for the waitlist.</p><p><strong>Email:</strong> ${email}</p><p><strong>User type:</strong> ${userType || "N/A"}</p>`,
    } as any;

    // #region agent log
    log({ location: "route.ts:61", message: "About to send email", hypothesisId: "B,C,E", data: { to: mailOptions.to, from: mailOptions.from } });
    // #endregion

    await transporter.sendMail(mailOptions);

    // #region agent log
    log({ location: "route.ts:65", message: "Email sent successfully", hypothesisId: "B,C,E", data: {} });
    // #endregion

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err: any) {
    // #region agent log
    log({ location: "route.ts:70", message: "Error caught", hypothesisId: "A,B,C,D,E", data: { errorMessage: err?.message, errorCode: err?.code, errorStack: err?.stack?.substring(0, 200) } });
    // #endregion
    // console.error("/api/waitlist error:", err);
    // return new Response(JSON.stringify({ error: "Server error", details: process.env.NODE_ENV === "development" ? err?.message : undefined }), { status: 500 });
  }
}
