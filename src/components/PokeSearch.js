import React, { useState } from "react";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button"

const useStyles = makeStyles((theme) => ({
  searchBar: {
    display: "flex",
    justifyContent: "center"
  },
  buttonStyle: {
    border: "solid 2px black",
    background: "white",
    "&:hover": {
      backgroundColor: 'rgb(7, 177, 77, 0.42)'
    }
    
  }
}))
const PokeSearch = ({ getPokemon }) => {
  const classes = useStyles();
  const [formObject, setFormObject] = useState({});
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }
  function handleFormSubmit(event) {
    event.preventDefault();
    getPokemon(formObject.pokeName);
  }
  return (
    <Grid container spacing={3}>
    <Grid item xs={3} lg={12}>
    <form className={classes.searchBar}> 
      <TextField
      variant="outlined"
        onChange={handleInputChange}
        name="pokeName"
        placeholder="Search for a Pokemon . . ."
      />
      <Button className={classes.buttonStyle} color="primary" onClick={handleFormSubmit}>Get Pokemon</Button>
    </form>
    </Grid>
    </Grid>
  );
};

export default PokeSearch;
