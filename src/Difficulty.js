export default function Difficulty(difficulty) {
  return (
    <div className="flex items-center gap-2">
      <p>Dificuldade:</p>
      <div className="flex justify-center items-center gap-2">
        {Array.from(
          {
            length: Number(difficulty),
          },
          (_, index) => (
            <img
              src="imgs/star-full.png"
              alt="full star"
              className="w-5"
              key={index}
            />
          )
        )}
        {Array.from(
          {
            length: 3 - Number(difficulty),
          },
          (_, index) => (
            <img src="imgs/star-empty.png" alt="empty star" className="w-5" />
          )
        )}
      </div>
    </div>
  );
}
