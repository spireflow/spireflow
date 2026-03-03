/**
 * XLSX Export Utility
 * Converts generic data arrays into auto-sized Excel spreadsheets
 */

import * as XLSX from "xlsx";

/**
 * Converts camelCase object keys to human-readable "Title Case" headers
 */
const formatHeader = (key: string): string =>
  key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (c) => c.toUpperCase());

/**
 * Exports a typed array of objects to an .xlsx file with auto-sized columns.
 * Uses object keys as column headers and values as row data.
 * Silently skips export when the data array is empty.
 */
export const exportToXLSX = <T extends object>(
  data: T[],
  filename: string,
): void => {
  if (!data.length) {
    console.warn("No data to export");
    return;
  }

  const headers = Object.keys(data[0]).map(formatHeader);
  const rows = data.map((row) => Object.values(row));

  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);

  worksheet["!cols"] = headers.map((_, i) => {
    const maxLen = Math.max(
      headers[i].length,
      ...rows.map((row) => String(row[i] ?? "").length),
    );
    return { wch: maxLen + 2 };
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, filename);
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};
