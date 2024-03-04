import './tableView.css'
import '../../interfaces/table.interface.ts'
import { useEffect, useState } from 'react'
import { CalendarService } from '../../services/calendar.service.ts'

function TableView(props: any) {
    const tableData = CalendarService.tableData
    const [tableState, setTableState] = useState(tableData)

    useEffect(() => {
        setTableState(tableData)
    }, [tableData])

    return (
        <div className="h-96 overflow-y-scroll mt-5">
            <div className="w-full">
                <table className="w-full table-fixed">
                    <thead className="sticky top-0 bg-emerald-950 text-white border-b">
                        <tr>
                            <th className="px-4 py-2 w-1/2">Day</th>
                            <th className="px-4 py-2 w-1/2">Month</th>
                            <th className="px-4 py-2 w-1/2">Amount</th>
                            <th className="px-4 py-2 w-1/2">Running Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tableState.map(function (item: any) {
                            const dateConf = {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            }
                            return (
                                <tr
                                    key={item.day}
                                    className="bg-gray-600 text-white">
                                    <td className="border px-4 py-2 w-1/2">
                                        Day {item.day}
                                    </td>
                                    <td className="border px-4 py-2 w-1/2">
                                        {item.date.toLocaleString(
                                            'default',
                                            dateConf
                                        )}
                                    </td>
                                    <td className="border px-4 py-2 w-1/2">
                                        {props.currency}
                                        {item.amount}
                                    </td>
                                    <td className="border px-4 py-2 w-1/2">
                                        {props.currency}
                                        {item.runningTotal}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableView
