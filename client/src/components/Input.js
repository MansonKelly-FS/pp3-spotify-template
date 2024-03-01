import React from "react";

const Input = (props) => {
  return (
    <input
      id={props.id}
      type={props.inputType}
      name={props.name}
      value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
    />
  );
};

export default Input;
