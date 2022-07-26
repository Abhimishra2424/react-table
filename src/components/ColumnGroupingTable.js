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
import { Table, Container } from "semantic-ui-react";

import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

import PaginationV8 from "./PaginationV8";
import ColumnVisibilityV8 from "./ColumnVisibilityV8";

const table = createTable();

const defaultData = [...Student];

const defaultColumns = [
  table.createDisplayColumn({
    id: "action",
    cell: (props) => {
      return (
        <IconButton
          color="primary"
          aria-label="add to shopping cart"
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
          <DownloadIcon />
        </IconButton>
      );
    },
  }),
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
];

const ColumnGroupingTable = () => {
  const [data, setData] = useState([...defaultData]);
  const [columns, setColumns] = useState([...defaultColumns]);

  const [sorting, setSorting] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [open, setOpen] = useState(false);

  const tableInstance = useTableInstance(table, {
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <Container>
      <div>
        <div className="table-c">
          <Table className="ui">
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
                              {
                                {
                                  asc: <span>🔼 </span>,
                                  desc: <span>🔽</span>,
                                }[header.column.getIsSorted()]
                              }
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
                  <div>
                    {
                      <IconButton
                        color="primary"
                        aria-label="add to shopping cart"
                        onClick={() => setOpen(true)}
                      >
                        <SettingsIcon />
                      </IconButton>
                    }
                  </div>
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
        </div>

        {/* pagination */}
        <PaginationV8 tableInstance={tableInstance} />

        {/* column visibility  */}
        <ColumnVisibilityV8
          setOpen={setOpen}
          open={open}
          tableInstance={tableInstance}
          handleClose={handleClose}
        />
      </div>
    </Container>
  );
};

export default ColumnGroupingTable;
