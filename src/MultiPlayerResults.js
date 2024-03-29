export default function MultiPlayerResults({ children, winner }) {
  return (
    <>
      {children}
      <h1 className="text-3xl text-center text-blue-800 font-bold">
        🏆 {winner.join(", ")} 🥇
      </h1>
    </>
  );
}
