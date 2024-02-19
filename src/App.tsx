import { useState } from 'react'
import './App.css'

function App() {
    const [startDate, setStartDate] = useState('');
    return (
        <>
          <h1>1p Challenge</h1>
          <div className="card">
              <label htmlFor={"startDate"}>Start: </label>
              <input name={"startDate"} type={"date"} onChange={(e) => setStartDate((e.target.value))} />
              <div>
                  <p>Date: {startDate}</p>
              </div>

            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </>
  )
}

export default App
