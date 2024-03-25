import React, { useEffect, useState } from 'react';
import './App.css';
import CalendarService from './services/calendar.service';
import Header from './components/header';
import TableView from './components/table-view/tableView';
import { TableInterface } from './interfaces/table.interface';

/**
 * Main App component
 * @return {JSX.Element}
 */
function App(): JSX.Element {
    const startOfYear = new Date().getFullYear();
    const [startDate, setStartDate] = useState(`${startOfYear}-1-1`);
    const [isLeapYear, setIsLeapYear] = useState(false);
    const [currency, setCurrency] = useState('£');
    const [view, setView] = useState('daily');
    const [customAmount, setCustomAmount] = useState(1);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [tableState, setTableState] = useState([]);

    /**
     * Runs the basic configuration
     * */
    function runConfig(): void {
        CalendarService.clearPopulatedData();
        const year = parseInt(startDate.slice(0, 4), 10);
        CalendarService.initDaysOfTheYearObject(year, customAmount);
        setIsLeapYear(CalendarService.isLeapYear(year));
        CalendarService.populateData(new Date(startDate));
    }

    /**
     * Updates the state based on the selected start date
     * @param {React.ChangeEvent<HTMLSelectElement>} event
     */
    function updateState(event: React.ChangeEvent<HTMLSelectElement>) {
        setStartDate(event.target.value);
    }

    /**
     * Updates the table data
     * @param {TableInterface[]} data
     */
    function updateTableData(data: TableInterface[]) {
        // @ts-expect-error - data is not assignable to type
        setTableState(data);
    }

    /**
     * Runs the configuration on start
     */
    useEffect(() => {
        runConfig();
        updateTableData(CalendarService.tableData);
    }, [startDate, customAmount]);

    return (
        <>
            <Header />
            <label htmlFor="currency">
                Currency: &nbsp;
                <select
                    name="currency"
                    onChange={(e) => setCurrency(e.target.value)}
                >
                    <option value="£">£ (GBP)</option>
                    <option value="$">$ (USD)</option>
                    <option value="€">€ (EUR)</option>
                </select>
            </label>
            <br />

            <label htmlFor="view">
                View: &nbsp;
                <select name="view" onChange={(e) => setView(e.target.value)}>
                    <option value="daily">Daily</option>
                    <option value="monthly">Monthly</option>
                </select>
            </label>
            <br />

            <label htmlFor="startDate">
                Start: &nbsp;
                <input
                    name="startDate"
                    type="date"
                    onChange={(e) => updateState(e)}
                />
            </label>
            <br />

            <label htmlFor="customAmount">
                Custom Amount: &nbsp;
                <input
                    type="number"
                    min="1"
                    value={customAmount}
                    onChange={(e) => {
                        setCustomAmount(parseInt(e.target.value, 10));
                    }}
                />
            </label>
            <div>
                <p>
                    Date: &nbsp;
                    {new Date(startDate).toDateString()}
                </p>
                <p>
                    Leap Year: &nbsp;
                    {isLeapYear.toString()}
                </p>
                <p>
                    Total:
                    {`${currency}${CalendarService.getTotalProjectedSavings()}`}
                </p>
            </div>
            <br />

            <TableView currency={currency} view={view} />
        </>
    );
}

export default App;
