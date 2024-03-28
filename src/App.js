import { useState, useEffect } from "react";
import AnswersList from "./AnswersList.js";
import PersonsList from "./PersonsList.js";
import Button from "./Button.js";
import _quiz from "./quiz3.js";
import Form from "./Form.js";
import Gallery from "./Gallery.js";
import Difficulty from "./Difficulty.js";

function App() {
  const [playersPoints, setPlayersPoints] = useState([]);
  const [noRounds, setNoRounds] = useState(4);

  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [round, setRound] = useState(1);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [activeAnswer, setActiveAnswer] = useState(null);

  const [isGameOn, setIsGameOn] = useState(false);
  const noQuestions = noRounds * playersPoints.length;

  const [winner, setWinner] = useState("");

  const [isSetup, setIsSetup] = useState(true);
  const [hasAnswered, setHasAnswered] = useState(false);

  const [isMultiplayer, setIsMultiplayer] = useState(true);

  const [quiz, setQuiz] = useState(_quiz);

  const courses = [
    {
      source: "imgs/courses/excretor.jpg.webp",
      altText: "course image",
      course: "Sistema Excretor",
    },
    {
      source: "imgs/courses/cardiovascular.jpg.webp",
      altText: "course image",
      course: "Sistema Cardiovascular",
    },
    {
      source: "imgs/courses/reprodutor.jpg.webp",
      altText: "course image",
      course: "Sistema Reprodutor",
    },
    {
      source: "imgs/courses/pele.jpeg",
      altText: "course image",
      course: "Pele",
    },
  ];

  // Function to shuffle an array (Fisher-Yates algorithm)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    const tempQuiz = _quiz.questions.slice();
    const shuffledQuiz = shuffleArray(tempQuiz);

    shuffledQuiz.forEach((questionObj) => {
      const originalChoices = questionObj.choices.slice();

      const shuffledChoices = shuffleArray(originalChoices);

      const correctIndex = shuffledChoices.indexOf(
        questionObj.choices[questionObj.correctAnswer]
      );

      questionObj.correctAnswer = correctIndex;
      questionObj.choices = shuffledChoices;
    });
    setQuiz({ ..._quiz, questions: shuffledQuiz });
  }, []);

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
  }

  function handleNextQuestion() {
    // Reset Active Answer
    setActiveAnswer((prevActiveAnswer) => null);

    setQuestionsAnswered((prevQuestionsAnswered) => prevQuestionsAnswered + 1);
    setPlayerIndex(() => (playerIndex + 1) % playersPoints.length);

    if ((questionsAnswered + 1) % playersPoints.length === 0) {
      setRound(() => round + 1);
    }

    if (noQuestions === questionsAnswered + 1) {
      setIsGameOn((prevIsGameOn) => false);
      setWinner(findWinner());
    }

    setHasAnswered(false);
  }

  function handleStartGame(noRounds, playersList, isMultiplayerMode) {
    // { name: "Bruno", points: 0, id: 0}
    let playersArr = [];
    Object.keys(playersList).forEach((key, idx) =>
      playersArr.push({ name: playersList[key], points: 0, id: idx })
    );

    setNoRounds(noRounds);
    setPlayersPoints(playersArr);
    setIsSetup(false);
    setIsGameOn(true);
    setIsMultiplayer(isMultiplayerMode);
  }

  return (
    <div className="App">
      {isSetup && (
        <div className="bg-blue-500 text-white py-8 h-screen flex justify-evenly">
          <Form onHandleStartGame={handleStartGame} />
          <Gallery galleryLst={courses} />
        </div>
      )}

      {isGameOn && !isSetup && (
        <>
          <div className="bg-blue-500 text-white px-16 h-screen flex items-center gap-16">
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
                  <span className="text-sm text-gray-400">{noRounds}</span>
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
                <Difficulty
                  difficulty={quiz.questions[questionsAnswered].difficulty}
                />
                <div className="flex items-center gap-6">
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
            </div>
            <div className="aside bg-white text-black w-1/3 p-8 rounded-lg">
              <PersonsList personsLst={playersPoints} />
            </div>
          </div>
        </>
      )}

      {!isGameOn && !isSetup && (
        <div className=" bg-blue-500 text-white px-16 h-screen flex items-center gap-16">
          <div className="aside bg-white text-black grow p-6 rounded-lg w-1/3">
            {isMultiplayer && (
              <>
                <PersonsList personsLst={playersPoints} />
                <h1 className="text-3xl text-center text-blue-800 font-bold">
                  🏆 {winner.join(", ")} 🥇
                </h1>
              </>
            )}
            {!isMultiplayer && (
              <>
                <h1 className="text-3xl text-center text-blue-800 font-bold">
                  {playersPoints.at(0).name}
                </h1>
                <p className="text-lg text-center">
                  {playersPoints.at(0).points}/{questionsAnswered}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
