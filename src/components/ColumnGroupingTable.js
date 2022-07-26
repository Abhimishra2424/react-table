import React, { useState } from "react";
import {
  createTable,
  getCoreRowModel,
  useTableInstance,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import Student from "../STUDENT_MOCK.json";
import download from "downloadjs";
import { format } from "date-fns";
import { Table, Grid } from "semantic-ui-react";
import { Button } from "@mui/material";

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

  const [sorting, setSorting] = useState([]);

  const tableInstance = useTableInstance(table, {
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      <Table className="ui called red">
        <thead>
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div onClick={header.column.getToggleSortingHandler()}>
                      {header.renderHeader()}
                      {header.column.getCanSort() ? (
                        <>
                          {{
                            asc: <span>🔼 </span>,
                            desc: <span>🔽</span>,
                          }[header.column.getIsSorted()] ?? " ↕️"}
                        </>
                      ) : null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody
          style={{
            overflow: "auto",
            maxHeight: "500px",
            width: "100%",
            border: "1px solid #ccc",
            borderCollapse: "collapse",
            backgroundColor: "#fff",
            margin: "0",
          }}
        >
          {tableInstance.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{cell.renderCell()}</td>
              ))}
            </tr>
          ))}
        </tbody>

        {/* <tfoot>
          {tableInstance.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((footer) => (
                <th key={footer.id} colSpan={footer.colSpan}>
                  {footer.isPlaceholder ? null : footer.renderFooter()}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </Table>

      {/* create pagination */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Button
          variant="contained"
          onClick={() => tableInstance.setPageIndex(0)}
          disabled={!tableInstance.getCanPreviousPage()}
        >
          {"<<"}
        </Button>
        <Button
          variant="contained"
          onClick={() => tableInstance.previousPage()}
          disabled={!tableInstance.getCanPreviousPage()}
        >
          {"<"}
        </Button>
        <Button
          variant="contained"
          onClick={() => tableInstance.nextPage()}
          disabled={!tableInstance.getCanNextPage()}
        >
          {">"}
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            tableInstance.setPageIndex(tableInstance.getPageCount() - 1)
          }
          disabled={!tableInstance.getCanNextPage()}
        >
          {">>"}
        </Button>
        <span>
          <div>Page</div>
          <strong>
            {tableInstance.getState().pagination.pageIndex + 1} of{" "}
            {tableInstance.getPageCount()}
          </strong>
        </span>
        <span>
          | Go to page:
          <input
            type="number"
            defaultValue={tableInstance.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              tableInstance.setPageIndex(page);
            }}
          />
        </span>
        <select
          value={tableInstance.getState().pagination.pageSize}
          onChange={(e) => {
            tableInstance.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>{tableInstance.getRowModel().rows.length} Rows</div>
    </div>
  );
};

export default ColumnGroupingTable;
