import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

let db;

try {
  db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });
    console.log('✅ Connected to MySQL database');
} catch (err) {
  console.error('❌ DB connection error:', err.message);
}

export default db;
