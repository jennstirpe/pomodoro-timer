import './Timer.css'
import { useState, useEffect, useRef } from 'react'; 

export default function Timer({ time, activeTag, updateTime }) {
    const [timerRunning, setTimerRunning] = useState(false);
    const [minutes, setMinutes] = useState(time.minutes);
    const [seconds, setSeconds] = useState(time.seconds);
    const [updateTimeFormActive, setUpdateTimeFormActive] = useState(false);

    const minInput = useRef();
    const secInput = useRef();

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

    useEffect(() => {
        setMinutes(time.minutes);
        setSeconds(time.seconds);
      }, [time])

    function handleTimeUpdate(e) {
        e.preventDefault();
        updateTime(parseInt(minInput.current.value), parseInt(secInput.current.value));
        minInput.current.value = ""; 
        secInput.current.value = "";
        setUpdateTimeFormActive(false);
    }

  return (
    <section className="timer__container">
        <button onClick={() => setUpdateTimeFormActive(true)}>{minutes} : {seconds < 10 ? "0" + seconds : seconds}</button>
        {
            updateTimeFormActive ? (
                <form>
                    <label>
                        <input ref={minInput} type="number" placeholder="Minutes" />
                        Minutes
                    </label>
                    <label>
                        <input ref={secInput} type="number" placeholder="Seconds" />
                        Seconds
                    </label>
                    <button onClick={(e) => handleTimeUpdate(e)} type="submit">Update</button>
                </form> 
            ) : null
        }
        
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
 