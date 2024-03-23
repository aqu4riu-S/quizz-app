import AnswersList from "./AnswersList.js";
import { useState } from "react";
import PersonsList from "./PersonsList.js";
import Button from "./Button.js";
import quiz from "./quiz.js";
import Form from "./Form.js";

function App() {
  const [playersPoints, setPlayersPoints] = useState([]);
  const [noRounds, setNoRounds] = useState(4);

  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [round, setRound] = useState(1);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [activeAnswer, setActiveAnswer] = useState(null);

  const [isGameOn, setIsGameOn] = useState(false);
  const noQuestions = quiz.questions.length;

  const [winner, setWinner] = useState("");

  const [isSetup, setIsSetup] = useState(true);
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

  function handleStartGame(noRounds, playersList) {
    // { name: "Bruno", points: 0, id: 0}
    let playersArr = [];
    Object.keys(playersList).forEach((key, idx) =>
      playersArr.push({ name: playersList[key], points: 0, id: idx })
    );

    setNoRounds(noRounds);
    setPlayersPoints(playersArr);
    setIsSetup(false);
  }

  return (
    <div className="App">
      {isSetup && <Form onHandleStartGame={handleStartGame} />}

      {!isSetup && isGameOn}
      {!isSetup && !isGameOn}
    </div>
  );
}

export default App;
