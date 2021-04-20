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
  },
  images: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  pokemonType: {
  
    display: "flex",
    justifyContent: "center",
  }
}));

const PokemonList = ({ sprite, pokename, ability, baseStat, poketype }) => {
  const classes = useStyles();
  const [abilitee, setAbilitee] = useState([]);
  const [descriptions, setDescriptions] = useState(false);
  const [ loading, setLoading ] = useState(false);

  // const loadingZone = () => {
  //   setTimeout(() => {
  //     setLoading(!loading)
  //   }, 2000)

  // };

  return (
    <div>
       <Grid container spacing={3}>
       <Grid item xs={0} lg={3}></Grid>
       <Grid item xs={12} sm={12} lg={6}>
      <h1>
        <Paper className={classes.detector}>Dectecting:	&nbsp; 
        {pokename ? (
          pokename.charAt(0).toUpperCase() + pokename.slice(1)
        ) : (
          <CircularProgress />
        )}
        </Paper>
        <br/>
        <Paper>
        {ability ? (
        <div className={classes.images}>
     
       
      <img src={sprite.front_shiny} alt="front shiny" />
      <img src={sprite.back_shiny} alt="back shiny" />
      <img
          src={sprite.other.dream_world.front_default}
          alt="dream world sprite"
        />
      <img src={sprite.front_default} alt="front default" />
      <img src={sprite.back_default} alt="back default" />
    
      </div>
     ) : (
        <p>Loading...</p>
      )}
      </Paper>
      </h1>
      </Grid>
      <Grid item xs={0} lg={3}></Grid>
      <Grid item xs={3} lg={3}></Grid>
      <Grid item xs={6} lg={6}>
      <Paper>
      <p>{poketype && poketype.map((typez) => <b className={classes.pokemonType}>{typez.type.name + "   "}</b>)}</p>
      </Paper>
      </Grid>
      <Grid item xs={3} lg={3}></Grid>



      <Grid item xs={2} lg={2}></Grid>
      <Grid item xs={8} lg={8} xl={8}>
        <Paper>
      <h2 className={classes.pokemonType}>
        {pokename && pokename.charAt(0).toUpperCase() + pokename.slice(1)}'s abilities:
      </h2>
      </Paper>
      </Grid>
      
      <Grid item xs={2} lg={2}></Grid>

      <Grid item xs={12} lg={12}>
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
                    console.log("oops")
                  }
                });
              }}
            ><h1 className={classes.detector}>
              {abilityObject.ability.name.charAt(0).toUpperCase() + abilityObject.ability.name.slice(1)}</h1>
              <br />
              <div className={classes.abilities}>
              {descriptions ? (
                <AbilityDescription
                  abilities={abilityObject.ability.name}
                  otherAbilz={abilitee}
                />
              ) : (
                <p>Click an ability for more details</p>
              )}
              </div>
            </Paper>
          ))}
      </p>
    </Grid>
   
     
     
      <br />
      <Grid item xs={12} lg={12}>
      <h1>This Pokemon has the following base stats:</h1>
      </Grid>
      <h1
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
                <p key={stats.stat.name}>{stats.stat.name}</p>

                <CircularProgressbar
                  maxValue={255}
                  value={stats.base_stat}
                  text={stats.base_stat}
                />
              </>
            );
          })}
      </h1>
      </Grid>
    </div>
  );
};

export default PokemonList;
