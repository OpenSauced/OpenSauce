import React from 'react';

const HPFeedSearch = ({searchInputValue, handleSearchInputValue}) => {
  return (
    <div className="row">
      <input type="text" placeholder="Search..." value={searchInputValue} onChange={handleSearchInputValue}/>
    </div>
  );
}

export default HPFeedSearch;
