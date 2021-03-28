import React from "react";

const PokemonList = ({ sprite, pokename, ability }) => {
  return (
    <>
      <h1>Dectecting: {pokename}</h1>
      <p>The Pokemon {pokename} has the following abilities:</p>
      {/* <p>{formatAbilities(ability)}</p> */}
      <p>
        {ability &&
          ability.map((abilityObject) => abilityObject.ability.name).join(", ")}
      </p>

      <img src={sprite.front_shiny} alt="front shiny" />
      <img src={sprite.back_shiny} alt="back shiny" />
    </>
  );
};

export default PokemonList;
