import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "./ui/button"

export type okss = {
  id: number
  email: string
  gstr1sentdate: string
  gstr3bsentdate: string
  activeflag: boolean
  onDelete?: (row: okss) => void
}

export const columns: ColumnDef<okss>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "gstr1sentdate", header: "GSTR1 Sent Date" },
  { accessorKey: "gstr3bsentdate", header: "GSTR3B Sent Date" },
  { accessorKey: "active_flag", header: "Active", 
    cell: ({ row }) => (row.original.activeflag ? "✅" : "❌") },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const record = row.original
      return (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => record.onDelete?.(record)}
        >
          Delete
        </Button>
      )
    },
  },
]


export type fciall = {
  id: number
  email: string
  onDelete?: (row: fciall) => void
}

export const fciallColumns: ColumnDef<fciall>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "email", header: "Email" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const record = row.original
      return (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => record.onDelete?.(record)}
        >
          Delete
        </Button>
      )
    },
  },
]

export type fci = {
  id: number
  customerName: string
  companyName: string
  location: string
  email: string
  mobile: string
  remark: string
  onDelete?: (row: fci) => void
}

export const fciColumns: ColumnDef<fci>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "customerName", header: "customerName" },
  { accessorKey: "companyName", header: "companyName" },
  { accessorKey: "location", header: "location" },
  { accessorKey: "email", header: "email"}, 
  { accessorKey: "mobile", header: "mobile"},
  { accessorKey: "remark", header: "remark"},
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const record = row.original
      return (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => record.onDelete?.(record)}
        >
          Delete
        </Button>
      )
    },
  },
]
