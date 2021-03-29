import React, { useState, useEffect } from "react";
import API from "../components/API";

const useAll = (defaultSearchTerm) => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    pokeSearch(defaultSearchTerm);
  }, [defaultSearchTerm]);

  const pokeSearch = async (pokemon) => {
    const res = await API.getPokeDetails(pokemon);
    console.log(res);
    setPokemon(res.data.results);
  };

  return [pokemon, pokeSearch];
};

export default useAll;
