export default function Answer({
  onHandleClickAnswer,
  activeAnswer,
  id,
  answerContent,
  hasAnswered,
  correctAnswer,
}) {
  return (
    <>
      {hasAnswered && (
        <li
          className={
            id === activeAnswer && activeAnswer !== correctAnswer
              ? "answer bg-red-200 cursor-not-allowed border-red-500"
              : correctAnswer === id
                ? "answer bg-green-200 cursor-not-allowed border-green-500"
                : "answer  border-gray-400 cursor-not-allowed hover:border-blue-400"
          }
        >
          <div>
            <p>{answerContent}</p>
          </div>
        </li>
      )}
      {!hasAnswered && (
        <li
          onClick={() => onHandleClickAnswer(id)}
          className={
            activeAnswer === id
              ? "answer bg-blue-200 cursor-pointer border-blue-400"
              : "answer border-gray-400 cursor-pointer hover:border-blue-400"
          }
        >
          <div>
            <p>{answerContent}</p>
          </div>
        </li>
      )}
    </>
  );
}
