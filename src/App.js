import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { Container } from "reactstrap";
// import { BasicTable } from "./components/BasicTable";
// import { SortingTable } from "./components/SortingTable";
// import { FilteringTable } from "./components/filteringTable";
// import { PaginationTable } from "./components/PaginationTable";
import TableContainer from "./TableContainer";
import { SelectColumnFilter } from './filters';

function App() {
  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "name.title",
        Filter: SelectColumnFilter,
        filter: 'equals' 
      },
      {
        Header: "Age",
        accessor: "registered.age",
      },
      {
        Header: "First Name",
        accessor: "name.first",
      },
      {
        Header: "Last Name",
        accessor: "name.last",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "City",
        accessor: "location.city",
      },
      {
        Header: "State",
        accessor: "location.state",
      },
      {
        Header: "Post Code",
        accessor: "location.postcode",
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

  return (
    <Container>
      {/* <BasicTable /> */}
      {/* <SortingTable /> */}
      {/* <FilteringTable /> */}
      {/* <PaginationTable /> */}
      <TableContainer columns={columns} data={data} />
    </Container>
  );
}

export default App;
