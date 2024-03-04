import React from 'react';
import { useState } from 'react'; 


const Searchbar = ({ onSubmit }) => {
  const [term, setTerm] = useState("");

  const handleChange = (event) => {
    console.log("event.target.value:", event.target.value);
    setTerm(event.target.value)
  };


    return (
      <form onSubmit={onSubmit}>
        <input
          id="search"
          type="text"
          name="search"
          value={term}
          placeholder="Search"
          onChange={handleChange}
        />
      </form>
    );
}

export default Searchbar; 