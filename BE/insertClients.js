import db from "./db";

export async function insertfcidata(){
    const insertRow = `INSERT INTO fcidata (email) VALUES (?)`;
    await db.query(insertRow);
}