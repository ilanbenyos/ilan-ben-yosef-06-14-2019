import React from "react";
import Form from "./form";


class AppInput extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange=(event)=> {
    this.props.updateTxtVal(event.target.value);
  }


  render() {
    return (
        <label>
          Name:
          <input type="text" value={this.props.txtVal} onChange={this.handleChange} />
        </label>
    );
  }
}
export default AppInput;
