export const emailTemplates = {
    welcomeEmail: (name) => `
        <h1>Welcome to Subscription Tracker, ${name}!</h1>
        <p>We're excited to have you on board. Start tracking your subscriptions easily and efficiently.</p>
        <p>Best regards,<br/>The Subscription Tracker Team</p>
    `,
    passwordReset: (name, resetLink) => `
        <h1>Password Reset Request</h1>
        <p>Hi ${name},</p>
        <p>We received a request to reset your password. Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Best regards,<br/>The Subscription Tracker Team</p>
    `,
    subscriptionReminder: (name, subscriptionName, renewalDate) => `
        <h1>Subscription Renewal Reminder</h1>
        <p>Hi ${name},</p>
        <p>This is a reminder that your subscription to ${subscriptionName} will renew on ${renewalDate}.</p>
        <p>Best regards,<br/>The Subscription Tracker Team</p>
    `
};