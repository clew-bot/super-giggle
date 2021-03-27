import axios from "axios";

// The getRecipes method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
export default {
  getPokemon: function (query) {
    return axios.get("https://pokeapi.co/api/v2/pokemon/");
  },
  getPokeDetails: function (poke) {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${poke}/`);
  },
};
