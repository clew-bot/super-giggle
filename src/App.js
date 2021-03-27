import "./App.css";
import axios from "axios";
import PokemonList from "./components/Pokemonlist";
import react, { useState, useEffect } from "react";
import API from "./components/API";

function App() {
  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await API.getPokemon();
      console.log(res.data.results);
    };
    fetchPokemon();
  }, []);

  return (
    <div className="App">
      <p>Hello World</p>
      <PokemonList />
    </div>
  );
}

export default App;
