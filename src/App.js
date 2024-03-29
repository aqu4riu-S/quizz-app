import { useState, useEffect } from "react";
import AnswersList from "./AnswersList.js";
import PersonsList from "./PersonsList.js";
import Button from "./Button.js";
import _quiz from "./quiz3.js";
import Form from "./Form.js";
import Gallery from "./Gallery.js";
import Difficulty from "./Difficulty.js";
import PlayersBox from "./PlayersBox.js";
import NavBar from "./NavBar.js";
import QuestionsAnswered from "./QuestionsAnswered.js";
import RoundCounter from "./RoundCounter.js";
import CurrentPlayer from "./CurrentPlayer.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import QuestionBox from "./QuestionBox.js";
import PlayersResults from "./PlayersResults.js";
import SinglePlayerResults from "./SinglePlayerResults.js";
import MultiPlayerResults from "./MultiPlayerResults.js";

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
    <div className="App bg-blue-500 text-white p-16 h-screen flex gap-16">
      {isSetup && (
        <>
          <Form onHandleStartGame={handleStartGame} />
          <Gallery galleryLst={courses} />
        </>
      )}

      {isGameOn && !isSetup && (
        <>
          <QuestionBox>
            <NavBar>
              <CurrentPlayer playerName={playersPoints.at(playerIndex).name} />
              <QuestionsAnswered questionsAnswered={questionsAnswered} />
              <RoundCounter round={round} noRounds={noRounds} />
            </NavBar>

            <Main question={quiz.questions[questionsAnswered].question}>
              <AnswersList
                questionObj={quiz.questions[questionsAnswered]}
                onHandleClickAnswer={handleClickAnswer}
                activeAnswer={activeAnswer}
                hasAnswered={hasAnswered}
              />
            </Main>

            <Footer>
              <Difficulty
                difficulty={quiz.questions[questionsAnswered].difficulty}
              />
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
            </Footer>
          </QuestionBox>

          <PlayersBox>
            <PersonsList personsLst={playersPoints} />
          </PlayersBox>
        </>
      )}

      {!isGameOn && !isSetup && (
        <PlayersResults>
          {isMultiplayer && (
            <MultiPlayerResults winner={winner}>
              <PersonsList personsLst={playersPoints} />
            </MultiPlayerResults>
          )}
          {!isMultiplayer && (
            <SinglePlayerResults
              playerObj={playersPoints[0]}
              questionsAnswered={questionsAnswered}
            />
          )}
        </PlayersResults>
      )}
    </div>
  );
}

export default App;
