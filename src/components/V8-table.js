import React, { useState } from "react";
import {
  createTable,
  getCoreRowModel,
  useTableInstance,
} from "@tanstack/react-table";
import Student from "../student.json";
import { format } from "date-fns";
import '../table.css'

const table = createTable();
console.log(table);
const defaultData = [...Student];

const defaultColumns = [
  table.createDataColumn("name", {
    id: "name",
    header: "Full Name",
    footer: "Full Name",
    cell: (row) => row.getValue().toUpperCase(),
  }),
  table.createDataColumn("email", {
    id: "email",
    header: "Email Address",
    footer: "Email Address",
  }),
  table.createDataColumn("phone", {
    id: "phone",
    header: "Phone Number",
    footer: "Phone Number",
  }),
  table.createDataColumn("standard", {
    id: "standard",
    header: "Class",
    footer: "Class",
  }),
  table.createDataColumn("section", {
    id: "section",
    header: "Section",
    footer: "Section",
  }),
  table.createDataColumn("age", {
    id: "age",
    header: "Age",
    footer: "Age",
  }),
  table.createDataColumn("date_of_birth", {
    id: "date_of_birth",
    header: "Date of Birth",
    footer: "Date of Birth",
    cell: (row) => format(new Date(row.getValue()), "dd/MM/yyyy"),
  }),
  table.createDataColumn("date_of_admission", {
    id: "date_of_admission",
    header: "Date of Admission",
    footer: "Date of Admission",
    cell: (row) => format(new Date(row.getValue()), "dd/MM/yyyy"),
  }),
  table.createDataColumn((row) => row.address.city, {
    id: "city",
    header: "City",
    footer: "City",
  }),
  table.createDataColumn((row) => row.address.state, {
    id: "state",
    header: "State",
    footer: "State",
  }),
  table.createDataColumn((row) => row.address.pincode, {
    id: "pincode",
    header: "Pincode",
    footer: "Pincode",
  }),
  table.createDataColumn((row) => row.address.street, {
    id: "street",
    header: "Street",
    footer: "Street",
  }),
  table.createDataColumn((row) => `${row.address.city}, ${row.address.state}`, {
    id: "city_state",
    header: "City State",
    footer: "City State",
  }),
];

export default function V8table() {
  const [data, setData] = useState([...defaultData]);
  const [columns, setColumns] = useState([...defaultColumns]);

  const tableInstance = useTableInstance(table, {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table border={1}>
        <thead>
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : header.renderHeader()}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {tableInstance.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{cell.renderCell()}</td>
              ))}
            </tr>
          ))}
        </tbody>

        <tfoot>
          {tableInstance.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((footer) => (
                <th key={footer.id}>
                  {footer.isPlaceholder ? null : footer.renderFooter()}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}
