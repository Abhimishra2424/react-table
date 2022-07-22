import React, { useEffect, useMemo, useState } from "react";
import { Container } from "semantic-ui-react";
// import { BasicTable } from "./components/BasicTable";
// import { SortingTable } from "./components/SortingTable";
// import { FilteringTable } from "./components/filteringTable";
// import { PaginationTable } from "./components/PaginationTable";
import TableContainer from "./TableContainer";
import { SelectColumnFilter } from "./filters";
import { Button } from "@mui/material";

function App() {
  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "name.title",
        disableSortBy: true,
        disableFilters: true,
        width: 100,
      },
      {
        Header: "Age",
        accessor: "registered.age",
        width: 100,
        Footer: (info) => {
          const total = React.useMemo(
            () =>
              info.rows.reduce(
                (sum, row) => row.original.registered.age + sum,
                0
              ),
            [info.rows]
          );
          return (
            <>
              <b>Total</b>: {total}
            </>
          );
        },
      },
      {
        Header: "First Name",
        accessor: "name.first",
        width: 150,
      },
      {
        Header: "Last Name",
        accessor: "name.last",
        width: 150,
      },
      {
        Header: "Email",
        accessor: "email",
        width: 300,
      },
      {
        Header: "City",
        accessor: "location.city",
        width: 150,
      },
      {
        Header: "State",
        accessor: "location.state",
        width: 200,
      },
      {
        Header: "Post Code",
        accessor: "location.postcode",
        width: 100,
      },
      {
        Header: "Action",
        accessor: "",
        width: 100,
        disableSortBy: true,
        disableFilters: true,
        Cell: (info) => {
          return (
            <Button
              onClick={() => {
                // console.log(info.row.original);
                handleEdit(info.row.original);
              }}
            >
              Edit
            </Button>
          );
        },
      },
    ],
    []
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    const doFetch = async () => {
      const response = await fetch("https://randomuser.me/api/?results=100");
      const body = await response.json();
      const contacts = body.results;
      setData(contacts);
    };

    doFetch();
  }, []);

  const handleEdit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <Container
      style={{
        marginTop: "2em",
      }}
    >
      <TableContainer columns={columns} data={data} />
    </Container>
  );
}

export default App;
