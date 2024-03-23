export default function Button({ onClick, activeCond, btnStyle, children }) {
  const buttonStyle =
    activeCond !== null && activeCond !== false ? btnStyle : "btn-disabled";
  return (
    <button
      onClick={() => onClick()}
      className={buttonStyle}
      // activeCond can be null (activeAnswer) or false (hasAnswered)
      disabled={activeCond === null || !activeCond}
    >
      {children}
    </button>
  );
}
