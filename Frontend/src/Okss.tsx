import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import type { okss } from "./components/columns";

export default function Okss() {
  const [rows, setRows] = useState<okss[]>([]);
  const [email, setEmail] = useState<string>("");
  const [gstr1sentdate, setGstr1sentdate] = useState<string>("");
  const [gstr3bsentdate, setGstr3bsentdate] = useState<string>("");
  const [activeflag, setActiveflag] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get<okss[]>(
        "http://localhost:3005/db/data?apiKey=6e71610d-9313-4ace-b6ff-a575f2527d4a&client=okss"
      )
      .then((response) => {
        const mapped = response.data.map((row: any) => ({
          id: row.id,
          email: row.email,
          gstr1sentdate: row.email_sent_gst_r1_date,
          gstr3bsentdate: row.email_sent_gst_r3b_date,
          activeflag: row.active_flag === 1,
        }));
        setRows(mapped);
      })
      .catch((err) => console.log(err));
  }, []);

  function insertRow() {
    axios
      .post(
        "http://localhost:3005/db/insert/data?apiKey=6e71610d-9313-4ace-b6ff-a575f2527d4a&client=okss",
        {
          row: {
            email,
            email_sent_gst_r1_date: gstr1sentdate || null,
            email_sent_gst_r3b_date: gstr3bsentdate || null,
            active_flag: activeflag ? 1 : 0,
          },
        }
      )
      .then((response) => {
        const mapped = {
          id: response.data.id,
          email: response.data.email,
          gstr1sentdate: response.data.email_sent_gst_r1_date,
          gstr3bsentdate: response.data.email_sent_gst_r3b_date,
          activeflag: response.data.active_flag === 1,
        };
        setRows((prev) => [...prev, mapped]);
        setEmail("");
        setGstr1sentdate("");
        setGstr3bsentdate("");
        setActiveflag(false);
      });
  }

  function deleteRow(row: okss) {
    axios
      .delete(
        `http://localhost:3005/db/delete/data/${row.id}?apiKey=6e71610d-9313-4ace-b6ff-a575f2527d4a&client=okss`
      )
      .then(() => {
        setRows((prev) => prev.filter((r) => r.id !== row.id));
      });
  }

  return (
    <div className="flex flex-col gap-8 p-6 bg-gray-50 min-h-screen">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-4">OKSS Records</h2>
        <DataTable
          columns={columns}
          data={rows.map((row) => ({
            ...row,
            onDelete: deleteRow,
          }))}
        />
      </div>

      <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border p-6">
        <h3 className="text-lg font-medium mb-4">Add New Record</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            type="text"
            placeholder="GSTR1 Sent Date"
            onChange={(e) => setGstr1sentdate(e.target.value)}
            value={gstr1sentdate}
          />
          <Input
            type="text"
            placeholder="GSTR3B Sent Date"
            onChange={(e) => setGstr3bsentdate(e.target.value)}
            value={gstr3bsentdate}
          />
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <input
              type="checkbox"
              checked={activeflag}
              onChange={(e) => setActiveflag(e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-sm font-medium">Active</span>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={insertRow} className="px-6">
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
