import { useState } from "react"
import { Timer, TagsList } from "./components/index"

function App() {
  const [time, setTime] = useState({
    minutes: 22,
    seconds: 6,
  })

  const [tags, setTags] = useState([{
      id: "1",
      tagName: "Focus",
      color: "#0e6ba8"
    },
    {
      id: "2",
      tagName: "Work",
      color: "#90be6d"
    },
    {
      id: "3",
      tagName: "Study",
      color: "#8e4162"
    }
  ]);

  const [activeTag, setActiveTag] = useState({});
  
function updateTime(newMin, newSec) {
  setTime(t => ({...t, minutes: newMin, seconds: newSec}));
}

/*
  create list of objects to hold previous run timers
      loop through those to display the circles on the screen
    {
      tag
      total time
      completed time
    }

*/

function addNewTag(newName, newColor){
  setTags(prevState => {
    return [...prevState, { id: Date.now().toString(), tagName: newName, color: newColor }]
  })
}

function updateActiveTag(id) {
  const selectedTag = tags.find(tag => tag.id === id)
  setActiveTag(selectedTag);
}

  return (
    <>
      <Timer time={time} activeTag={activeTag} updateTime={updateTime} /> 
      <TagsList tags={tags} addNewTag={addNewTag} updateActiveTag={updateActiveTag} />
    </>
  )
}

export default App
