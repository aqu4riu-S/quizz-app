import { useState } from "react";

export default function Form({ onHandleStartGame }) {
  //const { minPlayers, maxPlayers } = [2, 6];
  //const { minRounds, maxRounds } = [4, 20];

  const [noRounds, setNoRounds] = useState(4);
  const [playersList, setPLayersList] = useState(
    Object.fromEntries(
      Array.from({ length: 2 }, (_, i) => [`Player ${i + 1}`, ""])
    )
  );

  const [isMultiplayer, setIsMultiplayer] = useState(true);

  const [noPlayers, setNoPlayers] = useState(2);

  function handleAddPlayer(e, isToAdd) {
    e.preventDefault();

    if (noPlayers > 1 && noPlayers < 6) setIsMultiplayer(true);

    if (isToAdd && noPlayers < 6) {
      setNoPlayers(noPlayers + 1);
      setPLayersList({ ...playersList, [`Player ${noPlayers + 1}`]: "" });
    }
    if (!isToAdd && noPlayers > 2) {
      setNoPlayers(noPlayers - 1);
      const updatedObj = () => {
        const newObj = { ...playersList };
        delete newObj[`Player ${noPlayers}`];
        return newObj;
      };
      setPLayersList(updatedObj);
    }
  }

  function handlePlayerNameChange(e) {
    const { name, value } = e.target;
    setPLayersList({ ...playersList, [name]: value });
  }

  function handleGameMode(noPlayers) {
    const slicedEntries = Object.entries(playersList).slice(0, noPlayers);
    setPLayersList(Object.fromEntries(slicedEntries));
    setNoPlayers(noPlayers);
    if (noPlayers === 1) setIsMultiplayer(false);
  }

  return (
    <div className="text-black w-2/5 h-full bg-gray-200 p-8 rounded-xl">
      <form action="" className="h-full">
        <div className="text-black mb-8">
          <label className="mr-4 text-2xl">Número de rondas:</label>
          <select
            id="noRounds"
            name="noRounds"
            value={noRounds}
            onChange={(e) => setNoRounds(e.target.value)}
          >
            {Array.from({ length: 22 - 4 }, (_, index) => index + 4).map(
              (idx) => (
                <option key={idx} value={idx}>
                  {idx}
                </option>
              )
            )}
          </select>
        </div>
        <div>
          <button
            type="button"
            className="btn-sm"
            onClick={() => handleGameMode(1)}
          >
            Um jogador
          </button>
          <button
            type="button"
            className="btn-sm"
            onClick={() => handleGameMode(2)}
          >
            Vários jogadores
          </button>
          <button
            type="button"
            onClick={() =>
              onHandleStartGame(noRounds, playersList, isMultiplayer)
            }
            className="btn-secondary"
          >
            Começar o jogo
          </button>
        </div>

        <div>
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={(e) => handleAddPlayer(e, false)}
              className="btn-sm"
            >
              -
            </button>
            <button
              onClick={(e) => handleAddPlayer(e, true)}
              className="btn-sm"
            >
              +
            </button>
          </div>
          <div className="flex-row">
            {Array.from({ length: noPlayers }, (_, index) => index + 1).map(
              (idx) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`Jogador ${idx}`}
                  className="w-full mb-6 p-4 rounded-lg"
                  name={`Player ${idx}`}
                  value={playersList[`Player ${idx}`]}
                  onChange={handlePlayerNameChange}
                />
              )
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
