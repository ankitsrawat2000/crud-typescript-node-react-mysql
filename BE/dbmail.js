import express from 'express';
import fs from 'fs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import db from './db.js';
dotenv.config();

const app = express();
const PORT = 3005;

const emailTemplate = fs.readFileSync('emailTemplate.txt', 'utf8');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.get('/mail/send-reminders', async (req, res) => {
  const today = new Date();
  const day = today.getDate().toString();
  try {
    const [clients] = await db.execute('SELECT * FROM clients');
    for (const client of clients) {
        if(client.active_flag){
            const gstr1DueDates = client.email_sent_gst_r1_date.split(',').map(d => d.trim());
            const isGSTR1ReminderDay = gstr1DueDates.includes(day);
            const gstr3bDueDates = client.email_sent_gst_r3b_date.split(',').map(d => d.trim());
            const isGSTR3BReminderDay = gstr3bDueDates.includes(day);

            if (isGSTR1ReminderDay) {
                const message = getPersonalizedMessage(client, 'Reminder: GSTR-1 filing is due on 11th');
                await sendEmail(client, 'GSTR-1 Reminder', message);
            }

            if (isGSTR3BReminderDay) {
                const message = getPersonalizedMessage(client, 'Reminder: GSTR-3B filing is due on 20th');
                await sendEmail(client, 'GSTR-3B Reminder', message);
            }
        }
        
    }
    res.send({
        message: '✅ Database updated and reminders sent if due.',
        clientsProcessed: clients.length
      });
  } catch (err) {
    console.error('❌ Reminder route error:', err); // Add this
  res.status(500).send('Internal server error while sending reminders.');
  }
 
});

function getPersonalizedMessage(client, reminder_message) {
  return emailTemplate
    .replace('{{client_name}}', client.client_name)
    .replace('{{firm_name}}', client.firm_name)
    .replace('{{gst_number}}', client.gst_number)
    .replace('{{reminder_message}}', reminder_message);
}

async function sendEmail(client, subject, body) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: client.email,
    subject,
    text: body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${client.email}: ${info.response}`);
  } catch (err) {
    console.log(`❌ Failed to send email to ${client.email}:`, err.message);
  }
}

app.listen(PORT, () => {
  console.log(`✅ App running on port ${PORT}`);
});
