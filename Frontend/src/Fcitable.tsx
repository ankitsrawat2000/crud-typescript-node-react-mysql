import axios from "axios";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { DataTable } from "./components/data-table";
import { fciallColumns } from "./components/columns";  
import type { fciall } from "./components/columns"; 

export default function Fcitable() {
  const [rows, setRows] = useState<fciall[]>([]);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    axios
      .get<fciall[]>(
        "http://localhost:3005/db/data?apiKey=6e71610d-9313-4ace-b6ff-a575f2527d4a&client=fciall"
      )
      .then((response) => {
        setRows(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function insertRow() {
    axios
      .post<fciall>(
        "http://localhost:3005/db/insert/data?apiKey=6e71610d-9313-4ace-b6ff-a575f2527d4a&client=fciall",
        {
          row: { email },
        }
      )
      .then((response) => {
        setRows((prev) => [...prev, response.data]);
        setEmail("");
      });
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function deleteRow(row: fciall) {
    axios
      .delete(
        `http://localhost:3005/db/delete/data/${row.id}?apiKey=6e71610d-9313-4ace-b6ff-a575f2527d4a&client=fciall`
      )
      .then(() => {
        setRows((prev) => prev.filter((r) => r.id !== row.id));
      });
  }

  return (
    <div className="flex flex-col gap-8 p-6 bg-gray-50 min-h-screen">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-4">Client Emails</h2>
        <DataTable
          columns={fciallColumns}
          data={rows.map((row) => ({
            ...row,
            onDelete: deleteRow,
          }))}
        />
      </div>

      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-sm border p-6">
        <h3 className="text-lg font-medium mb-4">Add New Row</h3>
        <div className="flex items-center gap-3">
          <Input
            type="text"
            placeholder="Enter email address"
            onChange={handleChange}
            value={email}
            className="flex-1"
          />
          <Button onClick={insertRow} className="px-6">
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
