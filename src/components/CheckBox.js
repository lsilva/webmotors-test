 import React from "react";

const CheckBox = (props) => {
  return (
    <label htmlFor={props.name} className="containerCheckbox">
      <span>{props.title}</span>
      <input
        type="checkbox"
        id={props.name}
        name={props.name}
        onChange={props.handleChange}
        checked={props.checked}
        value={props.name}
        className={props.className}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export default CheckBox;
