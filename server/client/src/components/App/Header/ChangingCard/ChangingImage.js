import React, { useState,setState, state } from "react";



class ChangingImage extends React.Component {
  constructor(props) {
    super(props);
    this.greetings = ["this", "is", "a"]
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


export default ChangingImage;
