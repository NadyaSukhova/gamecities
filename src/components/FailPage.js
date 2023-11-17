import React from "react";
import { Link } from "react-router-dom";

class FailPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    return (
      <div>
        <div className="mt-10">
          <div className="text-center text-xl">
          К сожалению твое время вышло!
          </div>
          <div className="text-center text-xl">
          Твой противник победил!
          </div>
        </div>
        <div className="my-8">
          <div className="text-center text-red-600 text-3xl">
          {`0${Math.floor(urlParams.get("time") / 60)}:${Math.floor(urlParams.get("time") % 60 / 10)}${urlParams.get("time") % 6}`}
          </div>
        </div>
        <div className="text-center text-xl">
          Всего было перечислено городов: {urlParams.get("amount")}
        </div>

        <div className="text-center text-xl">
          Очень не плохой результат!
        </div>
        <div className="text-center text-xl mb-1.5">
          Последний город названный победителем
        </div>
        <div className="text-center text-2xl mb-8">{urlParams.get("city")}</div>
        <div className="text-center">
          <Link to="/game">
            <button className="bg-violet-600 text-white px-4 py-2 rounded">
              Начать новую игру
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default FailPage;
