import './TagsList.css'
import { useRef, useState, useEffect } from 'react';

export default function TagsList({ tags, addNewTag, updateActiveTag }) {
    const tagNameInput = useRef();
    const tagColorInput = useRef();
    const [activeTagId, setActiveTagId] = useState("");

    useEffect(() => {
        if (tags.length > 0) {
            const firstTag = tags[0].id;
            setActiveTagId(firstTag);
        }
    }, [])

    useEffect(() => {
        if(activeTagId == "") {
            return;
        } else {
            updateActiveTag(activeTagId);
        }
    }, [activeTagId])
    

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
    }

  return (
    <section className="tagsList">
        <form>
            <input ref={tagNameInput} type="text" placeholder="New tag name"/>
            <input ref={tagColorInput} type="text" placeholder="New tag color" />
            <button onClick={(e) => handleAddTag(e)} type="submit">Create</button>
            <button>Cancel</button>
        </form>
        
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
