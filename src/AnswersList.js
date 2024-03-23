import Answer from "./Answer.js";

export default function AnswersList({
  questionObj,
  onHandleClickAnswer,
  activeAnswer,
  hasAnswered,
}) {
  return (
    <div className="answers-container">
      {questionObj.choices.map((answer, index) => (
        <Answer
          onHandleClickAnswer={onHandleClickAnswer}
          activeAnswer={activeAnswer}
          key={index}
          id={index}
          answerContent={answer}
          hasAnswered={hasAnswered}
          correctAnswer={questionObj.correctAnswer}
        />
      ))}
    </div>
  );
}
