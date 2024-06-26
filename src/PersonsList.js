import Person from "./Person.js";

export default function PersonsList({ personsLst }) {
  const sortedPlayers = personsLst.slice().sort((a, b) => b.points - a.points);

  return (
    <div className="personsLst">
      {sortedPlayers.map((person) => (
        <Person
          key={person.name}
          name={person.name}
          points={person.points}
          id={person.id}
        />
      ))}
    </div>
  );
}
