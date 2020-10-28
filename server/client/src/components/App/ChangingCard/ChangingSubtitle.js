import React, { useState,setState, state } from "react";



class ChangingSubtitle extends React.Component {
  constructor(props) {
    super(props);
    this.greetings = ["free downloads", "follow popular designers", "print anything"]
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


export default ChangingSubtitle;
