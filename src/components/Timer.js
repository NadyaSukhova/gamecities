import React from "react";

class Timer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="absolute top-4 right-4 text-xl">{`0${Math.floor(
          this.props.timeLeft / 60
        )}:${Math.floor((this.props.timeLeft % 60) / 10)}${
          this.props.timeLeft % 60 % 10
        }`}</div>
        <hr
          style={{ width: `calc(${this.props.timeLeft} / 120 * 100%)` }}
          className="absolute border-violet-300 border-4 w-full"
        />
      </div>
    );
  }
}

export default Timer;
