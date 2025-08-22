import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { DataTable } from "./components/data-table";
import { fciColumns } from "./components/columns";
import type { fci } from "./components/columns";

export default function Fci() {
  const [rows, setRows] = useState<fci[]>([]);
  const [email, setEmail] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [remark, setRemark] = useState<string>("");

  useEffect(() => {
    axios
      .get<fci[]>(
        "http://localhost:3005/db/data?apiKey=6e71610d-9313-4ace-b6ff-a575f2527d4a&client=fci"
      )
      .then((response) => {
        const mapped = response.data.map((row: any) => ({
          id: row.id,
          customerName: row.customer_name,
          companyName: row.company_name,
          location: row.location,
          email: row.email,
          mobile: row.mobile,
          remark: row.remark
        }));
        setRows(mapped);
      })
      .catch((err) => console.log(err));
  }, []);

  function insertRow() {
    axios
      .post(
        "http://localhost:3005/db/insert/data?apiKey=6e71610d-9313-4ace-b6ff-a575f2527d4a&client=fci",
        {
          row: {
            customer_name : customerName,
            company_name: companyName,
            location,
            email,
            mobile,
            remark
          },
        }
      )
      .then((response) => {
        const mapped = {
          id: response.data.id,
          customerName: response.data.customer_name,
          companyName: response.data.company_name,
          location: response.data.location,
          email: response.data.email,
          mobile: response.data.mobile,
          remark: response.data.remark
        };
        setRows((prev) => [...prev, mapped]);
        setEmail("");
        setCompanyName("");
        setCustomerName("");
        setLocation("");
        setMobile("");
        setRemark("");
      });
  }

  function deleteRow(row: fci) {
    axios
      .delete(
        `http://localhost:3005/db/delete/data/${row.id}?apiKey=6e71610d-9313-4ace-b6ff-a575f2527d4a&client=fci`
      )
      .then(() => {
        setRows((prev) => prev.filter((r) => r.id !== row.id));
      });
  }

  return (
    <div className="flex flex-col gap-8 p-6 bg-gray-50 min-h-screen">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-4">fci Records</h2>
        <DataTable
          columns={fciColumns}
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
            placeholder="Customer Name"
            onChange={(e) => setCustomerName(e.target.value)}
            value={customerName}
          />
          <Input
            type="text"
            placeholder="Company Name"
            onChange={(e) => setCompanyName(e.target.value)}
            value={companyName}
          />
          <Input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            type="text"
            placeholder="Mobile"
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
          />
          <Input
            type="text"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />
          <Input
            type="text"
            placeholder="Remark"
            onChange={(e) => setRemark(e.target.value)}
            value={remark}
            />
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
