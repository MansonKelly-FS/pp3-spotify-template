import React from 'react';
import Input from './Input';

const Searchbar = (props) => {
    return (
      <form onSubmit={props.search}>
        <Input
          id="search"
          type="text"
          name="search"
          value={props.search}
          placeholder="Search"
        />
      </form>
    );
}

export default Searchbar; 