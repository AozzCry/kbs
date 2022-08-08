import React, { useState } from "react";

const TagInput = ({ setTags, tagValue, id, tags }) => {
  const [tagInput, setTagInput] = useState(tagValue);

  const onChangeHandler = (e) => {
    setTagInput(e.target.value);
  };

  const buttonHandle = () => {
    const newTags = [...tags];
    newTags[id] = tagInput;
    setTags(newTags);
  };

  return (
    <div className="badge badge-outline mt-4">
      <input
        type="text"
        placeholder="Add your tag..."
        className="badge-outline"
        onChange={(e) => onChangeHandler(e)}
        value={tagInput}
      />
      <button onClick={buttonHandle}>Save</button>
    </div>
  );
};

export default TagInput;
