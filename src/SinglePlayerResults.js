export default function SinglePlayerResults({ playerObj, questionsAnswered }) {
  return (
    <>
      <h1 className="text-3xl text-center text-blue-800 font-bold">
        {playerObj.name}
      </h1>
      <p className="text-lg text-center">
        {playerObj.points}/{questionsAnswered}
      </p>
    </>
  );
}
