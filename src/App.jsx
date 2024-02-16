import { useState, useEffect } from "react"
import { Timer, TagsList } from "./components/index"

function App() {
  const [time, setTime] = useState({
    minutes: 15,
    seconds: 0,
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
  const [timeRecords, setTimeRecords] = useState([]);

  const [activeTag, setActiveTag] = useState({});
  const [tagsListOpen, setTagsListOpen] = useState(false);


  useEffect(() => {
    if (tags.length > 0) {
        const firstTag = tags[0];
        setActiveTag(firstTag);
    }
}, [])

function updateTime(newMin, newSec) {
  setTime(t => ({...t, minutes: newMin, seconds: newSec}));
}

function addNewTag(newName, newColor){
  setTags(prevState => {
    return [...prevState, { id: Date.now().toString(), tagName: newName, color: newColor }]
  })
}

function toggleTagsList(toggle) {
  setTagsListOpen(toggle);
}

function updateActiveTag(id) {
  const selectedTag = tags.find(tag => tag.id === id)
  setActiveTag(selectedTag);
}

function addTimeRecord(record) {
  setTimeRecords([...timeRecords, record]);
}

// useEffect(() => {
//   console.log(timeRecords);
// }, [timeRecords])

  return (
    <>
      <Timer time={time} activeTag={activeTag} updateTime={updateTime} toggleTagsList={toggleTagsList} addTimeRecord={addTimeRecord} /> 
      {
        tagsListOpen ? (
          <TagsList tags={tags} addNewTag={addNewTag} updateActiveTag={updateActiveTag} toggleTagsList={toggleTagsList} />
        ) : null
      }
      
    </>
  )
}

export default App
