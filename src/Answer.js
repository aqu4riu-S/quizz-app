export default function Answer({
  onHandleClickAnswer,
  activeAnswer,
  id,
  answerContent,
  hasAnswered,
  correctAnswer,
}) {
  const basicStyle = "list-none rounded-lg p-4 mb-3 cursor-pointer border-2";
  return (
    <>
      {hasAnswered && (
        <li
          className={
            id === activeAnswer && activeAnswer !== correctAnswer
              ? "bg-red-300 answer list-none rounded-lg p-4 mb-3 cursor-not-allowed border-red-500 border-2"
              : correctAnswer === id
                ? "bg-green-300 answer list-none rounded-lg p-4 mb-3 cursor-not-allowed border-green-500 border-2"
                : "answer list-none border rounded-lg border-gray-400 p-4 mb-3 cursor-not-allowed hover:border-blue-400"
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
              ? "bg-blue-200 answer list-none rounded-lg p-4 mb-3 cursor-pointer border-blue-400 border-2"
              : "answer list-none border rounded-lg border-gray-400 p-4 mb-3 cursor-pointer hover:border-blue-400"
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
