export default function Question({ question }) {
  return (
    <div className="question my-6 text-3xl">
      <p>{question.question}</p>
    </div>
  );
}
