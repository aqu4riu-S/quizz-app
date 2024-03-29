export default function Main({ question, children }) {
  return (
    <>
      <div className="question my-6 text-3xl">
        <p>{question}</p>
      </div>
      {children}
    </>
  );
}
