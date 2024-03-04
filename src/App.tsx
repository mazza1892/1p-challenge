import { useEffect, useState } from 'react'
import './App.css'
import { CalendarService } from './services/calendar.service.ts'
import TableView from './components/table-view/tableView.tsx'

function App() {
    const startOfYear = new Date().getFullYear()
    const [startDate, setStartDate] = useState(`${startOfYear}-1-1`)
    const [isLeapYear, setIsLeapYear] = useState(false)
    const [currency, setCurrency] = useState('£')
    // @ts-ignore
    const [tableState, setTableState] = useState([])

    /**
     * Runs the basic configuration
     * */
    function runConfig(): void {
        CalendarService.clearPopulatedData()
        const year = parseInt(startDate.slice(0, 4))
        CalendarService.initDaysOfTheYearObject(year)
        setIsLeapYear(CalendarService.isLeapYear(year))
        CalendarService.populateData(new Date(startDate))
    }

    /**
     * Updates the state
     * @param e
     */
    function updateState(e: any) {
        setStartDate(e.target.value)
    }

    /**
     * Runs the configuration on start
     */
    useEffect(() => {
        runConfig()
        updateTableData(CalendarService.tableData)
    }, [startDate])

    /**
     * Updates the table data
     * @param data
     */
    function updateTableData(data: any) {
        setTableState(data)
    }

    return (
        <>
            <h1>1p Challenge</h1>
            <label htmlFor={'currency'}>Currency: </label>
            <select
                name={'currency'}
                onChange={(e) => setCurrency(e.target.value)}>
                <option value={'£'}>£ (GBP)</option>
                <option value={'$'}>$ (USD)</option>
                <option value={'€'}>€ (EUR)</option>
            </select>
            <br />
            <label htmlFor={'startDate'}>Start: </label>
            <input
                name={'startDate'}
                type={'date'}
                onChange={(e) => updateState(e)}
            />

            <div>
                <p>Date: {new Date(startDate).toDateString()}</p>
                <p>Leap Year: {isLeapYear.toString()}</p>
                <p>
                    Total:{' '}
                    {`${currency}${CalendarService.getTotalProjectedSavings()}`}
                </p>
            </div>

            <TableView
                data={CalendarService.tableData}
                currency={currency}
                updateTableData={updateTableData}
            />
        </>
    )
}

export default App
