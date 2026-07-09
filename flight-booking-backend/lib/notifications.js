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
    `<div style="font-family: 'Courier New', Courier, monospace; color: #000; font-size: 11px; max-width: 800px; margin: 0 auto; line-height: 1.2; padding: 20px;">
      <div style="font-weight: bold; text-transform: uppercase;">${booking.passengerDetails?.name || 'Unknown Passenger'}</div>
      <div style="border-bottom: 3px solid #000; margin-top: 5px; margin-bottom: 10px;"></div>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px; font-size: 11px;">
        <tr><td width="100"><strong>From:</strong></td><td>${booking.flight?.airline || 'Airline'} &lt;no-reply@${(booking.flight?.airline || 'airline').toLowerCase().replace(/\\s+/g, '')}.com&gt;</td></tr>
        <tr><td><strong>Sent:</strong></td><td>${new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}</td></tr>
        <tr><td><strong>To:</strong></td><td>${booking.passengerDetails?.name || 'Passenger'}, &lt;${email}&gt;</td></tr>
        <tr><td><strong>Subject:</strong></td><td>Ticket itinerary and Receipt for Confirmation ${booking.bookingReference}</td></tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
        <tr>
          <td>
            <span style="color: #002244; font-size: 24px; font-weight: bold; font-family: Arial, sans-serif;">${(booking.flight?.airline || 'AIRLINE').toUpperCase()}</span> 
          </td>
          <td align="right">
            <div style="font-size: 11px;">Confirmation:</div>
            <div style="font-size: 18px; font-weight: bold; font-family: Arial, sans-serif;">${booking.bookingReference}</div>
          </td>
        </tr>
      </table>

      <div style="margin-bottom: 15px;"><strong>Issue Date:</strong> ${new Date().toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'})}</div>

      <div style="border-bottom: 2px solid #000; margin-bottom: 2px;"></div>
      <div style="border-bottom: 1px solid #000; margin-bottom: 5px;"></div>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 15px; text-align: left; font-size: 11px;">
        <tr>
          <th width="25%" style="font-weight: bold;">Traveler</th>
          <th width="25%" style="font-weight: bold;">Ticket Number</th>
          <th width="25%" style="font-weight: bold;">Frequent Flyer</th>
          <th width="25%" style="font-weight: bold;">Seats</th>
        </tr>
        <tr>
          <td style="text-transform: uppercase;">${booking.passengerDetails?.name || 'UNKNOWN PASSENGER'}</td>
          <td>016${Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')}</td>
          <td>---</td>
          <td>---</td>
        </tr>
      </table>

      <div style="border-bottom: 2px solid #000; margin-bottom: 2px;"></div>
      <div style="border-bottom: 1px solid #000; margin-bottom: 5px;"></div>

      <div style="font-weight: bold; margin-bottom: 10px;">FLIGHT INFORMATION</div>
      <table width="100%" cellpadding="5" cellspacing="0" style="margin-bottom: 15px; text-align: left; font-size: 11px;">
        <tr>
          <th width="15%" style="font-weight: bold;">Day, Date</th>
          <th width="15%" style="font-weight: bold;">Flight Class</th>
          <th width="30%" style="font-weight: bold;">Departure City and Time</th>
          <th width="30%" style="font-weight: bold;">Arrival City and Time</th>
          <th width="10%" style="font-weight: bold;">Aircraft Meal</th>
        </tr>
        <tr>
          <td valign="top">${booking.flight?.date || 'Unknown Date'}</td>
          <td valign="top">Economy</td>
          <td valign="top">${booking.flight?.from?.toUpperCase() || 'UNKNOWN'}<br>${booking.flight?.departureTime || 'TBD'}</td>
          <td valign="top">${booking.flight?.to?.toUpperCase() || 'UNKNOWN'}<br>${booking.flight?.arrivalTime || 'TBD'}</td>
          <td valign="top" align="right">---</td>
        </tr>
      </table>
      <div style="font-style: italic; font-size: 11px; margin-top: -10px; margin-bottom: 10px;">Operated by ${booking.flight?.airline || 'Airline'}</div>
      <div style="background-color: #d9d9d9; height: 20px; margin-bottom: 15px;"></div>

      <div style="border-bottom: 2px solid #000; margin-bottom: 2px;"></div>
      <div style="border-bottom: 1px solid #000; margin-bottom: 5px;"></div>

      <div style="font-weight: bold; margin-bottom: 15px;">FARE INFORMATION</div>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px; font-size: 11px;">
        <tr>
          <td width="35%" valign="top">
            <table width="100%" cellpadding="1" cellspacing="0" style="font-size: 11px;">
              <tr><td width="70%"><strong>Fare Breakdown</strong></td><td></td></tr>
              <tr><td>Airfare:</td><td align="right">${(Number(booking.totalAmount || 0) * 0.8).toFixed(2)}</td></tr>
              <tr><td>Taxes &amp; Fees:</td><td align="right">${(Number(booking.totalAmount || 0) * 0.2).toFixed(2)}</td></tr>
              <tr><td>&nbsp;</td><td></td></tr>
              <tr><td><strong>Ticket Total:</strong></td><td align="right"><strong>${Number(booking.totalAmount || 0).toFixed(2)}</strong></td></tr>
            </table>
          </td>
          <td width="30%" valign="top" style="padding-left: 10px;">
            <table width="100%" cellpadding="1" cellspacing="0" style="font-size: 11px;">
              <tr><td><strong>Form of Payment:</strong></td></tr>
              <tr><td>CREDIT CARD</td></tr>
              <tr><td>Last Four Digits: ****</td></tr>
            </table>
          </td>
        </tr>
      </table>

      <div style="margin-bottom: 30px;">The airfare you paid on this itinerary totals: ${Number(booking.totalAmount || 0).toFixed(2)} USD</div>

      <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 11px; margin-bottom: 5px;">
        <tr>
          <td width="80" valign="top">Award Rules:</td>
          <td valign="top">
            Additional charges may apply for changes in addition to any fare rules listed.<br>
            All changes must be made prior to the departure date, or the ticket has no value.
          </td>
        </tr>
      </table>

      <div style="border-bottom: 2px solid #000;"></div>
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
