import React, { Fragment } from "react";
import { useTable, useSortBy, useFilters, usePagination, useBlockLayout } from "react-table";
import { Table, Button, Input, Grid, Select } from 'semantic-ui-react'
import { Filter, DefaultColumnFilter } from "./filters";
import { FixedSizeList } from 'react-window'
import scrollbarWidth from './scrollbarWidth';
import { Pagination } from "reactstrap";

const TableContainer = ({ columns, data }) => {
  const scrollBarSize = React.useMemo(() => scrollbarWidth(), [])
  const {
    getTableProps, getTableBodyProps, headerGroups,
    page, // rows, -> we change 'rows' to 'page'
    rows,
    prepareRow,
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
      columns, data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: { pageIndex: 0, pageSize: 10 }
    },
    useFilters, useSortBy, usePagination, useBlockLayout
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  // const onChangeInSelect = (event) => {
  //   setPageSize(Number(event.target.value));
  // };

  // const onChangeInInput = (event) => {
  //   const page = event.target.value ? Number(event.target.value) - 1 : 0;
  //   gotoPage(page);
  // };

  console.log("totalColumnsWidth ==========>", totalColumnsWidth)

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index]
      prepareRow(row)
      return (
        <tr
          {...row.getRowProps({
            style,
          })}
          className="tr"
        >
          {row.cells.map(cell => {
            return (
              <td {...cell.getCellProps()} className="td">
                {cell.render('Cell')}
              </td>
            )
          })}
        </tr>
      )
    },
    [prepareRow, rows]
  )


  return (
    <>
      <Table  {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
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

        {/* <tbody {...getTableBodyProps()}>
          {page.map((row) => {
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

        <div {...getTableBodyProps()}>
          <FixedSizeList
            height={500}
            itemCount={rows.length}
            itemSize={40}
            width={totalColumnsWidth + scrollBarSize}
          >
            {RenderRow}
          </FixedSizeList>
        </div>

        <tfoot>
          {footerGroups.map(group => (
            <tr {...group.getFooterGroupProps()}>
              {group.headers.map(column => (
                <td {...column.getFooterProps()}>{column.render('Footer')}</td>
              ))}
            </tr>
          ))}
        </tfoot>

      </Table>

      <Fragment>
        <Grid columns={6} stackable>
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
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Fragment>
    </>
  );
};

export default TableContainer;
