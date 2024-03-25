import { useState } from "react";

export default function Form({ onHandleStartGame }) {
  const [noRounds, setNoRounds] = useState(4);
  const [playersList, setPLayersList] = useState(
    Object.fromEntries(
      Array.from({ length: 2 }, (_, i) => [`Player ${i + 1}`, ""])
    )
  );

  const [noPlayers, setNoPlayers] = useState(2);

  function handleAddPlayer(e, isToAdd) {
    e.preventDefault();

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

  return (
    <div className="bg-blue-500 text-white px-16 py-8 h-screen flex justify-center">
      <div className="text-black w-2/4 h-full bg-gray-200 p-8 rounded-xl">
        <form action="" className="h-full">
          <div className="text-black mb-8">
            <label className="mr-4 text-2xl">Número de rondas:</label>
            <select
              id="noRounds"
              name="noRounds"
              value={noRounds}
              onChange={(e) => setNoRounds(e.target.value)}
            >
              {Array.from({ length: 17 }, (_, index) => index + 4).map(
                (idx) => (
                  <option key={idx} value={idx}>
                    {idx}
                  </option>
                )
              )}
            </select>
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
                type="button"
                onClick={() => onHandleStartGame(noRounds, playersList)}
                className="btn-secondary"
              >
                Começar o jogo
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
    </div>
  );
}
