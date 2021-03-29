import axios from "axios";

// The getRecipes method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
export default {
  getPokemon: function (query) {
    return axios.get("https://pokeapi.co/api/v2/pokemon/");
  },

  getMorePokemon: function () {
    return axios.get("https://pokeapi.co/api/v2/pokemon?limit=100&offset=200");
  },
  getPokeDetails: function (poke) {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${poke}/`);
  },
  pokeSearch: function ({ pokemon }) {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
  },
  getAbility: function (ability) {
    return axios.get(`https://pokeapi.co/api/v2/ability/${ability}/`);
  },
};
