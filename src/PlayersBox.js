export default function PlayersBox({ children }) {
  return (
    <div className="aside bg-white text-black w-1/3 px-8 py-12 rounded-lg h-fit">
      <h1 className="text-2xl mb-8 text-center">Jogadores</h1>
      {children}
    </div>
  );
}
