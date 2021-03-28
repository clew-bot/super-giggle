import React, { useState } from "react";

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
              <tr>
                <h3>{stats.stat.name}</h3>
                <br />
                <td>{stats.base_stat}</td>
              </tr>
            );
          })}
      </tr>
    </>
  );
};

export default PokemonList;
