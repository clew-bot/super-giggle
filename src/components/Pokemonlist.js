import React, { useState } from "react";
import API from "../components/API";
// import PokeSearch from "../components/PokeSearch";
import AbilityDescription from "../components/AbilityDescription";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  abilities: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: "100px",
  },
}));

const PokemonList = ({ sprite, pokename, ability, baseStat, poketype }) => {
  const classes = useStyles();
  const [abilitee, setAbilitee] = useState([]);
  const [descriptions, setDescriptions] = useState(false);

  return (
    <div>
      <h1>
        Dectecting:{" "}
        {pokename ? (
          pokename.charAt(0).toUpperCase() + pokename.slice(1)
        ) : (
          <CircularProgress />
        )}
      </h1>
      <p>{poketype && poketype.map((typez) => <b>{typez.type.name}</b>)}</p>
      <h2>
        {pokename && pokename.charAt(0).toUpperCase() + pokename.slice(1)}'s abilities:
      </h2>
      <Paper className={classes.abilities}>
        {ability &&
          ability.map((abilityObject) => (
            <p
              onClick={() => {
                console.log(abilityObject.ability.name);
                setDescriptions(true);
                console.log(abilityObject);
                ability.map(async (abils) => {
                  // return getAbilities(abils.ability.name);
                  console.log(abils.ability.name);
                  try {
                    const jj = await API.getAbility(abils.ability.name);
                    console.log(jj);
                    console.log(jj.data.effect_entries[1].effect);
                    return setAbilitee(jj.data.effect_entries[1].effect);
                  } catch {
                    console.log("Fuck off");
                  }
                });
              }}
            >
              {abilityObject.ability.name}
              <br />
              {descriptions ? (
                <AbilityDescription
                  abilities={abilityObject.ability.name}
                  otherAbilz={abilitee}
                />
              ) : (
                <p>Click an ability for more details</p>
              )}
            </p>
          ))}
      </Paper>
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

                <CircularProgressbar
                  maxValue={255}
                  value={stats.base_stat}
                  text={stats.base_stat}
                />
              </>
            );
          })}
      </tr>
    </div>
  );
};

export default PokemonList;
