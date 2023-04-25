import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
  createColumnHelper,
} from "@tanstack/react-table";

const Table = ({
  columns,
  data,
  rowClass,
  enableGlobalFilter = false,
  caption = "",
  searchLabel = "Search...",
}) => {
  // Table component logic and UI come here
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columnHelper = createColumnHelper();

  const createColObj = (i) => {
    return columnHelper.accessor(i.id, {
      header: i.label,
      cell: i.render
        ? i.render
        : (cell) => {
            const value = cell.getValue();

            return value;
          },
      enableSorting: i.sorting,
      accessorFn: i.accessorFn,
    });
  };

  const cols = columns?.map((i) => createColObj(i));

  const table = useReactTable({
    data,
    columns: cols,
    state: {
      sorting,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  return (
    <div fluid>
      <div className="align-middle">
        {caption && (
          <div xs="12" md="7" className="p-3">
            <h5 className="font-weight-bold">{caption}</h5>
          </div>
        )}
        {enableGlobalFilter && (
          <div className="d-flex p-3">
            <form>
              <div class="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="floating_email"
                  id="floating_email"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder={searchLabel}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                />
                <label
                  for="floating_email"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Search
                </label>
              </div>
            </form>
            {/* <Form className="align-items-center d-flex w-100">
              <Form.Control
                type="text"
                size="md"
                placeholder={searchLabel}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
              <span className="search-link mt-2 mr-2">
                <SearchIcon />
              </span>
            </Form> */}
          </div>
        )}
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {table.getHeaderGroups()?.map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th scope="col" class="px-6 py-3" key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: "flex items-center",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      <span
                        className={
                          header.id === "id"
                            ? "header-text actions"
                            : "header-text"
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </span>
                      {header.column.getCanSort() && (
                        <>
                          <span className="sort-icons">
                            <a href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-3 h-3 ml-1"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 320 512"
                              >
                                <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                              </svg>
                            </a>
                          </span>
                          <span className="sort-icons-enabled">
                            {{
                              asc: (
                                <i
                                  className="fas fa-long-arrow-alt-up sort-up"
                                  aria-hidden="true"
                                ></i>
                              ),
                              desc: (
                                <i
                                  className="fas fa-long-arrow-alt-down"
                                  aria-hidden="true"
                                ></i>
                              ),
                            }[header.column.getIsSorted()] ?? null}
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel()?.rows.map((row) => {
            const className = rowClass ? rowClass(row) : "";
            return (
              <tr
                key={row.id}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {table.getFooterGroups()?.map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} className={header.className}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
