"use client";

import Image, { StaticImageData } from "next/image";
import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { GET_ALL_CLIENT_CUSTOMERS } from "@/lib/queries";

export interface Customer {
  id: string;
  image?: StaticImageData; // Optional, as it's missing in the provided data
  name: string;
  email: string;
  phone: string;
  social: string;
  type: string;
  distributor: string; // Add if necessary
  description: string;
  createdAt: string;
}

const columnHelper = createColumnHelper<Customer>();

export default function CustomersTable() {
  const { loading, error, data } = useQuery(GET_ALL_CLIENT_CUSTOMERS);

  // Transform data
  const customers = useMemo(
    () =>
      data?.getAllClientCustomers?.page?.edges.map(
        ({ node }: { node: any }) => ({
          id: node._id,
          name: node.name || "N/A",
          email: node.contact?.email || "N/A",
          phone: node.contact?.phone || "N/A",
          social: node.contact?.social || "N/A",
          type: node.type || "N/A",
          description: node.description || "N/A",
          createdAt: new Date(node.createdAt).toLocaleDateString(),
        })
      ) || [],
    [data]
  );

  // Define columns
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "select",
        header: ({ table }) => (
          <label className="inline-flex">
            <span className="sr-only">Select all</span>
            <input
              type="checkbox"
              checked={table.getIsAllRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
            />
          </label>
        ),
        cell: ({ row }) => (
          <label className="inline-flex">
            <span className="sr-only">Select</span>
            <input
              type="checkbox"
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
            />
          </label>
        ),
      }),
      columnHelper.display({
        id: "favourite",
        header: () => <span className="sr-only">Favourite</span>,
        cell: () => (
          <button>
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path d="M8 0L6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934h-6L8 0z" />
            </svg>
          </button>
        ),
      }),
      columnHelper.accessor("name", {
        header: () => "Name",
        cell: (info) => (
          <div className="flex items-center">
            <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
              <Image
                className="rounded-full"
                src=""
                width={40}
                height={40}
                alt=""
              />
            </div>
            <div className="font-medium text-gray-800 dark:text-gray-100">
              {info.getValue()}
            </div>
          </div>
        ),
      }),
      columnHelper.accessor("email", {
        header: () => "Email",
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
      }),
      columnHelper.accessor("phone", {
        header: () => "Phone",
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
      }),
      columnHelper.accessor("social", {
        header: () => "Social",
        cell: (info) => <div className="text-center">{info.getValue()}</div>,
      }),
      columnHelper.accessor("type", {
        header: () => "Type",
        cell: (info) => (
          <div className="text-left font-medium text-sky-600">
            {info.getValue()}
          </div>
        ),
      }),
      columnHelper.accessor("description", {
        header: () => "Description",
        cell: (info) => (
          <div className="text-left font-medium text-green-600">
            {info.getValue()}
          </div>
        ),
      }),
      columnHelper.accessor("createdAt", {
        header: () => "Date Created",
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
      }),
      columnHelper.display({
        id: "actions",
        header: () => <span className="sr-only">Menu</span>,
        cell: () => (
          <button className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded-full">
            <span className="sr-only">Menu</span>
            <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="2" />
              <circle cx="10" cy="16" r="2" />
              <circle cx="22" cy="16" r="2" />
            </svg>
          </button>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: customers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p>Error fetching customers: {error.message}</p>;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl relative overflow-scroll">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          All Customers{" "}
          <span className="text-gray-400 dark:text-gray-500 font-medium">
            ({customers.length})
          </span>
        </h2>
      </header>
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"
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
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"
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
  );
}
