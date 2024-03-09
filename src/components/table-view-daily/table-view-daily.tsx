import React, { useEffect, useState } from 'react';
import '../table-view/tableView.css';
import CalendarService from '../../services/calendar.service';
import { TableInterface } from '../../interfaces/table.interface';

/**
 * TableViewDaily
 * @param {object} props
 * @returns {JSX.Element}
 */
function TableViewDaily(props: { currency: string }): JSX.Element {
    const { tableData } = CalendarService;
    const [tableState, setTableState] = useState(tableData);
    const { currency } = props;

    /**
     * Updates the table data
     */
    useEffect(() => {
        setTableState(tableData);
    }, [tableData]);

    return (
        <div>
            <h2 className="text-3xl">Daily View</h2>
            <div className="h-96 overflow-y-scroll mt-5">
                <div className="w-full">
                    <table className="w-full table-fixed">
                        <thead className="sticky top-0 bg-emerald-950 text-white border-b">
                            <tr>
                                <th className="px-4 py-2 w-1/2">Day</th>
                                <th className="px-4 py-2 w-1/2">Date</th>
                                <th className="px-4 py-2 w-1/2">Amount</th>
                                <th className="px-4 py-2 w-1/2">
                                    Running Total
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {tableState.map((item: TableInterface) => (
                                <tr
                                    key={item.day}
                                    className="bg-gray-600 text-white"
                                >
                                    <td className="border px-4 py-2 w-1/2">
                                        {item.day}
                                    </td>
                                    <td className="border px-4 py-2 w-1/2">
                                        {item.date.toLocaleString('default', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </td>
                                    <td className="border px-4 py-2 w-1/2">
                                        {currency}
                                        {item.amount}
                                    </td>
                                    <td className="border px-4 py-2 w-1/2">
                                        {currency}
                                        {item.runningTotal}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TableViewDaily;
