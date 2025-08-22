import express, { json } from "express";
import dotenv from "dotenv";
import db from "./db.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());

// app.get("/csv/mail/send-reminders", async (req, res) => {
//   const apiKeyFromQuery = req.query.apiKey;
//   const validApiKey = process.env.API_KEY;
//   const client = req.query.client;

//   if (!apiKeyFromQuery || apiKeyFromQuery !== validApiKey) {
//     return res.status(403).json({ message: "Invalid API Key" });
//   }
//   try {
//     await emailService(client);
//     res.send(`✅ clients processed. Reminders sent if due.`);
//   } catch {
//     res.status(500).send("Internal server error while sending reminders.");
//   }
// });

app.get("/db/data", async (req, res) => {
  const apiKeyFromQuery = req.query.apiKey;
  const validApiKey = process.env.API_KEY;
  const client = req.query.client;

  if (!apiKeyFromQuery || apiKeyFromQuery !== validApiKey) {
    return res.status(403).json({ message: "Invalid API Key" });
  }
  const allowedTables = ["fci", "fciall","okss"];
  if (!allowedTables.includes(client)) {
    return res.status(400).json({ message: "Invalid table" });
  }
  const [data] = await db.query(`SELECT * FROM ${client}`);
  res.send(data);
});

app.post("/db/insert/data", async (req, res) => {
  try {
    const { row } = req.body;
    if (!row || !row.email || !row.email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email cannot be empty",
      });
    }
    const apiKeyFromQuery = req.query.apiKey;
    const validApiKey = process.env.API_KEY;
    const client = req.query.client;

    if (!apiKeyFromQuery || apiKeyFromQuery !== validApiKey) {
      return res.status(403).json({ message: "Invalid API Key" });
    }
    const allowedTables = ["fci", "fciall", "okss"];
    if (!allowedTables.includes(client)) {
      return res.status(400).json({ message: "Invalid table" });
    }
    
    let insertQuery, insertValues;

    if (client === "fciall") {
      insertQuery = `INSERT INTO fciall (email) VALUES (?)`;
      insertValues = [row.email.trim()];
    }else if(client === "fci"){
      insertQuery = `INSERT INTO fci (customer_name, company_name, location, email, mobile, remark) VALUES (?, ?, ?, ?, ?, ?)`;
      insertValues = [
        row.customer_name,
        row.company_name,
        row.location,
        row.email,
        row.mobile,
        row.remark
      ];
    }else if (client === "okss") {
      insertQuery = `
        INSERT INTO okss (email, email_sent_gst_r3b_date, email_sent_gst_r1_date, active_flag)
        VALUES (?, ?, ?, ?)
      `;
      insertValues = [
        row.email.trim(),
        row.email_sent_gst_r3b_date || null,
        row.email_sent_gst_r1_date || null,
        row.active_flag ?? 1,
      ];
    }
    const [result] = await db.query(insertQuery, insertValues);
    const [rows] = await db.query(`SELECT * FROM ${client} WHERE id = ?`, [
      result.insertId,
    ]);
    return res.status(201).json(rows[0]);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Database error",
      error: err.message,
    });
  }
});

app.delete("/db/delete/data/:row", (req, res) => {
  try {
    const apiKeyFromQuery = req.query.apiKey;
    const validApiKey = process.env.API_KEY;
    const client = req.query.client;

    if (!apiKeyFromQuery || apiKeyFromQuery !== validApiKey) {
      return res.status(403).json({ message: "Invalid API Key" });
    }
    const allowedTables = ["fci", "fciall", "okss"];
    if (!allowedTables.includes(client)) {
      return res.status(400).json({ message: "Invalid table" });
    }

    const rowId = req.params.row;
    const deleteRow = `DELETE FROM ${client} WHERE id = ?`;

    db.query(deleteRow, [rowId]);
    return res.status(200).json({
      message: "deleted",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ App running on port ${PORT}`);
});
