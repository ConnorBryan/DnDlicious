import React from "react";
import { Route } from "react-router-dom";

import { getAbilityModifier } from "../helpers";
import Encounter from "./Encounter";
import GameMap from "./Map";
import Log from "./Log";
import Nav from "./Nav";
import Panel from "./Panel";
import Party from "./Party";
import Table from "./Table";
import "./Player.scss";

export default function Player({ data, id }) {
  if (!data) {
    return <p>Loading...</p>;
  }

  const character = data.characters.byId[id];
  const [currentHp, maxHp, tempHp] = character.hitpoints;
  const [currentHitDice, maxHitDice] = character.hitDice.amount;

  return (
    <div className="Player">
      <div className="Player-leftPane">
        <div className="Player-leftPane-top">
          <h1>{character.name}</h1>
          <h2>
            {character.class} {character.level} {character.race}
          </h2>
        </div>
        <Table
          data={[
            ["HP", `${currentHp} / ${maxHp} (${tempHp})`],
            ["EXP", character.experiencePoints],
            ["GP", character.gold],
            ["Inspiration", character.inspiration ? "Yes" : "No"],
            ["Condition", character.condition]
          ]}
        />
      </div>
      <div className="Player-rightPane">
        <nav className="Player-rightPane-nav">
          <Nav
            entries={[
              {
                text: "Character",
                path: `/player/${id}/character`
              },
              {
                text: "Party",
                path: `/player/${id}/party`
              },
              {
                text: "Encounter",
                path: `/player/${id}/encounter`
              },
              {
                text: "Map",
                path: `/player/${id}/map`
              },
              {
                text: "Log",
                path: `/player/${id}/log`
              }
            ]}
          />
        </nav>
        <div className="Player-rightPane-content">
          {/* Character */}
          <Route
            path="/player/:id/character"
            render={() => (
              <nav className="Player-rightPane-nav">
                <Nav
                  entries={[
                    {
                      text: "Attributes",
                      path: `/player/${id}/character`
                    },
                    {
                      text: "Background",
                      path: `/player/${id}/character/background`
                    },
                    {
                      text: "Battle",
                      path: `/player/${id}/character/battle`
                    },
                    {
                      text: "Spells",
                      path: `/player/${id}/character/spells`
                    },
                    {
                      text: "Equipment",
                      path: `/player/${id}/character/equipment`
                    },
                    {
                      text: "Proficiencies",
                      path: `/player/${id}/character/proficiencies`
                    },
                    {
                      text: "Features",
                      path: `/player/${id}/character/features`
                    }
                  ]}
                />
              </nav>
            )}
          />
          <div className="Player-rightPane-content-block">
            <Route
              exact
              path="/player/:id/character"
              render={() => (
                <>
                  <div>
                    <Panel title="Ability Scores">
                      <Table
                        data={[
                          [
                            "STR",
                            character.abilities.strength,
                            getAbilityModifier(character.abilities.strength)
                          ],
                          [
                            "DEX",
                            character.abilities.dexterity,
                            getAbilityModifier(character.abilities.dexterity)
                          ],
                          [
                            "CON",
                            character.abilities.constitution,
                            getAbilityModifier(character.abilities.constitution)
                          ],
                          [
                            "INT",
                            character.abilities.intelligence,
                            getAbilityModifier(character.abilities.intelligence)
                          ],
                          [
                            "WIS",
                            character.abilities.wisdom,
                            getAbilityModifier(character.abilities.wisdom)
                          ],
                          [
                            "CHA",
                            character.abilities.charisma,
                            getAbilityModifier(character.abilities.charisma)
                          ]
                        ]}
                      />
                    </Panel>
                    <Panel title="Saving Throws">
                      <Table
                        data={[
                          ["STR", character.saves.strength],
                          ["DEX", character.saves.dexterity],
                          ["CON", character.saves.constitution],
                          ["INT", character.saves.intelligence],
                          ["WIS", character.saves.wisdom],
                          ["CHA", character.saves.charisma]
                        ]}
                      />
                    </Panel>
                  </div>
                  <div
                    style={{
                      flex: 2
                    }}
                  >
                    <Panel title="General">
                      <Table
                        data={[
                          ["Proficiency", character.abilities.proficiency],
                          [
                            "Hit Dice",
                            `${currentHitDice}/${maxHitDice} (${
                              character.hitDice.value
                            })`
                          ],
                          [
                            "Death Saves",
                            `${character.deathSaves.successes} successes, ${
                              character.deathSaves.failures
                            } failures`
                          ]
                        ]}
                      />
                    </Panel>
                    <Panel title="Skills">
                      <div
                        style={{
                          display: "flex"
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                            marginRight: "0.5rem"
                          }}
                        >
                          <Table
                            data={[
                              ["Acrobatics", character.skills.acrobatics],
                              [
                                "Animal Handling",
                                character.skills.animalHandling
                              ],
                              ["Arcana", character.skills.arcana],
                              ["Athletics", character.skills.athletics],
                              ["Deception", character.skills.deception],
                              ["History", character.skills.history],
                              ["Insight", character.skills.insight],
                              ["Intimidation", character.skills.intimidation],
                              ["Investigation", character.skills.investigation]
                            ]}
                          />
                        </div>
                        <div
                          style={{
                            flex: 1,
                            marginLeft: "0.5rem"
                          }}
                        >
                          <Table
                            data={[
                              ["Medicine", character.skills.medicine],
                              ["Nature", character.skills.nature],
                              ["Perception", character.skills.perception],
                              ["Performance", character.skills.performance],
                              ["Persuasion", character.skills.persuasion],
                              ["Religion", character.skills.religion],
                              [
                                "Sleight of Hand",
                                character.skills.sleightOfHand
                              ],
                              ["Stealth", character.skills.stealth],
                              ["Survival", character.skills.survival]
                            ]}
                          />
                        </div>
                      </div>
                    </Panel>
                  </div>
                </>
              )}
            />
            <Route
              exact
              path="/player/:id/character/background"
              render={() => (
                <div className="Player-rightPane-content-block">
                  <Panel title="Appearance">
                    <Table
                      data={[
                        ["Age", character.background.age],
                        ["Height", character.background.height],
                        ["Weight", character.background.weight],
                        ["Eyes", character.background.eyes],
                        ["Skin", character.background.skin],
                        ["Hair", character.background.hair]
                      ]}
                    />
                  </Panel>
                  <Panel title="Lifestyle">
                    <Table
                      data={[
                        ["Alignment", character.background.alignment],
                        ["Archetype", character.background.archetype],
                        [
                          "Allies",
                          <ul>
                            {character.background.allies.map(ally => (
                              <li key={ally}>{ally}</li>
                            ))}
                          </ul>
                        ],
                        ["Backstory", character.background.backstory]
                      ]}
                    />
                  </Panel>
                  <Panel title="Mentality">
                    <Table
                      data={[
                        [
                          "Personality Traits",
                          <ul>
                            {character.background.personalityTraits.map(
                              personalityTrait => (
                                <li key={personalityTrait}>
                                  {personalityTrait}
                                </li>
                              )
                            )}
                          </ul>
                        ],
                        [
                          "Flaws",
                          <ul>
                            {character.background.flaws.map(flaw => (
                              <li key={flaw}>{flaw}</li>
                            ))}
                          </ul>
                        ],
                        [
                          "Bonds",
                          <ul>
                            {character.background.bonds.map(bond => (
                              <li key={bond}>{bond}</li>
                            ))}
                          </ul>
                        ],
                        [
                          "Ideals",
                          <ul>
                            {character.background.ideals.map(ideal => (
                              <li key={ideal}>{ideal}</li>
                            ))}
                          </ul>
                        ]
                      ]}
                    />
                  </Panel>
                </div>
              )}
            />
            <Route
              exact
              path="/player/:id/character/battle"
              render={() => (
                <div className="Player-rightPane-content-block">
                  <Panel title="Scores">
                    <Table
                      data={[
                        ["Armor Class", character.battle.armorClass],
                        ["Initiative", character.battle.initiative],
                        ["Speed", character.battle.speed]
                      ]}
                    />
                  </Panel>
                  <Panel title="Attacks">
                    <Table
                      data={character.attacks.map(
                        ({ name, attack, damage }) => [
                          name,
                          `+${attack} to hit`,
                          `${damage}`
                        ]
                      )}
                    />
                  </Panel>
                </div>
              )}
            />
            <Route
              exact
              path="/player/:id/character/spells"
              render={() => (
                <div className="Player-rightPane-content-block">
                  {character.spells.map(({ level, slots, known }) => (
                    <Panel key={level} title={`Level: ${level}`}>
                      <Table
                        data={[
                          ...(level === "Cantrip"
                            ? []
                            : [
                                [
                                  "Slots",
                                  `${slots[0]} used / ${slots[1]} remaining`
                                ]
                              ]),
                          ...known.map(({ name, prepared }) => [
                            name,
                            prepared ? "Prepared" : "Not Prepared"
                          ])
                        ]}
                      />
                    </Panel>
                  ))}
                </div>
              )}
            />
            <Route
              exact
              path="/player/:id/character/equipment"
              render={() => (
                <div
                  style={{
                    margin: "2rem"
                  }}
                >
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
              path="/player/:id/character/proficiencies"
              render={() => (
                <div className="Player-rightPane-content-block">
                  <Panel title="Tools">
                    <Table
                      data={character.proficiencies.tools.map(tool => [tool])}
                    />
                  </Panel>
                  <Panel title="Weapons">
                    <Table
                      data={character.proficiencies.weapons.map(weapon => [
                        weapon
                      ])}
                    />
                  </Panel>
                  <Panel title="Armor">
                    <Table
                      data={character.proficiencies.armor.map(armor => [armor])}
                    />
                  </Panel>
                  <Panel title="Languages">
                    <Table
                      data={character.proficiencies.languages.map(language => [
                        language
                      ])}
                    />
                  </Panel>
                </div>
              )}
            />
            <Route
              exact
              path="/player/:id/character/features"
              render={() => (
                <div className="Player-rightPane-content-block">
                  <Panel title="Race">
                    <Table
                      data={character.features.race.map(
                        ({ name, description }) => [name, description]
                      )}
                    />
                  </Panel>
                  <Panel title="Class">
                    <Table
                      data={character.features.class.map(
                        ({ name, description }) => [name, description]
                      )}
                    />
                  </Panel>
                  <Panel title="Background">
                    <Table
                      data={character.features.background.map(
                        ({ name, description }) => [name, description]
                      )}
                    />
                  </Panel>
                  <Panel title="Items">
                    <Table
                      data={character.features.items.map(
                        ({ name, description }) => [name, description]
                      )}
                    />
                  </Panel>
                  <Panel title="Feats">
                    <Table
                      data={character.features.feats.map(
                        ({ name, description }) => [name, description]
                      )}
                    />
                  </Panel>
                </div>
              )}
            />
          </div>
          {/* Party */}
          <Route
            path={`/player/${id}/party`}
            render={() => <Party data={data} />}
          />
          {/* Encounter */}
          <Route
            path={`/player/${id}/encounter`}
            render={() => <Encounter data={data} />}
          />
          {/* Map */}
          <Route path={`/player/${id}/map`} render={() => <GameMap />} />
          {/* Log */}
          <Route
            path={`/player/${id}/log`}
            render={() => <Log data={data} />}
          />
        </div>
      </div>
    </div>
  );
}
