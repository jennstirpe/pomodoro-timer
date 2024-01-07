import { useState } from "react"
import { Timer } from "./components/index"

function App() {
  const [time, setTime] = useState({
    minutes: 22,
    seconds: 10,
  })


  return (
    <>
      <Timer time={time} /> 
    </>
  )
}

export default App
