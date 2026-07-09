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
    `eTicket Receipt, Itinerary and Receipt for Confirmation ${booking.bookingReference}`,
    `<div style="font-family: 'Courier New', Courier, monospace; color: #000; font-size: 11px; max-width: 800px; line-height: 1.4; padding: 20px;">
      <div style="font-size: 12px; font-weight: bold; margin-bottom: 5px;">eTicket Receipt &amp; Itinerary</div>
      <div style="border-top: 3px solid #000; border-bottom: 1px solid #000; margin-bottom: 15px; height: 2px;"></div>
      
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px; font-size: 11px;">
        <tr><td width="100"><strong>From:</strong></td><td>Kramana Airlines &lt;no-reply@kramana.com&gt;</td></tr>
        <tr><td><strong>To:</strong></td><td>${booking.passengerDetails?.name || 'Customer'} &lt;${email}&gt;</td></tr>
        <tr><td><strong>Subject:</strong></td><td>eTicket Receipt, Itinerary and Receipt for Confirmation ${booking.bookingReference}</td></tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 10px;">
        <tr>
          <td style="font-size: 18px; font-weight: bold; font-family: Arial, sans-serif; letter-spacing: 2px;">${(booking.flight?.airline || 'KRAMANA AIRLINES').toUpperCase()}</td>
          <td align="right">
            <div style="font-size: 10px;">Confirmation</div>
            <div style="font-size: 16px; font-weight: bold; font-family: Arial, sans-serif;">${booking.bookingReference}</div>
          </td>
        </tr>
      </table>

      <div style="margin-bottom: 15px;"><strong>Issue Date:</strong> ${new Date().toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</div>

      <div style="border-top: 2px solid #000; margin-bottom: 2px;"></div>
      <div style="border-top: 1px solid #000; margin-bottom: 5px;"></div>
      
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 15px; text-align: left; font-size: 11px;">
        <tr>
          <th>Traveler</th>
          <th>Ticket Number</th>
          <th>Frequent Flyer</th>
          <th>Seats</th>
        </tr>
        <tr>
          <td>${booking.passengerDetails?.name || 'Customer'}<br>ADT</td>
          <td>016${Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')}</td>
          <td>---</td>
          <td>---</td>
        </tr>
      </table>

      <div style="border-top: 2px solid #000; margin-bottom: 2px;"></div>
      <div style="border-top: 1px solid #000; margin-bottom: 5px;"></div>

      <div style="font-weight: bold; margin-bottom: 5px;">FLIGHT INFORMATION</div>
      <table width="100%" cellpadding="2" cellspacing="0" style="margin-bottom: 15px; text-align: left; font-size: 10px;">
        <tr>
          <th width="15%">Day, Date</th>
          <th width="15%">Flight Class</th>
          <th width="30%">Departure City and Time</th>
          <th width="30%">Arrival City and Time</th>
          <th width="10%">Aircraft Meal</th>
        </tr>
        <tr>
          <td>${booking.flight?.date || 'N/A'}</td>
          <td>${booking.flight?.airline || 'N/A'}<br>Economy</td>
          <td>${booking.flight?.from || 'N/A'}<br>${booking.flight?.departureTime || 'TBD'}</td>
          <td>${booking.flight?.to || 'N/A'}<br>${booking.flight?.arrivalTime || 'TBD'}</td>
          <td>737<br>---</td>
        </tr>
      </table>

      <div style="border-top: 2px solid #000; margin-bottom: 2px;"></div>
      <div style="border-top: 1px solid #000; margin-bottom: 5px;"></div>

      <div style="font-weight: bold; margin-bottom: 5px;">FARE INFORMATION</div>
      
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 15px; font-size: 11px;">
        <tr>
          <td width="50%" valign="top">
            <table width="100%" cellpadding="2" cellspacing="0" style="font-size: 11px;">
              <tr><td width="60%"><strong>Fare Breakdown</strong></td><td></td></tr>
              <tr><td>Airfare:</td><td>${((booking.totalAmount || 0) * 0.8).toFixed(2)}</td></tr>
              <tr><td>Taxes &amp; Fees:</td><td>${((booking.totalAmount || 0) * 0.2).toFixed(2)}</td></tr>
              <tr><td><strong>Ticket Total:</strong></td><td><strong>${(booking.totalAmount || 0).toFixed(2)}</strong></td></tr>
            </table>
          </td>
          <td width="50%" valign="top">
            <table width="100%" cellpadding="2" cellspacing="0" style="font-size: 11px;">
              <tr><td><strong>Form of Payment:</strong></td></tr>
              <tr><td>CREDIT CARD</td></tr>
              <tr><td>Last Four Digits: ****</td></tr>
            </table>
          </td>
        </tr>
      </table>
      
      <div style="border-top: 1px dashed #000; margin-bottom: 10px;"></div>
      <div>The eTicket receipt will reflect the ticket total: ${(booking.totalAmount || 0).toFixed(2)}</div>
      
      <div style="border-top: 1px solid #000; margin-top: 15px; padding-top: 10px; font-size: 9px; color: #555;">
        Additional charges may apply for changes in addition to any fare rules stated.<br>
        All charges must be paid prior to the departure date on the ticket file on record.
      </div>
      <div style="border-top: 2px solid #000; margin-top: 5px;"></div>
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
