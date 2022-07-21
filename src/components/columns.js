import { format } from "date-fns";
import { ColumnFilter } from "./ColumnFilter";

export const COLUMNS = [
  {
    Header: "ID",
    footer: "ID",
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "First Name",
    footer: "First Name",
    accessor: "first_name",
  },
  {
    Header: "Last Name",
    footer: "Last Name",
    accessor: "last_name",
  },
  {
    Header: "Date of Birth",
    footer: "Date of Birth",
    accessor: "date_of_birth",
    Cell: (props) => <span>{format(new Date(props.value), "MM-dd-yyyy")}</span>,
  },
  {
    Header: "Country",
    footer: "Country",
    accessor: "country",
  },
  {
    Header: "Phone",
    footer: "Phone",
    accessor: "phone",
    Filter: ColumnFilter,
  },
];

export const GROUPS_COLUMNS = [
  {
    Header: "ID",
    footer: "ID",
    accessor: "id",
  },
  {
    Header: "Name",
    footer: "Name",
    columns: [
      {
        Header: "First Name",
        footer: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        footer: "Last Name",
        accessor: "last_name",
      },
    ],
  },
  {
    Header: "Info",
    footer: "Info",
    columns: [
      {
        Header: "Date of Birth",
        footer: "Date of Birth",
        accessor: "date_of_birth",
      },
      {
        Header: "Country",
        footer: "Country",
        accessor: "country",
      },
      {
        Header: "Phone",
        footer: "Phone",
        accessor: "phone",
      },
    ],
  },
];
