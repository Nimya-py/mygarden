import nodemailer from 'nodemailer';

/**
 * Creates nodemailer transporter if SMTP credentials are provided in .env
 */
const createTransporter = () => {
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = process.env;

  if (EMAIL_USER && EMAIL_PASSWORD) {
    const cleanPass = EMAIL_PASSWORD.replace(/["'\s]/g, '');
    const cleanUser = EMAIL_USER.trim();

    if (EMAIL_HOST?.includes('gmail') || cleanUser.endsWith('@gmail.com')) {
      return nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: cleanUser,
          pass: cleanPass,
        },
      });
    }

    return nodemailer.createTransport({
      host: EMAIL_HOST || 'smtp.gmail.com',
      port: Number(EMAIL_PORT) || 587,
      secure: Number(EMAIL_PORT) === 465,
      auth: {
        user: cleanUser,
        pass: cleanPass,
      },
    });
  }

  return null;
};

/**
 * Send Email Verification Email
 */
export const sendVerificationEmail = async ({ to, name, verificationToken }) => {
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  const verificationUrl = `${clientUrl}/admin/verify-email?token=${verificationToken}`;
  const sender = process.env.EMAIL_FROM || '"Kinattukara Nutmeg Nursery" <noreply@kinattukara.com>';

  const subject = 'Verify your Kinattukara Admin Account';
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F7F5EE; margin: 0; padding: 30px; color: #172018; }
          .container { max-width: 580px; margin: 0 auto; background: #FFFFFF; border: 1px solid #D6DDD5; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #0B2115; padding: 32px 24px; text-align: center; color: #F7F5EE; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 2px; }
          .header p { margin: 6px 0 0; font-size: 12px; color: #C4E85A; text-transform: uppercase; letter-spacing: 1px; }
          .content { padding: 32px 30px; font-size: 14px; line-height: 1.6; }
          .greeting { font-size: 16px; font-weight: 600; color: #0B2115; margin-bottom: 12px; }
          .btn-container { text-align: center; margin: 30px 0; }
          .btn { background-color: #163A24; color: #F7F5EE !important; text-decoration: none; padding: 14px 32px; font-size: 13px; font-weight: 700; border-radius: 9999px; display: inline-block; letter-spacing: 1px; text-transform: uppercase; }
          .link-box { background: #FAFBF9; border: 1px solid #E2E8DF; padding: 12px; border-radius: 8px; word-break: break-all; font-size: 11px; color: #526651; margin-top: 15px; }
          .notice { font-size: 12px; color: #768B75; margin-top: 25px; border-top: 1px solid #F0F3EE; padding-top: 16px; }
          .footer { background: #FAFBF9; padding: 18px 24px; font-size: 11px; color: #768B75; text-align: center; border-top: 1px solid #E2E8DF; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>KINATTUKARA</h1>
            <p>Nutmeg Plantation & Nursery • Kerala</p>
          </div>
          <div class="content">
            <div class="greeting">Hello ${name || 'Nursery Administrator'},</div>
            <p>An administrator account has been provisioned for you on the Kinattukara Nursery Management Portal.</p>
            <p>To finalize account security and activate dashboard access, please verify your email address below:</p>
            
            <div class="btn-container">
              <a href="${verificationUrl}" class="btn">Verify Admin Account</a>
            </div>

            <p style="font-size: 12px; color: #526651;">If the button above does not work, copy and paste this verification URL into your browser:</p>
            <div class="link-box">${verificationUrl}</div>

            <div class="notice">
              <strong>Security Notice:</strong>
              <ul>
                <li>This single-use link expires in <strong>24 hours</strong>.</li>
                <li>If you did not expect this invitation, please contact your nursery administrator immediately.</li>
              </ul>
            </div>
          </div>
          <div class="footer">
            © 2026 Kinattukara Nutmeg Plantation & Nursery. Thrissur / Palakkad Highway, Kerala.<br>
            Secure Transactional Security System.
          </div>
        </div>
      </body>
    </html>
  `;

  const transporter = createTransporter();
  if (transporter) {
    await transporter.sendMail({
      from: sender,
      to,
      subject,
      html,
    });
    console.log(`[EMAIL SENT] Verification email sent to ${to}`);
  } else {
    // Development / Local console log fallback
    console.log('\n============================================================');
    console.log('📧 [MOCK EMAIL SERVICE] VERIFICATION EMAIL DISPATCHED');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Direct Verification URL:\n👉 ${verificationUrl}`);
    console.log('============================================================\n');
  }

  return { success: true, verificationUrl };
};

/**
 * Send Password Reset Email
 */
export const sendPasswordResetEmail = async ({ to, name, resetToken }) => {
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  const resetUrl = `${clientUrl}/admin/reset-password?token=${resetToken}`;
  const sender = process.env.EMAIL_FROM || '"Kinattukara Nutmeg Nursery" <noreply@kinattukara.com>';

  const subject = 'Reset Your Kinattukara Admin Password';
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F7F5EE; margin: 0; padding: 30px; color: #172018; }
          .container { max-width: 580px; margin: 0 auto; background: #FFFFFF; border: 1px solid #D6DDD5; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #0B2115; padding: 32px 24px; text-align: center; color: #F7F5EE; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 2px; }
          .header p { margin: 6px 0 0; font-size: 12px; color: #C4E85A; text-transform: uppercase; letter-spacing: 1px; }
          .content { padding: 32px 30px; font-size: 14px; line-height: 1.6; }
          .greeting { font-size: 16px; font-weight: 600; color: #0B2115; margin-bottom: 12px; }
          .btn-container { text-align: center; margin: 30px 0; }
          .btn { background-color: #8C2525; color: #F7F5EE !important; text-decoration: none; padding: 14px 32px; font-size: 13px; font-weight: 700; border-radius: 9999px; display: inline-block; letter-spacing: 1px; text-transform: uppercase; }
          .link-box { background: #FAFBF9; border: 1px solid #E2E8DF; padding: 12px; border-radius: 8px; word-break: break-all; font-size: 11px; color: #526651; margin-top: 15px; }
          .notice { font-size: 12px; color: #768B75; margin-top: 25px; border-top: 1px solid #F0F3EE; padding-top: 16px; }
          .footer { background: #FAFBF9; padding: 18px 24px; font-size: 11px; color: #768B75; text-align: center; border-top: 1px solid #E2E8DF; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>KINATTUKARA</h1>
            <p>Nutmeg Plantation & Nursery • Security System</p>
          </div>
          <div class="content">
            <div class="greeting">Hello ${name || 'Nursery Administrator'},</div>
            <p>We received a request to reset the password for your Kinattukara Nursery administrator account.</p>
            <p>Click the button below to establish a new password:</p>
            
            <div class="btn-container">
              <a href="${resetUrl}" class="btn">Reset Password</a>
            </div>

            <p style="font-size: 12px; color: #526651;">If the button above does not work, copy and paste this reset URL into your browser:</p>
            <div class="link-box">${resetUrl}</div>

            <div class="notice">
              <strong>Security Information:</strong>
              <ul>
                <li>This single-use reset link expires in <strong>60 minutes</strong>.</li>
                <li>Your current password remains unchanged until you create a new one.</li>
                <li>If you did not request this password reset, please ignore this email. Your account remains secure.</li>
              </ul>
            </div>
          </div>
          <div class="footer">
            © 2026 Kinattukara Nutmeg Plantation & Nursery. Thrissur / Palakkad Highway, Kerala.<br>
            Secure Transactional Security System.
          </div>
        </div>
      </body>
    </html>
  `;

  const transporter = createTransporter();
  if (transporter) {
    await transporter.sendMail({
      from: sender,
      to,
      subject,
      html,
    });
    console.log(`[EMAIL SENT] Password reset email sent to ${to}`);
  } else {
    // Development / Local console log fallback
    console.log('\n============================================================');
    console.log('🔑 [MOCK EMAIL SERVICE] PASSWORD RESET EMAIL DISPATCHED');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Direct Password Reset URL:\n👉 ${resetUrl}`);
    console.log('============================================================\n');
  }

  return { success: true, resetUrl };
};

/**
 * Send 6-Digit Login Verification OTP Email
 */
export const sendLoginOtpEmail = async ({ to, name, otp }) => {
  const sender = process.env.EMAIL_FROM || '"Kinattukara Nutmeg Nursery" <noreply@kinattukara.com>';
  const subject = `Your Kinattukara Admin Login OTP: ${otp}`;
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F7F5EE; margin: 0; padding: 30px; color: #172018; }
          .container { max-width: 580px; margin: 0 auto; background: #FFFFFF; border: 1px solid #D6DDD5; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #0B2115; padding: 32px 24px; text-align: center; color: #F7F5EE; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 2px; }
          .header p { margin: 6px 0 0; font-size: 12px; color: #C4E85A; text-transform: uppercase; letter-spacing: 1px; }
          .content { padding: 32px 30px; font-size: 14px; line-height: 1.6; }
          .greeting { font-size: 16px; font-weight: 600; color: #0B2115; margin-bottom: 12px; }
          .otp-box { background: #F0F4EE; border: 2px dashed #163A24; padding: 20px; text-align: center; border-radius: 12px; margin: 24px 0; }
          .otp-code { font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #163A24; font-family: monospace; }
          .notice { font-size: 12px; color: #768B75; margin-top: 25px; border-top: 1px solid #F0F3EE; padding-top: 16px; }
          .footer { background: #FAFBF9; padding: 18px 24px; font-size: 11px; color: #768B75; text-align: center; border-top: 1px solid #E2E8DF; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>KINATTUKARA</h1>
            <p>Admin Two-Factor Authentication • Kerala</p>
          </div>
          <div class="content">
            <div class="greeting">Hello ${name || 'Administrator'},</div>
            <p>You are signing in to the Kinattukara Nursery Portal. Please enter this 6-digit verification code to complete your authentication:</p>
            
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
            </div>

            <p style="font-size: 12px; color: #526651;">This code is valid for <strong>10 minutes</strong>. Do not share this code with anyone.</p>

            <div class="notice">
              <strong>Security Alert:</strong>
              If you did not attempt to sign in to your administrator portal, your password may be compromised. Please reset your password immediately.
            </div>
          </div>
          <div class="footer">
            © 2026 Kinattukara Nutmeg Plantation & Nursery.<br>
            Multi-Factor Administrator Security System.
          </div>
        </div>
      </body>
    </html>
  `;

  const transporter = createTransporter();
  if (transporter) {
    await transporter.sendMail({
      from: sender,
      to,
      subject,
      html,
    });
    console.log(`[EMAIL SENT] Login OTP email sent to ${to}`);
  } else {
    // Development / Local console log fallback
    console.log('\n============================================================');
    console.log('🛡️  [AUTH 2FA SERVICE] LOGIN OTP DISPATCHED');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`6-Digit Login OTP:\n👉  >>> ${otp} <<<`);
    console.log('============================================================\n');
  }

  return { success: true, otp };
};

/**
 * Send 6-Digit One-Time Registration Verification OTP Email
 */
export const sendRegistrationOtpEmail = async ({ to, name, otp }) => {
  const sender = process.env.EMAIL_FROM || '"Kinattukara Nutmeg Nursery" <noreply@kinattukara.com>';
  const subject = `Your Kinattukara Admin Registration OTP: ${otp}`;
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F7F5EE; margin: 0; padding: 30px; color: #172018; }
          .container { max-width: 580px; margin: 0 auto; background: #FFFFFF; border: 1px solid #D6DDD5; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #0B2115; padding: 32px 24px; text-align: center; color: #F7F5EE; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 2px; }
          .header p { margin: 6px 0 0; font-size: 12px; color: #C4E85A; text-transform: uppercase; letter-spacing: 1px; }
          .content { padding: 32px 30px; font-size: 14px; line-height: 1.6; }
          .greeting { font-size: 16px; font-weight: 600; color: #0B2115; margin-bottom: 12px; }
          .otp-box { background: #F0F4EE; border: 2px dashed #163A24; padding: 20px; text-align: center; border-radius: 12px; margin: 24px 0; }
          .otp-code { font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #163A24; font-family: monospace; }
          .notice { font-size: 12px; color: #768B75; margin-top: 25px; border-top: 1px solid #F0F3EE; padding-top: 16px; }
          .footer { background: #FAFBF9; padding: 18px 24px; font-size: 11px; color: #768B75; text-align: center; border-top: 1px solid #E2E8DF; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>KINATTUKARA</h1>
            <p>Admin Registration • Account Activation</p>
          </div>
          <div class="content">
            <div class="greeting">Welcome, ${name || 'Administrator'}!</div>
            <p>You are setting up a new Administrator account for the Kinattukara Nursery Portal. Please enter this 6-digit one-time registration code to verify your email and activate your account:</p>
            
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
            </div>

            <p style="font-size: 12px; color: #526651;">This code is valid for <strong>10 minutes</strong>. Do not share this registration code with anyone.</p>

            <div class="notice">
              <strong>Security Notice:</strong>
              If you did not initiate this account creation, please ignore this email.
            </div>
          </div>
          <div class="footer">
            © 2026 Kinattukara Nutmeg Plantation & Nursery.<br>
            Administrator Onboarding Security System.
          </div>
        </div>
      </body>
    </html>
  `;

  const transporter = createTransporter();
  if (transporter) {
    await transporter.sendMail({
      from: sender,
      to,
      subject,
      html,
    });
    console.log(`[EMAIL SENT] Registration OTP email sent to ${to}`);
  } else {
    // Development / Local console log fallback
    console.log('\n============================================================');
    console.log('🌱 [REGISTRATION OTP SERVICE] ACCOUNT ACTIVATION OTP DISPATCHED');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`6-Digit Registration OTP:\n👉  >>> ${otp} <<<`);
    console.log('============================================================\n');
  }

  return { success: true, otp };
};


