import React from "react";
import axios from "axios";
import icon from "../icon.png";
import { If, Then, Else } from "react-if";
import Timer from "./Timer";
import { Navigate } from "react-router";

class TheGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: this.getCities(),
      answer: "Напишите любой город, например: Где вы живете?",
      answers: [],
      timeLeft: 120,
    };
    this.getCities = this.getCities.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  getCities() {
    var res = [];
    try {
      axios.get("https://api.hh.ru/areas").then((response) => {
        var country = response.data[0].areas;
        for (var region of country) {
          if (region.areas.length > 0) {
            for (var city of region.areas) {
              res.push(city.name);
            }
          } else {
            res.push(region.name);
          }
        }
      });
    } catch (error) {
      alert(error);
    }
    return res;
  }

  checkAnswer() {
    var last_letter = this.state.answer[this.state.answer.length - 1];
    if ("ьъы".includes(last_letter)) {
      last_letter = this.state.answer[this.state.answer.length - 2];
    }
    var first_letter = "";
    var last_word = "";
    if (this.state.answers.length > 0) {
      last_word = this.state.answers.slice(-1);
      first_letter = last_word[0].slice(-1);
    }
    if (
      this.state.cities.includes(this.state.answer) &
      !this.state.answers.includes(this.state.answer) &
      (first_letter === "" ||
        this.state.answer[0].toLowerCase() === first_letter.toLowerCase())
    ) {
      this.state.answers.push(this.state.answer);

      var answers_count = this.state.answers.length;
      var new_answers = `` ? answers_count > 1 : `<div class="mt-10"></div>`;
      new_answers += `
          <div class="w-full mb-2 float-right mr-4">
            <div class="float-right w-fit bg-violet-600 text-white right-4 py-1.5 px-5 rounded-t-xl rounded-l-xl">
            ${this.state.answers[answers_count - 1]}
            </div>
          </div>`;
      document.getElementById("answers").innerHTML += new_answers;

      this.setState({ answer: "" });

      if (
        this.state.cities.filter(
          (city) => city[0].toLowerCase() === last_letter
        ).length === 0
      ) {
        window.location.href = `/win/?amount=${
          this.state.answers.length
        }&city=${this.state.answers.slice(-1)}&time=${this.state.timeLeft}`;
        return;
      }
      if (this.state.timeLeft > 5) {
        setTimeout(() => {
          this.state.answers.push(
            this.state.cities.filter(
              (city) => city[0].toLowerCase() === last_letter
            )[0]
          );
          new_answers = `<div class="w-full mb-2 float-left ml-4">
            <div class="float-left w-fit bg-slate-200 py-1.5 px-5 rounded-t-xl rounded-r-xl"> 
              ${this.state.answers[answers_count]}
            </div>
          </div>
      `;
          document.getElementById("answers").innerHTML += new_answers;
        }, 5000);
      }
      if (this.state.timeLeft > 5) {
        setTimeout(() => {
          this.setState({
            answer: `Знаете город на букву"${this.state.answers[answers_count]
              .slice(-1)
              .toUpperCase()}"?`,
          });
        }, 5000);
      }
      document.getElementById("answer").value = "";
    } else {
      if (this.state.answers.includes(this.state.answer)) {
        alert("Такой город уже был (￢︿￢  )");
      } else {
        if (
          (first_letter !== this.state.answer[0]) &
          (first_letter !== "") &
          this.state.cities.includes(this.state.answer)
        ) {
          alert("Не та буква (；′⌒`)");
        } else {
          alert("Нет такого города (´。＿ 。｀)");
        }
      }
    }
  }

  componentDidMount() {
    this.myInterval = setInterval(this.timeOut.bind(this), 1000);
    if (this.state.timeLeft <= 0) {
      this.componentWillUnmount();
    }
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  timeOut() {
    this.setState({ timeLeft: this.state.timeLeft - 1 });
  }

  render() {
    return (
      <div>
        <div className="mt-px mb-4 mx-4 font-normal">
          Игра в города на время
        </div>
        <Timer timeLeft={this.state.timeLeft} />
        <hr className="border-slate-100 border-4" />
        <If condition={this.state.answers.length === 0}>
          <Then>
            <div className="pt-36 text-slate-400 text-center">
              Первый участник вспоминает города...
            </div>
          </Then>
        </If>
        <If condition={this.state.timeLeft > 0}>
          <Then>
            <div
              style={{
                height: `calc(100vh - 160px)`,
                width: "100%",
                overflowY: "scroll",
                overflowX: "hidden",
              }}
              id="answers"
            ></div>
            <If condition={this.state.answers.length > 1}>
              <Then>
                <div className="text-slate-400 text-center">
                  Всего перечислено городов: {this.state.answers.length}
                </div>
              </Then>
            </If>
            <div className="absolute bottom-4 mx-4 w-11/12 h-12 bg-slate-100 py-3.5 rounded-md">
              <input
                className="bg-transparent w-5/6 mx-3"
                id="answer"
                placeholder="Ожидаем ответа соперника..."
                value={this.state.answer}
                onChange={(e) => this.setState({ answer: e.target.value })}
              />
              <button
                className=" absolute bg-violet-600 rounded-md px-1.5 py-1.5 right-2 bottom-2"
                onClick={this.checkAnswer}
              >
                <img className="w-5" src={icon} alt="send icon" />
              </button>
            </div>
          </Then>
          <Else>
            <If condition={this.state.answers % 2 === 0}>
              <Then>
                <Navigate
                  to={`/fail/?amount=${
                    this.state.answers.length
                  }&city=${this.state.answers.slice(-1)}&time=${0}`}
                />
              </Then>
              <Else>
                <Navigate
                  to={`/win/?amount=${
                    this.state.answers.length
                  }&city=${this.state.answers.slice(-1)}&time=${0}`}
                />
              </Else>
            </If>
          </Else>
        </If>
      </div>
    );
  }
}

export default TheGame;
