import React from "react";
import { Button } from "semantic-ui-react";

export default function PaginationV8({ tableInstance }) {
  return (
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
        {[5, 10, 20, 30, 40, 50, 100].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
}
