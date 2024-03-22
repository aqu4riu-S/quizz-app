import AnswersList from "./AnswersList.js";
import { useState } from "react";
import PersonsList from "./PersonsList.js";
import Button from "./Button.js";

function App() {
  const quiz = {
    topic: "Sistema Excretor",
    questions: [
      {
        id: 1,
        question: "Quais os órgãos do sistema urinário?",
        choices: [
          "Urina, Bexiga, Rins e Uretra",
          "Rins, Uretra, Ureteres e Urina",
          "Bexiga, Uretra, Rins e Ureteres",
          "Rins, Ureteres, Bexiga e Urina",
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        question: "Qual a composição da urina?",
        choices: [
          "Ureia, água e dióxido de carbono",
          "Vapor de água, ácido úrico e ureia",
          "Água, ácido úrico e dióxido de carbono",
          "Ácido úrico, ureia e água",
        ],
        correctAnswer: 3,
      },
      {
        id: 3,
        question:
          "O sangue é ____ no(s)/na(s) ____. Depois, é transportado até ao(s)/à(s) ____ pelo(s)/pela(s) ____.",
        choices: [
          "filtrado, bexiga, rins, uretra",
          "separado, bexiga, rins, ureteres",
          "filtrado, rins, bexiga, uretra",
          "filtrado, rins, bexiga, ureteres",
        ],
        correctAnswer: 3,
      },
      {
        id: 4,
        question: "O sangue, após ser filtrado, regressa ao ____ pela ____.",
        choices: [
          "pulmões, veia cava",
          "coração, veia renal",
          "pulmões, artéria aorta",
          "coração, artéria renal",
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: "Qual não é uma prática saudável para o sistema excretor?",
        choices: [
          "Evitar ingerir carnes vermelhas",
          "Evitar a toma prolongada de certos medicamentos",
          "Evitar ter uma higiene cuidada, para prevenir infeções urinárias",
          "Beber 1,5 - 3 litros de água",
        ],
        correctAnswer: 2,
      },
      {
        id: 6,
        question: "Os pulmões excretam ____ e ____.",
        choices: [
          "vapor de água, oxigénio",
          "dióxido de carbono, oxigénio",
          "vapor de água e dióxido de carbono",
          "ureia e dióxido de carbono",
        ],
        correctAnswer: 2,
      },
      {
        id: 7,
        question: "O órgão responsável pelo armazenamento da urina é:",
        choices: ["bexiga", "ureter", "uretra", "rim"],
        correctAnswer: 0,
      },
      {
        id: 8,
        question: "O órgão responsável pela filtragem do sangue é:",
        choices: ["bexiga", "ureter", "uretra", "rim"],
        correctAnswer: 3,
      },
      {
        id: 9,
        question: "Os órgãos responsáveis pelo transporte da urina são:",
        choices: [
          "bexiga e ureteres",
          "ureteres e rins",
          "uretra e bexiga",
          "ureteres e uretra",
        ],
        correctAnswer: 3,
      },
      {
        id: 10,
        question: "Qual destas não é uma patologia do sistema excretor?",
        choices: [
          "cálculos renais",
          "AVC",
          "infeção urinária",
          "insuficiência renal",
        ],
        correctAnswer: 1,
      },
      {
        id: 11,
        question: "O suor e a urina têm uma composição química semelhante.",
        choices: ["Verdadeiro", "Falso"],
        correctAnswer: 0,
      },
      {
        id: 12,
        question: "A urina é composta, maioritariamente, por ureia.",
        choices: ["Verdadeiro", "Falso"],
        correctAnswer: 1,
      },
      {
        id: 13,
        question: "Os rins produzem, por dia, cerca de ____ litros de urina:",
        choices: ["2", "1,5", "3", "1"],
        correctAnswer: 1,
      },
      {
        id: 14,
        question: "Quais são os três principais produtos de excreção?",
        choices: [
          "Dióxido de carbono, oxigénio e urina",
          "Suor, dióxido de carbono e sangue",
          "Dióxido de carbono, sangue e suor",
          "Dióxido de carbono, suor e urina",
        ],
        correctAnswer: 3,
      },
      {
        id: 15,
        question: "___ % da urina é composta por ureia.",
        choices: ["2", "4", "45", "95"],
        correctAnswer: 0,
      },
      {
        id: 16,
        question: "Qual o percurso da urina, desde os rins, até ao exterior?",
        choices: [
          "Rins - Uretra - Bexiga - Ureteres - Exterior",
          "Rins - Ureteres - Bexiga - Uretra - Exterior",
          "Rins - Exterior - Ureteres - Bexiga - Uretra",
          "Bexiga - Ureteres - Rins - Uretra - Exterior",
        ],
        correctAnswer: 1,
      },
    ],
  };

  const [playersPoints, setPlayersPoints] = useState([
    { name: "Victória", points: 0, id: 0 },
    { name: "Diogo", points: 0, id: 1 },
    { name: "Gabriel", points: 0, id: 2 },
    { name: "João", points: 0, id: 3 },
  ]);

  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [round, setRound] = useState(1);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [activeAnswer, setActiveAnswer] = useState(null);

  const [isGameOn, setIsGameOn] = useState(true);
  const noQuestions = quiz.questions.length;

  const [winner, setWinner] = useState("");

  function findWinner() {
    let winner = [];
    let max = 0;
    playersPoints.forEach((player) => {
      if (player.points === max) {
        winner.push(player.name);
      } else if (player.points > max) {
        max = player.points;
        winner = [player.name];
      }
    });

    return winner;
  }

  function handleClickAnswer(id) {
    setActiveAnswer((prevActiveAnswer) => id);
  }

  function handleSubmitAnswer() {
    if (activeAnswer === quiz.questions[questionsAnswered].correctAnswer) {
      setPlayersPoints(
        playersPoints
          .slice()
          .map((player) =>
            player.id === playerIndex
              ? { ...player, points: player.points + 1 }
              : player
          )
      );
    }

    setActiveAnswer((prevActiveAnswer) => null);

    setQuestionsAnswered((prevQuestionsAnswered) => prevQuestionsAnswered + 1);
    setPlayerIndex(() => (playerIndex + 1) % 4);

    if ((questionsAnswered + 1) % 4 === 0) setRound(() => round + 1);

    if (noQuestions === questionsAnswered + 1) {
      setIsGameOn((prevIsGameOn) => false);
      setWinner(() => findWinner());
    }
  }

  return (
    <div className="App bg-blue-500 text-white px-16 h-screen flex items-center gap-16">
      {isGameOn && (
        <>
          <div className="main w-2/3 p-8 bg-white text-black rounded-xl">
            <div className="header flex justify-between items-center text-lg">
              <p className="text-blue-600 font-bold text-xl">
                {playersPoints.at(playerIndex).name}
              </p>
              <p>Perguntas respondidas: {questionsAnswered}</p>
              <p>
                Ronda{" "}
                <span className="text-xl text-blue-600 font-bold pr-1">
                  {round}/
                </span>
                <span className="text-sm text-gray-400">4</span>
              </p>
            </div>
            <div className="question my-6 text-3xl">
              <p>{quiz.questions[questionsAnswered].question}</p>
            </div>
            <AnswersList
              questionObj={quiz.questions[questionsAnswered]}
              onHandleClickAnswer={handleClickAnswer}
              activeAnswer={activeAnswer}
            />
            <Button
              onHandleSubmitAnswer={handleSubmitAnswer}
              activeAnswer={activeAnswer}
            />
          </div>
          <div className="aside bg-white text-black w-1/3 p-8 rounded-lg">
            <PersonsList personsLst={playersPoints} />
          </div>
        </>
      )}

      {!isGameOn && (
        <div className="aside bg-white text-black grow p-4 rounded-lg">
          <PersonsList personsLst={playersPoints} />
          <h1 className="text-3xl text-center text-blue-800 font-bold">
            🏆 {winner.join(", ")} 🥇
          </h1>
        </div>
      )}
    </div>
  );
}

export default App;
