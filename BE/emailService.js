import {getClients, getClientsFromDB} from "./getClients.js";
import nodemailer from "nodemailer";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

export default async function emailService(client) {
    if(client == "okss"){
        try {
            const clients = await getClients(client);
            const updatedClients = [];
            for (const client of clients) {
              if (client.active_flag == "1") {
                const subjectGSTR1 = "GSTR-1 Reminder";
                const subjectGSTR3b = "GSTR-3B Reminder";
        
                await sendEmail(client.email, client.email_sent_gst_r1_date, subjectGSTR1, client.mail_body_gst_r1);
                await sendEmail(client.email, client.email_sent_gst_r3b_date, subjectGSTR3b, client.mail_body_gst_r3b);
              }
              updatedClients.push(client);
            }
            console.log(`✅ ${updatedClients.length} clients processed. Reminders sent if due.`);
          } catch (err) {
            console.log(err);
          }
    }
    if(client == "fci"){
        const clients = await getClients(client);
        const updatedClients = [];
        try{
            const emailTemplate = fs.readFileSync('vmplMailBody.txt', 'utf8');
            for (const client of clients) {
                const subject = "Trusted High Security Cable Seals – Supplied Across India";
                const body = emailTemplate.replace('{{customer_name}}', client.customer_name)
                await sendEmailVmpl(client.email, subject, body);
                updatedClients.push(client);
            }
            console.log(`✅ ${updatedClients.length} clients processed. Reminders sent if due.`);
            } catch (err) {
            console.log(err);
            }
    }
    
    if(client == "fciall"){
        const clients = await getClientsFromDB(client);
        const updatedClients = [];
        try{
            const emailTemplate = fs.readFileSync('vmplMailBody.txt', 'utf8');
            for (const client of clients) {
                const subject = "Trusted High Security Cable Seals – Supplied Across India";
                const body = emailTemplate.replace('{{customer_name}}', "FCI ALL")
                await sendEmailVmpl(client.email, subject, body);
                updatedClients.push(client);
            }
            console.log(`✅ ${updatedClients.length} clients processed. Reminders sent if due.`);
            } catch (err) {
            console.log(err);
            }
    }
}

async function sendEmail(email, gstDueDates, subject, body) {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;

  const gstDueDatesList = gstDueDates.split(",").map((d) => d.trim());

  for (const date of gstDueDatesList) {
    let [d, m] = date.split("-");
    d = d * 1;
    m = m * 1;
    if (d === day && m === month) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        text: body,
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent to ${email}: ${info.response}`);
      } catch (err) {
        console.log(
          `❌ Failed to send email to ${email} on:`,
          err.message
        );
      }
    }
  }
}

async function sendEmailVmpl(email, subject, body) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        text: body,
      };   
      
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log("sent");
        console.log(`✅ Email sent to ${email}: ${info.response}`);
      } catch (err) {
        console.log(
          `❌ Failed to send email to ${email} on:`,
          err.message
        );
      }
  }
