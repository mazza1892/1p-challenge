import * as XLSX from 'xlsx';
import React from 'react';

import CalendarService from '../services/calendar.service';
import { TableInterface } from '../interfaces/table.interface';

/**
 * Function to manipulate data before passing it to Excel
 * @param data
 * @param currency
 */
function processData(data: TableInterface, currency: string): TableInterface[] {
    // eslint-disable-next-line  max-len
    // eslint-disable-next-line  @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return data.map((item: TableInterface) => ({
        day: item.day,
        date: item.date,
        amount: `${currency}${item.amount}`,
        runningTotal: `${currency}${item.runningTotal}`,
    }));
}

/**
 * Generate Excel
 * @param data
 * @param headers
 * @param fileName
 */
function generateExcel(
    data: TableInterface[],
    headers: string[],
    fileName: string
) {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    // Add column headers
    XLSX.utils.sheet_add_aoa(ws, [headers], { origin: 'A1' });

    // Set column widths
    ws['!cols'] = [
        { width: 10 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
        { width: 20 },
    ];

    // Add data to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Daily Savings');

    // Save the workbook
    XLSX.writeFile(wb, `${fileName}.xlsx`);
}

/**
 * Download Excel Button
 * @param props
 * @returns {JSX.Element}
 */

function DownloadExcelButton(props: {
    data: TableInterface[];
    currency: string;
    view: string;
    startDate: string;
}) {
    function downloadExcel() {
        let excelData: TableInterface[] = [];

        // eslint-disable-next-line object-curly-newline
        const { data, currency, view, startDate } = props;
        if (view === 'monthly') {
            excelData = CalendarService.sortTableData(data);
        } else {
            excelData = data;
        }

        const processedData = processData(excelData, currency);
        const headers = ['Day', 'Date', 'Amount', 'Running Total', 'Done?'];
        const fileName = `1p Challenge (${view} view) - Starting ${startDate}`;

        generateExcel(processedData, headers, fileName);
    }

    return (
        <div className="mb-10">
            <button
                onClick={downloadExcel}
                type="button"
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
            >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Download Excel
                </span>
            </button>
        </div>
    );
}

export default DownloadExcelButton;
