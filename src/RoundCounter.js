export default function RoundCounter({ round, noRounds }) {
  return (
    <p>
      Ronda{" "}
      <span className="text-xl text-blue-600 font-bold pr-1">{round}/</span>
      <span className="text-sm text-gray-400">{noRounds}</span>
    </p>
  );
}
