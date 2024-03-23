import AnswersList from "./AnswersList.js";
import { useState } from "react";
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

  const [isSetup, setIsSetup] = useState(false);
  const [noPlayers, setNoPlayers] = useState(2);

  function findWinner(updatedPoints) {
    let winner = [];
    let max = 0;
    updatedPoints.forEach((player) => {
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
    const updatedPoints = updatePlayerPoints();
    setActiveAnswer((prevActiveAnswer) => null);

    setQuestionsAnswered((prevQuestionsAnswered) => prevQuestionsAnswered + 1);
    setPlayerIndex(() => (playerIndex + 1) % 4);

    // TO-DO make 4 dynamic (noRounds)
    if ((questionsAnswered + 1) % 4 === 0) setRound(() => round + 1);

    if (noQuestions === questionsAnswered + 1) {
      setIsGameOn(!isGameOn);
      setWinner(findWinner(updatedPoints));
    }
  }

  function handleAddPlayer(e, isToAdd) {
    e.preventDefault();
    isToAdd && noPlayers < 6 && setNoPlayers(noPlayers + 1);
    !isToAdd && noPlayers > 2 && setNoPlayers(noPlayers - 1);
  }

  return (
    <div className="App bg-blue-500 text-white px-16 h-screen flex items-center gap-16">
      {isSetup && (
        <div className="text-black w-2/4">
          <form action="">
            <div className="text-black mb-8">
              <label for="noRounds" className="mr-4 text-2xl">
                Número de rondas:
              </label>
              <select id="noRounds" name="noRounds">
                {Array.from({ length: 7 }, (_, index) => index + 4).map(
                  (idx) => (
                    <option key={idx} value={idx}>
                      {idx}
                    </option>
                  )
                )}
              </select>
            </div>
            <div>
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={(e) => handleAddPlayer(e, false)}
                  className="btn-sm"
                >
                  -
                </button>
                <button
                  onClick={(e) => handleAddPlayer(e, true)}
                  className="btn-sm"
                >
                  +
                </button>
              </div>
              {Array.from({ length: noPlayers }, (_, index) => index + 1).map(
                (idx) => (
                  <input
                    key={idx}
                    type="text"
                    placeholder={`Jogador ${idx}`}
                    className="w-full mb-6 p-4 rounded-lg"
                  />
                )
              )}
            </div>
            <div className="flex justify-center">
              <button className="btn-secondary">Começar o jogo</button>
            </div>
          </form>
        </div>
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

      {!isGameOn && !isSetup && (
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
