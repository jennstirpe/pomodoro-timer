import './Timer.css'
import { useState, useEffect } from 'react'; 

export default function Timer({ time, activeTag }) {
    const [timerRunning, setTimerRunning] = useState(false);

    const [minutes, setMinutes] = useState(time.minutes);
    const [seconds, setSeconds] = useState(time.seconds);

    let timer;
    useEffect(() => {
        if(timerRunning === true) {
            timer = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000)
        
            return () => clearInterval(timer);
        }
// FIX ME -- add functionality to end the timer
        else {
            clearInterval(timer);
        }
        
    }, [timerRunning])

    useEffect(() => {
        if (seconds < 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
        }
    }, [seconds])

  return (
    <section className="timer__container">
{/* FIX ME -- on click, open form to change timer times */}
        <button>{minutes} : {seconds < 10 ? "0" + seconds : seconds}</button>
{/* FIX ME -- on click, open list of tags to select */}
        <button>{activeTag.tagName}</button>
        {
            timerRunning ? (
                <button onClick={() => setTimerRunning(false)}>Pause</button>
            ) : (
                <button onClick={() => setTimerRunning(true)}>Start Focus</button>
            )
        }
    </section>
  )
}
 