import React, { Fragment, useRef, useState } from "react";
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

  const tbodyRef = useRef();
  const outerListRef = useRef(undefined);
  const innerListRef = useRef(undefined);
  const [scrollOffset, setScrollOffset] = useState(0);
  const listHeight = 150;

  const [pageUp, pageDown, home, end] = [33, 34, 36, 35];
  const pageOffset = listHeight * 5;
  const maxHeight =
    (innerListRef.current &&
      innerListRef.current.style.height.replace("px", "")) ||
    listHeight;

  const minHeight = 0.1;
  const keys = {
    [pageUp]: Math.max(minHeight, scrollOffset - pageOffset),
    [pageDown]: Math.min(scrollOffset + pageOffset, maxHeight),
    [end]: maxHeight,
    [home]: minHeight,
  };

  // const handleKeyDown = ({ keyCode }) => {
  //   keys[keyCode] && setScrollOffset(keys[keyCode])
  // }

  const handleKeyDown = (event, ID) => {
    //up and Down key
    const active = document.activeElement;
    active.addEventListener("keydown", function (event) {
      switch (event.key) {
        case "ArrowUp":
          active?.previousElementSibling?.focus();
          event.preventDefault();
          break;
        case "ArrowDown":
          active?.nextElementSibling?.focus();
          event.preventDefault();
          break;
        default:
          break;
      }
    });
  };

  const RenderRow = React.useCallback(
    ({ index, style, isScrolling }) => {
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
          key={row.idx}
          ref={tbodyRef}
          tabIndex={1}
          className="border_bottom"
          onKeyDown={(e) => handleKeyDown(e, row.idx)}
        >
          {isScrolling
            ? "loading........."
            : row.cells.map((cell) => {
                return (
                  <div
                
                    {...cell.getCellProps({
                      style: {
                        ...cell.style,
                        minHeight: "initial",
                        width: cell.column.width,
                      },
                    })}
                  >
                    {cell.render("Cell")}
                  </div>
                );
              })}
          {/* {row.cells.map((cell) => {
            return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
          })} */}
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

        <div {...getTableBodyProps()} ref={tbodyRef}>
          <FixedSizeList
            height={450}
            className="List"
            // outerRef={outerListRef}
            // innerRef={innerListRef}
            // useIsScrolling
            itemCount={rows.length}
            scrollToItem={pageIndex}
            itemSize={50}
            // width={totalColumnsWidth + scrollBarSize}
          >
            {RenderRow}
          </FixedSizeList>
        </div>

        {/* <tbody {...getTableBodyProps()} ref={tbodyRef}>
          {rows?.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.idx} ref={tbodyRef} tabIndex={1} 
              className="border_bottom" 
              onKeyDown={(e) => handleKeyDown(e, row.idx)}>
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

      {/* <div>
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
      </div> */}
    </>
  );
};

export default TableContainer;
