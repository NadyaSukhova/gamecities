import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <div>
      <div className="text-center mt-px mb-4 mx-4 font-normal">Игра в города на время</div>
        <hr className="border-slate-100 border-4"/>
      <div className="text-slate-700 my-6 mx-6 font-normal" >Цель: Назвать как можно больше реальных городов.</div>
      <ul className=" text-slate-700 list-disc list-inside my-6 mx-6">
        <li>Запрещается повторение городов.</li>
        <li>
          Названий городов на твердый “ъ” и мягкий “ъ” знак нет. Из-за этого бы
          пропускаем эту букву и игрок должен назвать город на букву стоящую
          перед ъ или ь знаком.
        </li>
        <li>
          Каждому игроку дается 2 минуты на размышления, если спустя это время
          игрок не вводит слово он считается проигравшим
        </li>
      </ul>
      <div className="text-center">
        <Link to="/game">
          <button className="bg-violet-600 text-white px-4 py-2 rounded">Начать игру</button>
        </Link>
      </div>
    </div>
  );
}

export default WelcomePage;
