export default function Button({ onClick, activeCond, btnStyle, children }) {
  const buttonStyle = activeCond ? btnStyle : "btn-disabled";
  return (
    <button
      onClick={() => onClick()}
      className={buttonStyle}
      disabled={activeCond === null}
    >
      {children}
    </button>
  );
}
