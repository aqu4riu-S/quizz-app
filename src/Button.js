export default function Button({ onHandleSubmitAnswer, activeAnswer }) {
  return (
    <div className="mt-8 flex justify-end">
      <button
        onClick={() => onHandleSubmitAnswer()}
        className={
          activeAnswer !== null
            ? "answer-btn text-white bg-blue-400 hover:bg-blue-600 py-2 px-6 rounded-lg"
            : "answer-btn text-white bg-gray-400 py-2 px-6 rounded-lg"
        }
        disabled={activeAnswer === null}
      >
        Responder
      </button>
    </div>
  );
}
