/*
  State
    - timer countdown / display
    - focus / break timers
    - current timer tag
  Forms
    - Change time
    - open tags list
  Functionality
    - Start - Pause - End timer
    - Timer countdown
*/

import './Timer.css'
import { useState, useEffect, useRef } from 'react'; 

export default function Timer({ time, activeTag, updateTime, toggleTagsList, addTimeRecord }) {
    const [timerRunning, setTimerRunning] = useState(false);    // Timer running or stopped
    const [minutes, setMinutes] = useState(time.minutes);   // Minutes & seconds as timer running
    const [seconds, setSeconds] = useState(time.seconds);
    const [updateTimeFormActive, setUpdateTimeFormActive] = useState(false);    // Form to update timer length open/closed
    const [currentTimer, setCurrentTimer] = useState("focus"); // options: focus or break

    const minInput = useRef();      // Minute and second input in form to update timer length
    const secInput = useRef();
    let timer;  // Keep time as timer runs

// TIMER
// SET TIMER / UPDATES
// Set time clock based on whether a focus or break
    useEffect(() => {
        if (currentTimer === "focus") {
            setMinutes(time.minutes);
            setSeconds(time.seconds);
        } else {
            setMinutes(0);
            setSeconds(3);
        }
    }, [currentTimer])
// Set clock to timer length
    useEffect(() => {
        setMinutes(time.minutes);
        setSeconds(time.seconds);
    }, [time])

// Handle update to timer length from form
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

// COUNTDOWN
// Handle countdown while timer is running
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

// Handle seconds counting down
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

// Handle ending of timer
    function endTimer() {
        setTimerRunning(false);
        if (currentTimer === "focus") {     // Record completed focus timer
            addTimeRecord(createTimeRecord(activeTag));
            setMinutes(time.minutes);   // Reset timer 
            setSeconds(time.seconds);
        } else {
            setCurrentTimer("focus");   // Timer ended early, set back to focus timer
            setMinutes(time.minutes);
            setSeconds(time.seconds);
        }
    }

// TAGS
// Toggle tag list open/close
    function handleTagsListOpen() {
        toggleTagsList(true);
    }

// RECORDS
// Create a record for completed focus timer
    function createTimeRecord(tag) {
        const goalTime = (time.minutes * 60) + time.seconds;    // convert to seconds
        const timeLeft = (minutes * 60) + seconds;
        let completedTime; // in seconds
        if(timeLeft < 0) {
            completedTime = goalTime;
        } else {
            completedTime = goalTime - timeLeft;
        };
        return {id: Date.now().toString(), tag: tag, goalTime: goalTime, completedTime: completedTime}; // Create record
    }

  return (
    <section className="timer__container">
        <button onClick={() => setUpdateTimeFormActive(true)}>{minutes} : {seconds < 10 ? "0" + seconds : seconds}</button>
        {
            updateTimeFormActive ? (
                <form id="update_time">
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
                </div>
            ) : currentTimer === "focus" ? (
                <button onClick={() => setTimerRunning(true)}>Start Focus</button>
            ) : (
                <button onClick={() => setTimerRunning(true)}>Start Break</button>
            )
        }
        {
            seconds < time.seconds ? (
                <button onClick={() => endTimer()}>End</button>
            ) : null
        }
    </section>
  )
}
 