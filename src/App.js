import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import characterData from "./data.json";
import "./DungeonMaster.scss";
import "./Player.scss";
import basicItems from "./data/basic-items.json";
import Nav from "./Nav";

function getAbilityModifier(abilityScore) {
  return {
    1: -5,
    2: -4,
    3: -4,
    4: -3,
    5: -3,
    6: -2,
    7: -2,
    8: -1,
    9: -1,
    10: 0,
    11: 0,
    12: 1,
    13: 1,
    14: 2,
    15: 2,
    16: 3,
    17: 3,
    18: 4,
    19: 4,
    20: 5
  }[abilityScore];
}

function Player({ data, id }) {
  if (!data) {
    return <p>Loading...</p>;
  }

  const character = data.characters.byId[id];
  const [currentHp, maxHp, tempHp] = character.hitpoints;
  const [currentHitDice, maxHitDice] = character.hitDice.amount;

  return (
    <div className="Player">
      <div className="Player-leftPane">
        <h1>{character.name}</h1>
        <h2>
          {character.class} {character.level} {character.race}
        </h2>
        <h3>
          HP: {currentHp} / {maxHp} ({tempHp})
        </h3>
        <h3>XP: {character.experiencePoints}</h3>
        <h3>GP: {character.gold}</h3>
        <h3>Inspiration: {character.inspiration ? "Yes" : "No"}</h3>
        <h3>Condition: {character.condition}</h3>
      </div>
      <div className="Player-rightPane">
        <Nav
          entries={[
            {
              text: "Attributes",
              path: `/player/${id}`
            },
            {
              text: "Background",
              path: `/player/${id}/background`
            },
            {
              text: "Battle",
              path: `/player/${id}/battle`
            },
            {
              text: "Equipment",
              path: `/player/${id}/equipment`
            },
            {
              text: "Proficiencies",
              path: `/player/${id}/proficiencies`
            },
            {
              text: "Features",
              path: `/player/${id}/features`
            }
          ]}
        />
        <Switch>
          <Route
            exact
            path="/player/:id"
            render={() => (
              <div>
                <h1>Attributes</h1>
                <h2>General</h2>
                <h3>Proficiency: {character.abilities.proficiency}</h3>
                <h3>
                  Hit Dice: {currentHitDice}/{maxHitDice} (
                  {character.hitDice.value})
                </h3>
                <h3>
                  Death Saves: {character.deathSaves.successes} successes,
                  {character.deathSaves.failures} failures
                </h3>
                <h2>Ability Scores</h2>
                <h3>
                  STR: {getAbilityModifier(character.abilities.strength)} (
                  {character.abilities.strength})
                </h3>
                <h3>
                  DEX: {getAbilityModifier(character.abilities.dexterity)} (
                  {character.abilities.dexterity})
                </h3>
                <h3>
                  CON: {getAbilityModifier(character.abilities.constitution)} (
                  {character.abilities.constitution})
                </h3>
                <h3>
                  INT: {getAbilityModifier(character.abilities.intelligence)} (
                  {character.abilities.intelligence})
                </h3>
                <h3>
                  WIS: {getAbilityModifier(character.abilities.wisdom)} (
                  {character.abilities.wisdom})
                </h3>
                <h3>
                  CHA: {getAbilityModifier(character.abilities.charisma)} (
                  {character.abilities.charisma})
                </h3>
                <h2>Saving Throws</h2>
                <h3>STR: {character.saves.strength}</h3>
                <h3>DEX: {character.saves.dexterity}</h3>
                <h3>CON: {character.saves.constitution}</h3>
                <h3>INT: {character.saves.intelligence}</h3>
                <h3>WIS: {character.saves.wisdom}</h3>
                <h3>CHA: {character.saves.charisma}</h3>
                <h2>Skills</h2>
                <h3>Acrobatics: {character.skills.acrobatics}</h3>
                <h3>Animal Handling: {character.skills.animalHandling}</h3>
                <h3>Arcana: {character.skills.arcana}</h3>
                <h3>Athletics: {character.skills.athletics}</h3>
                <h3>Deception: {character.skills.deception}</h3>
                <h3>History: {character.skills.history}</h3>
                <h3>Insight: {character.skills.insight}</h3>
                <h3>Intimidation: {character.skills.intimidation}</h3>
                <h3>Investigation: {character.skills.investigation}</h3>
                <h3>Medicine: {character.skills.medicine}</h3>
                <h3>Nature: {character.skills.nature}</h3>
                <h3>Perception: {character.skills.perception}</h3>
                <h3>Performance: {character.skills.performance}</h3>
                <h3>Religion: {character.skills.religion}</h3>
                <h3>Sleight of Hand: {character.skills.sleightOfHand}</h3>
                <h3>Stealth: {character.skills.stealth}</h3>
                <h3>Survival: {character.skills.survival}</h3>
              </div>
            )}
          />
          <Route
            exact
            path="/player/:id/background"
            render={() => (
              <div>
                <h1>Background</h1>
                <h3>Alignment: {character.background.alignment}</h3>
                <h3>Age: {character.background.age}</h3>
                <h3>Height: {character.background.height}</h3>
                <h3>Weight: {character.background.weight}</h3>
                <h3>Eyes: {character.background.eyes}</h3>
                <h3>Skin: {character.background.skin}</h3>
                <h3>Hair: {character.background.hair}</h3>
                <h3>Archetype: {character.background.archetype}</h3>
                <h3>Allies:</h3>
                <ul>
                  {character.background.allies.map(ally => (
                    <li key={ally}>{ally}</li>
                  ))}
                </ul>
                <h3>Backstory: {character.background.backstory}</h3>
                <h3>Personality Traits:</h3>
                <ul>
                  {character.background.personalityTraits.map(
                    personalityTrait => (
                      <li key={personalityTrait}>{personalityTrait}</li>
                    )
                  )}
                </ul>
                <h3>Flaws:</h3>
                <ul>
                  {character.background.flaws.map(flaw => (
                    <li key={flaw}>{flaw}</li>
                  ))}
                </ul>
                <h3>Bonds:</h3>
                <ul>
                  {character.background.bonds.map(bond => (
                    <li key={bond}>{bond}</li>
                  ))}
                </ul>
                <h3>Ideals:</h3>
                <ul>
                  {character.background.ideals.map(ideal => (
                    <li key={ideal}>{ideal}</li>
                  ))}
                </ul>
              </div>
            )}
          />
          <Route
            exact
            path="/player/:id/battle"
            render={() => (
              <div>
                <h1>Battle</h1>
                <h2>Scores</h2>
                <h3>Armor Class: {character.battle.armorClass}</h3>
                <h3>Initiative: {character.battle.initiative}</h3>
                <h3>Speed: {character.battle.speed}</h3>
                <h2>Attacks</h2>
                <ul>
                  {character.attacks.map(({ name, attack, damage }) => (
                    <li key={name}>
                      <strong>{name}</strong>
                      <br />+{attack} to hit, deals {damage} damage.
                    </li>
                  ))}
                </ul>
              </div>
            )}
          />
          <Route
            exact
            path="/player/:id/equipment"
            render={() => (
              <div>
                <h1>Equipment</h1>
                <ul>
                  {character.equipment.map(({ name, quantity }) => (
                    <li key={name}>
                      {name} x{quantity}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          />
          <Route
            exact
            path="/player/:id/proficiencies"
            render={() => (
              <div>
                <h1>Proficiencies</h1>
                <h2>Tools</h2>
                <ul>
                  {character.proficiencies.tools.map(tool => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
                <h2>Weapons</h2>
                <ul>
                  {character.proficiencies.weapons.map(weapon => (
                    <li key={weapon}>{weapon}</li>
                  ))}
                </ul>
                <h2>Armor</h2>
                <ul>
                  {character.proficiencies.armor.map(armor => (
                    <li key={armor}>{armor}</li>
                  ))}
                </ul>
                <h2>Languages</h2>
                <ul>
                  {character.proficiencies.languages.map(language => (
                    <li key={language}>{language}</li>
                  ))}
                </ul>
              </div>
            )}
          />
          <Route
            exact
            path="/player/:id/features"
            render={() => (
              <div>
                <h1>Features</h1>
              </div>
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

function DungeonMaster({ data, onUpdate }) {
  const [localData, setLocalData] = useState(
    JSON.stringify(characterData, null, 2)
  );

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

const socketUrl =
  process.env.NODE_ENV === "production"
    ? "wss://142.93.30.81:9000"
    : "wss://localhost:9000";
const socket = new WebSocket(socketUrl);

function App() {
  const [data, setData] = useState(characterData);

  useEffect(() => {
    socket.onmessage = ({ data }) => setData(JSON.parse(data));

    return socket.close;
  }, []);

  return (
    <Router>
      <Switch>
        <Route
          path="/player/:id"
          render={({
            match: {
              params: { id }
            }
          }) => <Player data={data} id={id} />}
        />
        <Route
          path="/dm"
          render={() => (
            <DungeonMaster data={data} onUpdate={data => socket.send(data)} />
          )}
        />
        <Route render={() => <p>None</p>} />
      </Switch>
    </Router>
  );
}

export default App;
