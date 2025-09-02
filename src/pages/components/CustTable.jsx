import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

const CustTable = ({ columns, data, actions, rowsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="overflow-x-auto shadow-sm border border-gray-200 bg-white">
      {/* Table */}
      <table className="w-full text-xs md:text-sm text-left text-[#000000]">
        {/* Table Head */}
        <thead className="uppercase border-b bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`p-2 text-nowrap md:px-6 md:py-4 ${
                  col.className || "text-left"
                }`}
              >
                {col.label}
              </th>
            ))}
            {actions?.length > 0 && (
              <th className="p-2 md:px-6 md:py-4">Actions</th>
            )}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {currentData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b last:border-none hover:bg-gray-50"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`p-2 md:px-6 md:py-4 text-nowrap ${col.className}`}
                >
                  {row[col.key]}
                </td>
              ))}
              {actions?.length > 0 && (
                <td className="p-2 md:px-6 md:py-4 flex gap-3">
                  {actions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => action.onClick(row)}
                      title={action.label}
                      className="hover:scale-110 transition-transform"
                    >
                      {action.icon}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}

          {/* Empty state */}
          {currentData.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + (actions?.length > 0 ? 1 : 0)}
                className="text-center py-6 text-gray-500"
              >
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 p-4 border-t">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-sm disabled:opacity-50"
          >
            <ChevronLeft />
          </button>

          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1 rounded-md text-sm border ${
                  currentPage === i + 1
                    ? "bg-primary text-white border-primary"
                    : "hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="text-sm disabled:opacity-50"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default CustTable;
