import React, { useState, useContext } from "react";
import PostsContext from "../store/PostsContext";
import StrangersContext from "../store/StrangersContext";

const Search = () => {
  const postCtx = useContext(PostsContext);
  const strangersCtx = useContext(StrangersContext);

  const [inputValue, setInputValue] = useState("");
  const [selectOption, setSelectOption] = useState("tags");

  const searchHandler = async (e) => {
    e.preventDefault();
    try {
      if (selectOption === "tags") {
        postCtx.searchPosts(inputValue);
      }
      if (selectOption === "users") {
        strangersCtx.getStrangers(inputValue);
      }
      setInputValue("");
    } catch (e) {
      console.warn(e.message);
    }
  };

  return (
    <div className="w-full bg-base-300 p-4 shadow-lg">
      <div className="form-control">
        <div className="input-group">
          <form onSubmit={searchHandler}>
            <input
              type="text"
              placeholder="Search…"
              className="input w-32"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
            <select
              className="select rounded-none"
              onChange={(e) => setSelectOption(e.target.value)}
            >
              <option defaultValue value="tags">
                #Tags
              </option>
              <option value="users">Users</option>
            </select>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;
