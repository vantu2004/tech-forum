import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./mailTemplates.js";
import { transporter } from "./smtp.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    await transporter.sendMail({
      from: `"Tech Forum" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Email Verification",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    });
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending verification email to ${email}:`, error);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    await transporter.sendMail({
      from: `"Tech Forum" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Welcome to Our App!",
      html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name).replace(
        "{email}",
        email
      ),
    });
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending welcome email to ${email}:`, error);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    await transporter.sendMail({
      from: `"Tech Forum" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Password Reset",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    });
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending password reset email to ${email}:`, error);
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    await transporter.sendMail({
      from: `"Tech Forum" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });
    console.log(`Password reset success email sent to ${email}`);
  } catch (error) {
    console.error(
      `Error sending password reset success email to ${email}:`,
      error
    );
  }
};
