import './tableView.css';
import '../../interfaces/table.interface.ts';

function TableView(props: any) {
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
                        {props.data.map(function (item: any) {
                            return <tr key={item.day} className="bg-gray-600 text-white">
                                <td className="border px-4 py-2 w-1/2">Day {item.day}</td>
                                <td className="border px-4 py-2 w-1/2">{item.month}</td>
                                <td className="border px-4 py-2 w-1/2">{props.currency}{item.amount}</td>
                                <td className="border px-4 py-2 w-1/2">{props.currency}{item.runningTotal}</td>
                            </tr>;
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableView;
