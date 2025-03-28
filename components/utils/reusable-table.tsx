"use client";
import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

// Skeleton loading row
const SkeletonRow = ({ columns }: { columns: number }) => (
  <tr>
    {Array.from({ length: columns }).map((_, index) => (
      <td
        key={index}
        className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"
      >
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </td>
    ))}
  </tr>
);

interface ReusableTableProps<T> {
  columns: any[];
  data: T[];
  loading: boolean;
  error?: Error | null;
  pageIndex: number;
  setPageIndex: (index: number) => void;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  pageSize: number; // Add pageSize as a prop
  setPageSize: (size: number) => void; // Add setPageSize as a prop
}

export function ReusableTable<T>({
  columns,
  data,
  loading,
  error,
  pageIndex,
  setPageIndex,
  searchTerm,
  onSearchChange,
  pageSize, // Destructure pageSize
  setPageSize, // Destructure setPageSize
}: ReusableTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination: { pageIndex, pageSize } },
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater({
              pageIndex,
              pageSize: table.getState().pagination.pageSize,
            })
          : updater;
      setPageIndex(newState.pageIndex);
    },
  });

  React.useEffect(() => {
    setPageIndex(0);
  }, [pageSize]);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl relative overflow-scroll">
        <header className="px-5 py-4">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">
            items
            <span className="text-gray-400 dark:text-gray-500 font-medium">
              ({data?.length})
            </span>
          </h2>
        </header>
        <div>
          <div className="overflow-x-auto">
            <table className="table-auto w-full dark:text-gray-300">
              <thead className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={`px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap ${
                          header.index === 0
                            ? "sticky left-0 bg-gray-50 dark:bg-gray-900/20 z-20"
                            : ""
                        }`}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                {loading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <SkeletonRow key={index} columns={columns.length} />
                    ))
                  : table.getRowModel().rows.map((row) => (
                      <tr key={row.id}>
                        {row.getVisibleCells().map((cell, index) => (
                          <td
                            key={cell.id}
                            className={`px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap ${
                              index === 0
                                ? "sticky left-0 bg-white dark:bg-gray-800 z-10"
                                : ""
                            }`}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
