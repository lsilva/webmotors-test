 import React from "react";

const Select = (props) => {
  return (
    <select
      name={props.name}
      key={props.name}
      value={props.value}
      onChange={props.handleChange}
      className={props.className}
      disabled={props.disabled ? "disabled" : ""}
    >
      <option value="" key={`${props.name}`}>
        {props.placeholder}
      </option>
      {props.options.map((option) => {
        return (
          <option key={`${option[props.optionId]}`} value={option[props.optionId]}>
            {option[props.optionText]}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
