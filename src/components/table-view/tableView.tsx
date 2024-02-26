import './tableView.css';
import '../../interfaces/table.interface.ts';

function TableView(props: any) {
    return (
        <div>
            <h1>Plan</h1>
            <table>
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Month</th>
                        <th>Amount</th>
                        <th>Running Total</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map(function (item: any) {
                        return <tr key={item.day}>
                            <td>Day {item.day}</td>
                            <td>{item.month}</td>
                            <td>{props.currency}{item.day / 100}</td>
                            <td>{props.currency}{item.runningTotal / 100}</td>
                        </tr>;
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TableView;