import React, { Component } from "react";

import FormComponent from "./components/form";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <FormComponent {...this.props} />;
  }
}

export default index;