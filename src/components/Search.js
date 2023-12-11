import React from "react";

function Search({ onSearch }) {
  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        onChange={(e) => onSearch(e.target.value)}
      />

      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;
