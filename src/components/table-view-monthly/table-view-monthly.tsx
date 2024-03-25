// @ts-expect-error - import react based on eslint rules
import React, { useEffect, useState } from 'react';
import '../table-view/tableView.css';
import CalendarService from '../../services/calendar.service';
import { TableInterface } from '../../interfaces/table.interface';

/**
 * TableViewMonthly
 * @param props
 * @returns {JSX.Element}
 */
function TableViewMonthly(props: { currency: string }): JSX.Element {
    const { tableData } = CalendarService;
    const [tableState, setTableState] = useState(tableData);
    const { currency } = props;

    /**
     * Update the table state when the table data changes
     */
    useEffect(() => {
        setTableState(tableData);
    }, [tableData]);

    /**
     * Display the monthly total
     * @param {TableInterface} item
     * @returns {string}
     */
    function displayMonthlyTotal(item: TableInterface): string {
        const monthlyData = CalendarService.sortTableData(tableState);
        const previousIndex: number = monthlyData.indexOf(item) - 1;
        const previousItem: TableInterface = monthlyData[previousIndex];

        if (previousItem) {
            // eslint-disable-next-line operator-linebreak
            const monthlyAmount: number =
                item.runningTotal - previousItem.runningTotal;
            return monthlyAmount.toFixed(2);
        }

        return item.runningTotal;
    }

    return (
        <div>
            <h2 className="text-3xl">Monthly View</h2>
            <div className="h-96 overflow-y-scroll mt-5">
                <div className="w-full">
                    <table className="w-full table-fixed">
                        <thead className="sticky top-0 bg-emerald-950 text-white border-b">
                            <tr>
                                <th className="px-4 py-2 w-1/2">Day</th>
                                <th className="px-4 py-2 w-1/2">Month</th>
                                <th className="px-4 py-2 w-1/2">
                                    Monthly Total
                                </th>
                                <th className="px-4 py-2 w-1/2">
                                    Running Total
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {CalendarService.sortTableData(tableState).map(
                                (item: TableInterface) => (
                                    <tr
                                        key={item.day}
                                        className="bg-gray-600 text-white"
                                    >
                                        <td className="border px-4 py-2 w-1/2">
                                            {item.day}
                                        </td>
                                        <td className="border px-4 py-2 w-1/2">
                                            {item.date.toLocaleString(
                                                'default',
                                                {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                }
                                            )}
                                        </td>
                                        <td className="border px-4 py-2 w-1/2">
                                            {currency}
                                            {displayMonthlyTotal(item)}
                                        </td>

                                        <td className="border px-4 py-2 w-1/2">
                                            {currency}
                                            {item.runningTotal}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TableViewMonthly;
