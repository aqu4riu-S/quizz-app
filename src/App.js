import { useState } from "react";
import AnswersList from "./AnswersList.js";
import PersonsList from "./PersonsList.js";
import Button from "./Button.js";
import quiz from "./quiz.js";

function App() {
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
  const [hasAnswered, setHasAnswered] = useState(false);

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

  function updatePlayerPoints() {
    const updatedPoints = playersPoints
      .slice()
      .map((player) =>
        player.id === playerIndex
          ? { ...player, points: player.points + 1 }
          : player
      );

    if (activeAnswer === quiz.questions[questionsAnswered].correctAnswer) {
      setPlayersPoints(updatedPoints);
    }

    return updatedPoints;
  }

  function handleSubmitAnswer() {
    updatePlayerPoints();
    setHasAnswered(true);
    // Reset Active Answer
    // setActiveAnswer((prevActiveAnswer) => null);
  }

  function handleNextQuestion() {
    // Reset Active Answer
    setActiveAnswer((prevActiveAnswer) => null);

    setQuestionsAnswered((prevQuestionsAnswered) => prevQuestionsAnswered + 1);
    setPlayerIndex(() => (playerIndex + 1) % 4);

    if ((questionsAnswered + 1) % 4 === 0) setRound(() => round + 1);

    if (noQuestions === questionsAnswered + 1) {
      setIsGameOn((prevIsGameOn) => false);
      setWinner(findWinner());
    }

    setHasAnswered(false);
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
              hasAnswered={hasAnswered}
            />
            <div className="flex justify-between mt-8">
              <Button
                onClick={handleSubmitAnswer}
                activeCond={activeAnswer != null && !hasAnswered}
                btnStyle={"btn-primary"}
              >
                Responder
              </Button>
              <Button
                onClick={handleNextQuestion}
                activeCond={hasAnswered}
                btnStyle={"btn-terciary"}
              >
                Continuar
              </Button>
            </div>
          </div>
          <div className="aside bg-white text-black w-1/3 p-8 rounded-lg">
            <PersonsList personsLst={playersPoints} />
          </div>
        </>
      )}
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
              hasAnswered={hasAnswered}
            />
            <div className="flex justify-between mt-8">
              <Button
                onClick={handleSubmitAnswer}
                activeCond={activeAnswer != null && !hasAnswered}
                btnStyle={"btn-primary"}
              >
                Responder
              </Button>
              <Button
                onClick={handleNextQuestion}
                activeCond={hasAnswered}
                btnStyle={"btn-terciary"}
              >
                Continuar
              </Button>
            </div>
          </div>
          <div className="aside bg-white text-black w-1/3 p-8 rounded-lg">
            <PersonsList personsLst={playersPoints} />
          </div>
        </>
      )}

      {!isGameOn && (
        <div className="aside bg-white text-black grow p-6 rounded-lg w-1/3">
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
