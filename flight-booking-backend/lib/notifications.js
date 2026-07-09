import nodemailer from "nodemailer";
import twilio from "twilio";

// Initialize Twilio Client (will gracefully fail/mock if env vars are missing)
const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

// Initialize Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.ethereal.email",
  port: process.env.SMTP_PORT || 587,
  auth: {
    user: process.env.SMTP_USER || "dummy_user",
    pass: process.env.SMTP_PASS || "dummy_pass",
  },
});

/**
 * Dispatch Email safely
 */
const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: '"Kramana Alerts" <no-reply@kramana.com>',
    to,
    subject,
    html,
  };

  try {
    if (process.env.SMTP_HOST) {
      await transporter.sendMail(mailOptions);
      console.log(`Email dispatched to ${to} [Subject: ${subject}]`);
    } else {
      console.log(`[MOCK EMAIL] To: ${to} | Subject: ${subject}`);
    }
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

/**
 * Dispatch SMS safely
 */
const sendSMS = async (to, body) => {
  try {
    if (twilioClient && process.env.TWILIO_PHONE_NUMBER) {
      await twilioClient.messages.create({
        body,
        from: process.env.TWILIO_PHONE_NUMBER,
        to,
      });
      console.log(`SMS dispatched to ${to}`);
    } else {
      console.log(`[MOCK SMS] To: ${to} | Body: ${body}`);
    }
  } catch (error) {
    console.error("Failed to send SMS:", error);
  }
};

/**
 * Triggered when a booking is created
 */
export const sendBookingConfirmation = async (booking) => {
  const email = booking.passengerDetails?.email || "user@example.com";
  const phone = "+1234567890"; // In a real app, pull from booking.passengerDetails.phone

  // Email
  await sendEmail(
    email,
    `Booking Confirmed: ${booking.bookingReference}`,
    `<div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #0A58CA;">Kramana Itinerary</h2>
      <p>Dear ${booking.passengerDetails?.name},</p>
      <p>Your flight has been confirmed. PNR: <strong>${booking.bookingReference}</strong></p>
      <p>Route: ${booking.flight.from} &rarr; ${booking.flight.to}</p>
      <p>Date: ${booking.flight.date}</p>
      <p>Total Paid: ₹${booking.totalAmount}</p>
      <p>Have a great trip!</p>
    </div>`
  );

  // SMS
  await sendSMS(
    phone,
    `Kramana: Booking Confirmed! PNR ${booking.bookingReference} for ${booking.flight.from} to ${booking.flight.to} on ${booking.flight.date}.`
  );
};

/**
 * Triggered when a booking is cancelled
 */
export const sendCancellationNotification = async (booking) => {
  const email = booking.passengerDetails?.email || "user@example.com";
  const phone = "+1234567890";

  // Email
  await sendEmail(
    email,
    `Booking Cancelled: ${booking.bookingReference}`,
    `<div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #e53e3e;">Booking Cancelled</h2>
      <p>Dear ${booking.passengerDetails?.name},</p>
      <p>Your booking with PNR <strong>${booking.bookingReference}</strong> has been successfully cancelled.</p>
      <p>Any applicable refunds will be processed to your original payment method within 5-7 business days.</p>
    </div>`
  );

  // SMS
  await sendSMS(
    phone,
    `Kramana: Your booking PNR ${booking.bookingReference} has been cancelled. Refunds will be processed shortly.`
  );
};

/**
 * Triggered by cron job 24-48 hours before flight
 */
export const sendFlightReminder = async (booking) => {
  const email = booking.passengerDetails?.email || "user@example.com";
  const phone = "+1234567890";

  // Email
  await sendEmail(
    email,
    `Flight Reminder: Your trip to ${booking.flight.to} is approaching!`,
    `<div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #f59e0b;">Upcoming Flight Reminder</h2>
      <p>Dear ${booking.passengerDetails?.name},</p>
      <p>This is a reminder that your flight <strong>${booking.bookingReference}</strong> from ${booking.flight.from} to ${booking.flight.to} departs soon!</p>
      <p>Date: ${booking.flight.date}</p>
      <p>Please remember to complete web check-in and arrive at the airport 2 hours before departure.</p>
    </div>`
  );

  // SMS
  await sendSMS(
    phone,
    `Kramana Reminder: Your flight to ${booking.flight.to} (PNR: ${booking.bookingReference}) is coming up soon. Remember to web check-in!`
  );
};

/**
 * Triggered when a hotel booking is created
 */
export const sendHotelBookingConfirmation = async (booking) => {
  const email = booking.guestDetails?.email || "user@example.com";
  const phone = booking.guestDetails?.phone || "+1234567890";

  // Email
  await sendEmail(
    email,
    `Hotel Booking Confirmed: ${booking.bookingReference}`,
    `<div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #0A58CA;">Kramana Hotel Itinerary</h2>
      <p>Dear ${booking.guestDetails?.name || "Guest"},</p>
      <p>Your hotel has been confirmed. Booking Reference: <strong>${booking.bookingReference}</strong></p>
      <p>Hotel: ${booking.hotelName}</p>
      <p>Check-In: ${new Date(booking.checkIn).toLocaleDateString()}</p>
      <p>Check-Out: ${new Date(booking.checkOut).toLocaleDateString()}</p>
      <p>Total Paid: ₹${booking.totalAmount}</p>
      <p>Enjoy your stay!</p>
    </div>`
  );

  // SMS
  await sendSMS(
    phone,
    `Kramana: Hotel Booking Confirmed! Ref ${booking.bookingReference} for ${booking.hotelName} from ${new Date(booking.checkIn).toLocaleDateString()} to ${new Date(booking.checkOut).toLocaleDateString()}.`
  );
};
