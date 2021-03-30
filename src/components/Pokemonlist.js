import React, { useState } from "react";
import API from "../components/API";
// import PokeSearch from "../components/PokeSearch";
import AbilityDescription from "../components/AbilityDescription";

const PokemonList = ({ sprite, pokename, ability, baseStat }) => {
  const [abilitee, setAbilitee] = useState([]);
  const [abilityName, setAbilityName] = useState([]);

  //set ability description in state //
  // const [abilities, abilityDescription] = useState("");

  async function getAbilities(ability) {
    const res = await API.getAbility(ability);
    console.log(res);
    // abilityDescription(res);
    // console.log(abilityDescription);

    console.log(res.data.effect_entries[1].effect);
    setAbilitee(res.data.effect_entries[1].effect);

    // abilityDescription(res.data.effect_entries[1].effect);
    // for (const a in abilityDescription(res.data.effect_entries[1].effect)) {
    //   console.log(a);
    //   return abilitee(a);
    // }
    // setSecondAbility(res.data.effect_entries[1].effect);
    // console.log(abilityDescription);
    console.log(res.data.effect_entries);

    // for (const property in res.name) {
    //   console.log(`${property}: ${res.name[property]}`);
    // }
  }
  // const [defaultPoke] = useState("Mewtwo");

  // function getPokemon(term) {
  //   console.log(term);
  // }
  console.log(ability);
  return (
    <>
      {/* <PokeSearch getPokemon={getPokemon} /> */}
      <h1>Dectecting: {pokename}</h1>
      <h2>The Pokemon {pokename} has the following abilities:</h2>
      {/* <p>{formatAbilities(ability)}</p> */}
      {/*
      <h1>
        {for(const abils in ability){
          console.log(abils)
        }}
      </h1> */}
      {ability &&
        ability.map((abilityObject) => (
          <button
            onClick={() => {
              console.log(abilityObject.ability.name);

              console.log(abilityObject);
              ability.map(async (abils) => {
                // return getAbilities(abils.ability.name);
                console.log(abils.ability.name);
                const jj = await API.getAbility(abils.ability.name);
                console.log(jj);
                console.log(jj.data.effect_entries[1].effect);
                return setAbilitee(jj.data.effect_entries[1].effect);
              });
              // console.log(ability[0].ability.name);
              // getAbilities(ability[0].ability.name && ability[1].ability.name);
            }}
          >
            {abilityObject.ability.name}
            <br />
            <AbilityDescription
              abilities={abilityObject.ability.name}
              otherAbilz={abilitee}
            />
          </button>
        ))}

      {/* {abilitee} */}

      <img src={sprite.front_default} alt="front default" />
      <img src={sprite.back_default} alt="back default" />
      {ability ? (
        <img
          src={sprite.other.dream_world.front_default}
          alt="dream world sprite"
        />
      ) : (
        <p>Loading...</p>
      )}
      <img src={sprite.front_shiny} alt="front shiny" />
      <img src={sprite.back_shiny} alt="back shiny" />

      <br />
      <h1>This Pokemon has the following base stats:</h1>
      <tr
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          border: "solid 2px black",
          marginBottom: "5vw",
        }}
      >
        {baseStat &&
          baseStat.map((stats) => {
            return (
              <>
                <td key={stats.stat.name}>{stats.stat.name}</td>

                <td key={stats.base_stat}>{stats.base_stat}</td>
              </>
            );
          })}
      </tr>
    </>
  );
};

export default PokemonList;
