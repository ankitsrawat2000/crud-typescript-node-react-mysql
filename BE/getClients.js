import fs from "fs";
import csvParser from "csv-parser";
import db from "./db.js";

export async function getClients(client) {
  let file = "";
  if(client == "okss"){
    file = "okss.csv";
  }
  if(client == "fci"){
    file = "fci.csv";
  }
  if(client == "fciall"){
    file = "fciall.csv"
  }
  const clients = [];
  await new Promise((resolve, reject) => {
    fs.createReadStream(file)
      .pipe(csvParser())
      .on("data", (row) => clients.push(row))
      .on("end", resolve)
      .on("error", reject);
  });
  return clients;
}

export async function getClientsFromDB(client) {

    const query = `SELECT * FROM ${client}`;

    const [data] = await db.query(query);

    return data;  
}