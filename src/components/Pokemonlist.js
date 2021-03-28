import React from "react";

const PokemonList = ({ sprite, pokename, ability, baseStat }) => {
  return (
    <>
      <h1>Dectecting: {pokename}</h1>
      <h2>The Pokemon {pokename} has the following abilities:</h2>
      {/* <p>{formatAbilities(ability)}</p> */}
      <h3>
        {ability &&
          ability.map((abilityObject) => abilityObject.ability.name).join(", ")}
      </h3>

      <img src={sprite.front_shiny} alt="front shiny" />
      <img src={sprite.back_shiny} alt="back shiny" />
      <br />
      <h1>This Pokemon has the following base stats:</h1>
      <tr>
        {baseStat &&
          baseStat.map((stats) => {
            return (
              <div>
                <h1>{stats.stat.name}</h1>
                <br />
                <h3>{stats.base_stat}</h3>
              </div>
            );
          })}
      </tr>
    </>
  );
};

export default PokemonList;
