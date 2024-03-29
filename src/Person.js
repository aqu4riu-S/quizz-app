export default function Person({ name, points, id }) {
  return (
    <div
      className={
        id % 2 === 0
          ? "person bg-blue-600 mb-5 p-4 rounded-lg text-white"
          : "person bg-blue-200 mb-5 p-4 rounded-lg text-black"
      }
    >
      <p>
        {name} - {points} pontos
      </p>
    </div>
  );
}
