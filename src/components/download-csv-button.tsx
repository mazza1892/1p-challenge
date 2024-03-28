import React from 'react';
import CalendarService from '../services/calendar.service';
import { TableInterface } from '../interfaces/table.interface';

/**
 * Download CSV Button
 * @param props
 * @returns {JSX.Element}
 */

function DownloadCsvButton(props: {
    data: TableInterface[];
    currency: string;
    view: string;
    startDate: string;
}): JSX.Element {
    function downloadCsv() {
        let csvData: TableInterface[] = [];
        // eslint-disable-next-line object-curly-newline
        const { data, currency, view, startDate } = props;
        if (view === 'monthly') {
            csvData = CalendarService.sortTableData(data);
        } else {
            csvData = data;
        }

        const csvHeaders = ['Day', 'Date', 'Amount', 'Running Total', 'Done?'];
        const delimiter = ',';
        let csv = ''; // CSV content
        const fileName = `1p Challenge (${view} view) - Starting ${startDate}.csv`;

        csvHeaders.forEach((header) => {
            csv += `${header}${delimiter}`;
            if (csvHeaders.indexOf(header) === csvHeaders.length - 1) {
                csv += '\n';
            }
        });

        // Create the CSV content
        csvData.forEach((item) => {
            const amount = currency + item.amount;
            const runningTotal = currency + item.runningTotal;
            const date = item.date.toLocaleString('default', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });

            const row = `${item.day}${delimiter}${date}${delimiter}${amount}${delimiter}${runningTotal}\n`;

            csv += row;
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', fileName);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    return (
        <div className="mb-10">
            <button
                onClick={downloadCsv}
                type="button"
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
            >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Download CSV
                </span>
            </button>
        </div>
    );
}

export default DownloadCsvButton;
