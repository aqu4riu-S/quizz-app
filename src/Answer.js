export default function Answer({
  onHandleClickAnswer,
  activeAnswer,
  id,
  answerContent,
}) {
  return (
    <li
      onClick={() => onHandleClickAnswer(id)}
      className={
        activeAnswer === id
          ? "bg-blue-200 answer list-none border rounded-lg border-gray-400 p-4 mb-3 cursor-pointer border-blue-400 border-2"
          : "answer list-none border rounded-lg border-gray-400 p-4 mb-3 cursor-pointer hover:border-blue-400"
      }
    >
      <div>
        <p>{answerContent}</p>
      </div>
    </li>
  );
}
