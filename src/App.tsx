import { useState } from 'react'
import './App.css'
import {CalendarService} from "./services/calendar.service.ts";
import TableView from "./components/table-view/tableView.tsx";

function App() {
    const [startDate, setStartDate] = useState(new Date());
    const [isLeapYear, setIsLeapYear] = useState(false);
    const [currency, setCurrency] = useState('£');

    /**
     * Configures the app based on the start date
     * @param {string} value
     */
    function configureApp(value: string) {
        const year = parseInt(value.slice(0,4));
        CalendarService.initDaysOfTheYearObject(year);
        setStartDate(new Date(value));
        setIsLeapYear(CalendarService.isLeapYear(year));
        CalendarService.populateData(startDate);
    }

    return (
        <>
          <h1>1p Challenge</h1>
          <div className="card">
              <label htmlFor={"currency"}>Currency: </label>
              <select name={"currency"} onChange={(e) => setCurrency(e.target.value)}>
                  <option value={"£"}>£ (GBP)</option>
                  <option value={"$"}>$ (USD)</option>
                  <option value={"€"}>€ (EUR)</option>
              </select>
                <br />
              <label htmlFor={"startDate"}>Start: </label>
              <input name={"startDate"} type={"date"} onChange={(e) => configureApp((e.target.value))} />

              <div>
                  <p>Date: {startDate.toDateString()}</p>
                  <p>Leap Year: {isLeapYear.toString()}</p>
                  <p>Total: {`${currency}${CalendarService.getTotalProjectedSavings()}`}</p>
              </div>

              <TableView data={CalendarService.tableData} currency={currency} />
          </div>
        </>
  )
}

export default App
