import React, { Fragment } from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination,
  useBlockLayout,
  ReactTableDefaults,
} from "react-table";
import { Table, Button, Grid } from "semantic-ui-react";
import { Filter, DefaultColumnFilter } from "./filters";
import { FixedSizeList } from "react-window";
import scrollbarWidth from "./scrollbarWidth";

const TableContainer = ({ columns, data }) => {
  const scrollBarSize = React.useMemo(() => scrollbarWidth(), []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    // below new props related to 'usePagination' hook
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    totalColumnsWidth,
    setPageSize,
    footerGroups,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useSortBy,
    usePagination,
    useBlockLayout
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <tr
          {...row.getRowProps({
            style: {
              ...style,
              minHeight: "initial",
              width: totalColumnsWidth,
            },
          })}
        >
          {row.cells.map((cell) => {
            return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
          })}
        </tr>
      );
    },
    [prepareRow, rows, totalColumnsWidth]
  );

  return (
    <>
      <Table
        {...getTableProps()}
        className="table red"
        size="large"
        style={{ border: "solid 2px blue" }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px red",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  <div {...column.getSortByToggleProps()}>
                    {column.render("Header")}
                    {generateSortingIndicator(column)}
                  </div>
                  <Filter column={column} />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <div {...getTableBodyProps()}>
          <FixedSizeList
            height={450}
            itemCount={rows.length}
            scrollToItem={pageIndex}
            itemSize={50}
            // width={totalColumnsWidth + scrollBarSize}
          >
            {RenderRow}
          </FixedSizeList>
        </div>

        {/* <tbody {...getTableBodyProps()}>
          {page?.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody> */}

        <tfoot>
          {footerGroups.map((group) => (
            <tr {...group.getFooterGroupProps()}>
              {group.headers.map((column) => (
                <td {...column.getFooterProps()}>{column.render("Footer")}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </Table>

      {/* <Fragment>
        <Grid columns={6}>
          <Grid.Row>
            <Grid.Column>
              <Button
                color="primary"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                {"<<"}
              </Button>
              <Button
                color="primary"
                onClick={previousPage}
                disabled={!canPreviousPage}
              >
                {"<"}
              </Button>
            </Grid.Column>
            <Grid.Column>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </Grid.Column>
            <Grid.Column>
              <Button
                color="primary"
                onClick={nextPage}
                disabled={!canNextPage}
              >
                {">"}
              </Button>
              <Button
                color="primary"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {">>"}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Fragment> */}

      <div>
        <Button
          color="primary"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </Button>
        <Button
          color="primary"
          onClick={previousPage}
          disabled={!canPreviousPage}
        >
          {"<"}
        </Button>
        <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
          {">"}
        </Button>
        <Button
          color="primary"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </Button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </span>
      </div>
    </>
  );
};

export default TableContainer;
