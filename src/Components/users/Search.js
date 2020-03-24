import React, { useState } from "react";

const Search = props => {
  const [text, setText] = useState("");

  const onChange = e => {
    setText(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    props.searchUsers(text);

    setText("");
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          value={text}
          placeholder="Search Users..."
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark  btn-block"
        />
      </form>
      <button className="btn btn-light btn-block" onClick={props.clearUsers}>
        Clear
      </button>
    </div>
  );
};

export default Search;
