import React, { useState,setState, state } from "react";



class ChangingTitle extends React.Component {
  constructor(props) {
    super(props);
    this.greetings = ["100+ unique designs", "3D print designs", "connect with others"]
    this.state = {
      greetingIndex: 0
    };
  }
  componentDidMount() {
    setInterval( () => {
      this.setState({
        greetingIndex: this.state.greetingIndex+1
      });
      if (this.state.greetingIndex == (this.greetings.length)) {
        this.setState({
          greetingIndex: 0
        });
      }
    }, 5000);
  }
  render() {
    return (
      <div>
        <p>{this.greetings[this.state.greetingIndex] }</p>
      </div>
    );
  }
};


export default ChangingTitle;
