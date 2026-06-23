/**
 * Excel Builder utility - Handles creation and manipulation of Excel files
 */

import { Workbook } from 'exceljs';
import { addWatermark, addWatermarkNote } from './watermark';

export const createWorkbook = () => {
  const workbook = new Workbook();
  workbook.creator = 'nurasyid Excel Chatbot AI';
  workbook.created = new Date();
  workbook.modified = new Date();
  return workbook;
};

export const addDataToSheet = (worksheet, data, options = {}) => {
  const { startRow = 1, startColumn = 1, hasHeader = true, autoFilter = true, freezePane = true } = options;

  data.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const xlCell = worksheet.getCell(startRow + rowIndex, startColumn + colIndex);
      xlCell.value = cell;

      if (hasHeader && rowIndex === 0) {
        xlCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4472C4' } };
        xlCell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        xlCell.alignment = { horizontal: 'center', vertical: 'center' };
      }
    });
  });

  worksheet.columns.forEach(column => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, cell => {
      if (cell.value) {
        const cellLength = cell.value.toString().length;
        if (cellLength > maxLength) maxLength = cellLength;
      }
    });
    column.width = Math.min(maxLength + 2, 50);
  });

  if (autoFilter && data.length > 1) {
    worksheet.autoFilter.from = `A${startRow}`;
    worksheet.autoFilter.to = `${String.fromCharCode(64 + startColumn + data[0].length - 1)}${startRow + data.length - 1}`;
  }

  if (freezePane && hasHeader) {
    worksheet.views = [{ state: 'frozen', ySplit: 1 }];
  }

  addWatermark(worksheet);
  addWatermarkNote(worksheet);
};

export const saveWorkbook = async (workbook, fileName) => {
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName || 'nurasyid-export.xlsx';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);

  return blob;
};

export const createFormattedSheet = (data, sheetName = 'Sheet1', options = {}) => {
  const workbook = createWorkbook();
  const worksheet = workbook.addWorksheet(sheetName);
  addDataToSheet(worksheet, data, options);
  addWatermark(worksheet);
  return workbook;
};

export default { createWorkbook, addDataToSheet, saveWorkbook, createFormattedSheet };
