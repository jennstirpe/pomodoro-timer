/*
    Forms
        - New tag
    Functionality
        - Create new tag
        - Update active tag
*/

import './TagsList.css'
import { useRef, useState, useEffect } from 'react';

export default function TagsList({ tags, addNewTag, updateActiveTag, toggleTagsList }) {
// Input for new tag form
    const tagNameInput = useRef();
    const tagColorInput = useRef();
    const [activeTagId, setActiveTagId] = useState("");
    const [newTagFormActive, setNewTagFormActive] = useState(false);    // New tag form open/closed

// Change active tag to user selection 
    useEffect(() => {
        if(activeTagId == "") {
            return;
        } else {
            updateActiveTag(activeTagId);
        }
    }, [activeTagId])
    
// Create new tag with user input
    function handleAddTag(e) {
        e.preventDefault();
        const tagName = tagNameInput.current.value;
        const tagColor = tagColorInput.current.value;
        if (tagName === "") {
            return;
        } else {
            addNewTag(tagName, tagColor);
        }
        tagNameInput.current.value = "";
        tagColorInput.current.value = "";
        setNewTagFormActive(false);
    }

// Close tag list 
    function handleTagsListClose() {
        toggleTagsList(false);
    }

  return (
    <section className="tagsList">
        <button onClick={() => handleTagsListClose()}>Close</button>
        {
            !newTagFormActive ? (
                <button onClick={() => setNewTagFormActive(true)}>Add new tag</button>
            ) : null
        }
        {
            newTagFormActive ? (
                <form id="new_tag">
                    <input ref={tagNameInput} type="text" placeholder="New tag name"/>
                    <input ref={tagColorInput} type="text" placeholder="New tag color" />
                    <button onClick={(e) => handleAddTag(e)} type="submit">Create</button>
                    <button onClick={() => setNewTagFormActive(false)}>Cancel</button>
                </form>
            ) : null
        }
        
        <ul>
            {
                tags.map(tag => {
                    return (
                        <li key={tag.id}>
                            <button onClick={() => setActiveTagId(tag.id)}>{tag.tagName}</button>
                        </li>
                    )
                })
            }
        </ul>
    </section>
  )
}
