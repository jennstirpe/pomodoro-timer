import './Timer.css'
import { useState, useEffect, useRef } from 'react'; 

export default function Timer({ time, activeTag, updateTime, toggleTagsList, addTimeRecord }) {
    const [timerRunning, setTimerRunning] = useState(false);
    const [minutes, setMinutes] = useState(time.minutes);
    const [seconds, setSeconds] = useState(time.seconds);
    const [updateTimeFormActive, setUpdateTimeFormActive] = useState(false);
    const [currentTimer, setCurrentTimer] = useState("focus"); // options: focus or break

    const minInput = useRef();
    const secInput = useRef();

    useEffect(() => {
        if (currentTimer === "focus") {
            setMinutes(time.minutes);
            setSeconds(time.seconds);
        } else {
            setMinutes(5);
            setSeconds(0);
        }
    }, [currentTimer])

    let timer;
    useEffect(() => {
        if(timerRunning === true) {
            timer = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000)
        
            return () => clearInterval(timer);
        }
        else {
            clearInterval(timer);
        }
        
    }, [timerRunning])

    useEffect(() => {
        if (seconds < 0) {
            if (minutes === 0) {
                clearInterval(timer);
                endTimer();
                if (currentTimer === "focus") {
                    setCurrentTimer("break");
                } else {
                    setCurrentTimer("focus");
                }
            } else {
                setMinutes(minutes - 1);
                setSeconds(59);
            }
        }
    }, [seconds])

    useEffect(() => {
        setMinutes(time.minutes);
        setSeconds(time.seconds);
      }, [time])

    function handleTimeUpdate(e) {
        e.preventDefault();
        let newMins = minutes;
        let newSecs = seconds;
        if (minInput.current.value !== "") {
            newMins = parseInt(minInput.current.value);
        }
        if (secInput.current.value !== "") {
            newSecs = parseInt(secInput.current.value);
        }
        updateTime(newMins, newSecs);
        minInput.current.value = ""; 
        secInput.current.value = "";
        setUpdateTimeFormActive(false);
    }

    function handleTagsListOpen() {
        toggleTagsList(true);
    }

    function endTimer() {
        setTimerRunning(false);
        if (currentTimer === "focus") {
            addTimeRecord(createTimeRecord(activeTag));
        } else {
            setCurrentTimer("focus");
        }
    }

    function createTimeRecord(tag) {
        const goalTime = (time.minutes * 60) + time.seconds;    // convert to seconds
        const timeLeft = (minutes * 60) + seconds;
        const completedTime = goalTime - timeLeft;  // in seconds
        return {id: Date.now().toString(), tag: tag, goalTime: goalTime, completedTime: completedTime};
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
        
        <button onClick={() => handleTagsListOpen()}>{activeTag.tagName}</button>
        {
            timerRunning ? (
                <div>
                    <button onClick={() => setTimerRunning(false)}>Pause</button>
                    <button onClick={() => endTimer()}>End</button>
                </div>
            ) : currentTimer === "focus" ? (
                <button onClick={() => setTimerRunning(true)}>Start Focus</button>
            ) : (
                <button onClick={() => setTimerRunning(true)}>Start Break</button>
            )
        }
    </section>
  )
}
 