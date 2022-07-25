import React, { useState } from "react";
import {
  createTable,
  getCoreRowModel,
  useTableInstance,
} from "@tanstack/react-table";
import Student from "../STUDENT_MOCK.json";
import download from "downloadjs";
import { format } from "date-fns";

const table = createTable();

const defaultData = [...Student];

const defaultColumns = [
  table.createGroup({
    header: "Full Name",
    columns: [
      table.createDataColumn("firstName", {
        id: "firstName",
      }),
      table.createDataColumn("middleName", {
        id: "middleName",
      }),
      table.createDataColumn("lastName", {
        id: "lastName",
      }),
    ],
  }),
  table.createDataColumn("age", {
    id: "age",
  }),
  table.createGroup({
    header: "Phone Number",
    columns: [
      table.createDataColumn((row) => row.phone[1], {
        id: "phone1",
      }),
      table.createDataColumn((row) => row.phone[2], {
        id: "phone2",
      }),
    ],
  }),
  table.createDataColumn("email", {
    id: "email",
  }),
  table.createGroup({
    header: "Full Address",
    columns: [
      table.createDataColumn((row) => row.address.street, {
        id: "street",
      }),
      table.createDataColumn((row) => row.address.city, {
        id: "city",
      }),
      table.createDataColumn((row) => row.address.pincode, {
        id: "pincode",
      }),
      table.createDataColumn((row) => row.address.state, {
        id: "state",
      }),
    ],
  }),
  table.createGroup({
    header: "Date",
    columns: [
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
    ],
  }),
  table.createDisplayColumn({
    id: "action",
    cell: (props) => {
      return (
        <button
          onClick={() => {
            download(
              props.row
                .getAllCells()
                .map((cell) => cell.getValue())
                .join("\n"),
              `${props.row.getValue("firstName")}`,
              "text/plain"
            );
          }}
        >
          Download
        </button>
      );
    },
  }),
];


const ColumnGroupingTable = () => {
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
                <th key={header.id} colSpan={header.colSpan}>
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
                <th key={footer.id} colSpan={footer.colSpan}>
                  {footer.isPlaceholder ? null : footer.renderFooter()}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default ColumnGroupingTable;
