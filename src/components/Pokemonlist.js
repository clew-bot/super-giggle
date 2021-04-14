import React, { useState } from "react";
import API from "../components/API";
// import PokeSearch from "../components/PokeSearch";
import AbilityDescription from "../components/AbilityDescription";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Grid from '@material-ui/core/Grid';



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
  detector: {
    display: "flex",
    justifyContent: "center",
  }
}));

const PokemonList = ({ sprite, pokename, ability, baseStat, poketype }) => {
  const classes = useStyles();
  const [abilitee, setAbilitee] = useState([]);
  const [descriptions, setDescriptions] = useState(false);
  const [ loading, setLoading ] = useState(false);

  const loadingZone = () => {
    setTimeout(() => {
      setLoading(!loading)
    }, 2000)

  };

  return (
    <div>
       <Grid container spacing={3}>
       <Grid item xs={12}>
      <h1>
        <Paper className={classes.detector}>Dectecting:	&nbsp; 
        {pokename ? (
          pokename.charAt(0).toUpperCase() + pokename.slice(1)
        ) : (
          <CircularProgress />
        )}
        </Paper>
      </h1>
      </Grid>
      <p>{poketype && poketype.map((typez) => <b>{typez.type.name}</b>)}</p>
      <h2>
        {pokename && pokename.charAt(0).toUpperCase() + pokename.slice(1)}'s abilities:
      </h2>
      <p className={classes.abilities}>
        {ability &&
          ability.map((abilityObject) => (
            <Paper
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
            </Paper>
          ))}
      </p>
    
    
      <img src={sprite.front_default} alt="front default" />
      <img src={sprite.back_default} alt="back default" />
    
     
      {ability ? (
        <>
        <img
          src={sprite.other.dream_world.front_default}
          alt="dream world sprite"
        />
       
      <img src={sprite.front_shiny} alt="front shiny" />
      <img src={sprite.back_shiny} alt="back shiny" />
      </>
     ) : (
        <p>Loading...</p>
      )}
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
      </Grid>
    </div>
  );
};

export default PokemonList;
