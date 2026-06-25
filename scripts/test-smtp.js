const nodemailer = require("nodemailer");
const readline = require("node:readline");

const SMTP_HOST = process.env.SMTP_HOST || "smtp.hostinger.com";
const SMTP_USER = process.env.SMTP_USER || "sales@batumaccess.com";
const SMTP_TO = process.env.SMTP_TO || "sales@batumaccess.com";

function askHidden(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true
    });

    const originalWrite = rl._writeToOutput;
    rl._writeToOutput = function writeToOutput(stringToWrite) {
      if (rl.stdoutMuted) {
        rl.output.write("*");
      } else {
        originalWrite.call(rl, stringToWrite);
      }
    };

    rl.stdoutMuted = true;
    rl.question(question, (answer) => {
      rl.close();
      process.stdout.write("\n");
      resolve(answer.trim().replace(/^["']|["']$/g, ""));
    });
  });
}

async function tryPort(port, password) {
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: SMTP_USER,
      pass: password
    },
    connectionTimeout: 12000,
    greetingTimeout: 12000,
    socketTimeout: 16000
  });

  await transporter.verify();
  await transporter.sendMail({
    from: `"Batum SMTP Test" <${SMTP_USER}>`,
    to: SMTP_TO,
    subject: `Batum SMTP test ${new Date().toISOString()}`,
    text: [
      "This is a Batum Technology SMTP test email.",
      "",
      `SMTP_HOST: ${SMTP_HOST}`,
      `SMTP_USER: ${SMTP_USER}`,
      `SMTP_PORT: ${port}`,
      "",
      "If you received this email, use the same password as SMTP_PASS in Hostinger."
    ].join("\n")
  });
}

async function main() {
  console.log("Batum SMTP test");
  console.log(`Host: ${SMTP_HOST}`);
  console.log(`User: ${SMTP_USER}`);
  console.log(`To:   ${SMTP_TO}`);
  const password = await askHidden("Enter mailbox password for sales@batumaccess.com: ");

  const ports = [465, 587];
  const errors = [];

  for (const port of ports) {
    try {
      console.log(`Testing port ${port}...`);
      await tryPort(port, password);
      console.log(`SUCCESS: SMTP works on port ${port}. Test email sent to ${SMTP_TO}.`);
      console.log("Set Hostinger environment variables exactly like this:");
      console.log(`SMTP_HOST=${SMTP_HOST}`);
      console.log(`SMTP_PORT=${port}`);
      console.log(`SMTP_USER=${SMTP_USER}`);
      console.log("SMTP_PASS=<the same password you just entered>");
      return;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      errors.push(`Port ${port}: ${message}`);
      console.log(`FAILED on port ${port}: ${message}`);
    }
  }

  console.log("");
  console.log("SMTP test failed on all ports.");
  console.log(errors.join("\n"));
  console.log("");
  console.log("If you see 535/authentication failed, reset the mailbox password in Hostinger Email and run this test again.");
  process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
