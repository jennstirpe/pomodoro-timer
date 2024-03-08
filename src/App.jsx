/*
  State
    - timer settings
    - time records
    - timer tags
  Functionality
    - Update
      - time
      - active tag
    - Add
      - tag
      - time record
*/

import { useState, useEffect } from "react"
import { Timer, TagsList } from "./components/index"

function App() {
// STATE -  TIMER LENGTH, TAG LIST, ACTIVE TAG, RECORDS, TOGGLE TAG LIST
  const [time, setTime] = useState({minutes: 0, seconds: 4,})
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
  const [timeRecords, setTimeRecords] = useState([]);
  const [tagsListOpen, setTagsListOpen] = useState(false);

// Set INITAL TAG by default
  useEffect(() => {     
    if (tags.length > 0) {
        const firstTag = tags[0];
        setActiveTag(firstTag);
    }
  }, [])

// Update TIMER LENGTH
  function updateTime(newMin, newSec) {      // 
    setTime(t => ({...t, minutes: newMin, seconds: newSec}));
  }

// Create and add NEW TAG
  function addNewTag(newName, newColor){
    setTags(prevState => {
      return [...prevState, { id: Date.now().toString(), tagName: newName, color: newColor }]
    })
  }

// Toggle TAG LIST
  function toggleTagsList(toggle) {
    setTagsListOpen(toggle);
  }

// Change ACTIVE TAG
  function updateActiveTag(id) {
    const selectedTag = tags.find(tag => tag.id === id)
    setActiveTag(selectedTag);
  }

// Create time RECORD
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
