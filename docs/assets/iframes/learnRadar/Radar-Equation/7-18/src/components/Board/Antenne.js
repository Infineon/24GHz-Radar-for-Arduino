import { Select } from "@rmwc/select";
import React from "react";
import { observer } from "mobx-react";

@observer
export default class Antenne extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmite = this.handleSubmite.bind(this);
  }

  handleChange = () => {
    this.setState({
      value: event.target.value
    });
  };

  handleSubmite = () => {
    this.props.transmitted_power(this.state.value);
  };

  render() {
    return (
      <div>
        <img
          class="img_antenne"
          src="../../../images/antenne.gif"
          alt="antenne"
        />
        <br />
      </div>
    );
  }
}

