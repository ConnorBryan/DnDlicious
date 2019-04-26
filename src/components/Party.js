import React from "react";

import "./Party.scss";

export default function Party({ data }) {
  return (
    <ul className="Party">
      {data.characters.all.map(id => {
        const character = data.characters.byId[id];
        const [currentHp, maxHp, tempHp] = character.hitpoints;

        return (
          <li key={id}>
            <img src="https://placehold.it/40x40" />
            <h2>{character.name}</h2>
            <h3>
              {character.class} {character.level} {character.race}
            </h3>
            <h3>
              {currentHp} / {maxHp} ({tempHp})
            </h3>
          </li>
        );
      })}
    </ul>
  );
}
