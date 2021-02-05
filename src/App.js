import React, { Component } from "react";
import { questions, images } from "./constants";
import "./App.css";

class App extends Component {
  intervalID = 0;

  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
      questionIndex: 0,
      running: false,
      started: false,
    };
  }

  getRandomInt = (max) => {
    return Math.ceil(Math.random() * Math.floor(max));
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  stop = () => {
    clearInterval(this.interval);
    this.setState({ running: false });
  };

  start = () => {
    this.interval = setInterval(
      () =>
        this.setState({
          imageIndex: this.getRandomInt(images.length - 1),
          questionIndex: this.getRandomInt(questions.length - 1),
          running: true,
          started: true,
        }),
      100
    );
  };

  render() {
    const image = images[this.state.imageIndex];
    const question = questions[this.state.questionIndex];

    return (
      <div className="App">
        <header className="App-header">
          <img
            src={`${process.env.PUBLIC_URL}/random-quiz/images/${image.path}`}
            className="App-logo"
            style={this.state.imageIndex === 43 ? { height: "500px" } : {}}
            alt="logo"
          />
          {image.name && <p>{image.name}</p>}

          {this.state.started && <p>{question}</p>}

          <div id="menuBall1" className="menuBall">
            {this.state.running && (
              <button className="ball redball" onClick={this.stop}>
                Stop
              </button>
            )}
            {!this.state.running && (
              <button className="ball greenball" onClick={this.start}>
                start
              </button>
            )}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
