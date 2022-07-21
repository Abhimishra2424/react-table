import logo from "./logo.svg";
import "./App.css";
import { BasicTable } from "./components/BasicTable";
import { SortingTable } from "./components/SortingTable";

function App() {
  return (
    <div className="App">
      {/* <BasicTable /> */}
      <SortingTable />
    </div>
  );
}

export default App;
