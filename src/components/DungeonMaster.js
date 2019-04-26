import React, { useState } from "react";

import game from "../data/game.json";
import basicItems from "../data/basic-items.json";
import "./DungeonMaster.scss";

export default function DungeonMaster({ data, onUpdate }) {
  const [localData, setLocalData] = useState(JSON.stringify(game, null, 2));

  function handleUpdate() {
    return onUpdate(localData);
  }

  return (
    <div className="DungeonMaster">
      <div className="DungeonMaster-leftPane">
        <textarea
          value={localData}
          onChange={e => setLocalData(e.target.value)}
        />
        <button onClick={handleUpdate}>Update</button>
      </div>
      <div className="DungeonMaster-rightPane">
        {data && (
          <select>
            {data.characters.all.map(id => (
              <option key={id} value={id}>
                {data.characters.byId[id].name}
              </option>
            ))}
          </select>
        )}
        <select>
          {basicItems.basicitem.map(({ name }) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
