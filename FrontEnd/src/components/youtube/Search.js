
import React, { useState, useEffect } from 'react';
import axios from "axios"
function Search() {
  const [title, setTitle] = useState("")
  axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: {
      part: "snippet",
      maxResults: 5,
      key: process.env.REACT_APP_YOUTUBE_API_KEY
    },
    headers: {}
  });
  const  onSearchChanged = event => {
    const searchKey = event.target.value;
    setTitle(searchKey);
  };
  const onSubmit = (e) =>{
    e.preventDefault();
   
  }
  return (
   <form onSubmit={onSubmit} className="search-form">
          <div className="form-controls">
            <label>Search</label>
            <input
              id="video-search"
              type="text"
              value={title}
              onChange={onSearchChanged}
              placeholder="Enter Search Keyword"
            />
          </div>
        </form>
  );
}

export default Search;