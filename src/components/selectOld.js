import React from "react"
export default class Select extends React.Component {
  render() {
    const className = this.props.className ? this.props.className : "";
    let optionsElement = this.props.options.map((option) => {
      return (
        <option key={option[this.props.value]} value={option[this.props.value]}>
          {option[this.props.text]}
        </option>
      );
    });

    optionsElement.unshift(<option key={"0099999"}>Selecione</option>);
    return (
      <select
        className={`select ${className}`}
        disabled={this.props.disabled ? "disabled" : ""}
        onChange={this.props.onChange}
      >
        {optionsElement}
      </select>
    );
  }
}