import nodemailer from "nodemailer";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

// Load .env.local manually so this script works identically across environments
const envPath = join(process.cwd(), ".env.local");
if (existsSync(envPath)) {
  const content = readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

console.log("\n=======================================================");
console.log(" 🔍 Portfolio Contact / Nodemailer Diagnostics");
console.log("=======================================================\n");

const user = process.env.EMAIL_USER?.trim();
const pass = process.env.EMAIL_PASS?.trim();
const to = process.env.EMAIL_TO?.trim() || user;
const host = process.env.SMTP_HOST?.trim();
const port = Number(process.env.SMTP_PORT || "587");
const secure = process.env.SMTP_SECURE === "true" || port === 465;

console.log("Current Configuration:");
console.log(`  • EMAIL_USER : ${user || "(not set)"}`);
console.log(`  • EMAIL_PASS : ${pass ? (pass.includes("placeholder") || pass.includes("app_password") ? "⚠️  (placeholder - not yet your real password)" : "******** (" + pass.length + " chars)") : "(not set)"}`);
console.log(`  • EMAIL_TO   : ${to || "(not set)"}`);
console.log(`  • SMTP_HOST  : ${host || "Gmail (built-in service)"}`);
if (host) {
  console.log(`  • SMTP_PORT  : ${port}`);
  console.log(`  • SMTP_SECURE: ${secure}`);
}
console.log("");

if (!user || !pass || pass.includes("placeholder") || pass.includes("app_password")) {
  console.error("❌ ERROR: Missing or placeholder SMTP credentials in .env.local!");
  console.error("\nWhy sending contactinfo emails fails right now:");
  console.error("  In 'src/app/api/send-mail/route.ts', the route checks:");
  console.error("    if (!user || !password) return 503 (form unavailable)");
  console.error("\n👉 How to fix it:");
  console.error("  1. Open Google Account: https://myaccount.google.com/security");
  console.error("  2. Ensure '2-Step Verification' is turned ON.");
  console.error("  3. Go to 'App passwords': https://myaccount.google.com/apppasswords");
  console.error("  4. Generate a new password (select App name: 'Portfolio').");
  console.error("  5. Copy the 16-character code into .env.local for EMAIL_PASS.");
  console.error("  6. Run this script again: npm run debug:mail\n");
  process.exit(1);
}

const transportConfig = host
  ? {
      host,
      port,
      secure,
      auth: { user, pass },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 15000,
    }
  : {
      service: "gmail",
      auth: { user, pass },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 15000,
    };

const transporter = nodemailer.createTransport(transportConfig);

console.log("Testing SMTP connection with nodemailer.verify()...");
try {
  await transporter.verify();
  console.log("✅ SUCCESS: Connected to mail server and authenticated successfully!\n");

  const shouldSend = process.argv.includes("--send");
  if (shouldSend) {
    console.log(`Sending a test message to ${to}...`);
    const info = await transporter.sendMail({
      from: { name: "Portfolio Diagnostic", address: user },
      to,
      subject: "🧪 Portfolio Mail Diagnostic Test",
      text: "This is a verification test from your portfolio development environment. Your Nodemailer contact form configuration is working properly!",
      html: "<p>This is a verification test from your portfolio development environment. <strong>Your Nodemailer contact form configuration is working properly!</strong></p>",
    });
    console.log(`✅ Test email delivered! Message ID: ${info.messageId}`);
  } else {
    console.log("💡 Tip: To send an actual test email to your inbox, run:");
    console.log("   node scripts/debug-mail.mjs --send\n");
  }
} catch (error) {
  console.error("\n❌ SMTP Connection / Authentication Failed:");
  console.error(`  Code   : ${error.code || error.responseCode || "N/A"}`);
  console.error(`  Message: ${error.message}\n`);

  if (error.code === "EAUTH" || (error.message && error.message.includes("Username and Password not accepted"))) {
    console.error("📌 Diagnosis: Authentication rejected by mail server.");
    console.error("   For Gmail accounts, you MUST use a 16-letter App Password, NOT your regular account password.");
    console.error("   Create one at https://myaccount.google.com/apppasswords");
  } else if (error.code === "ETIMEDOUT" || error.code === "ESOCKET") {
    console.error("📌 Diagnosis: Connection timed out.");
    console.error("   Check your internet connection, firewall, or if your network/ISP blocks outbound port 587/465.");
  }
  process.exit(1);
} finally {
  transporter.close();
}
